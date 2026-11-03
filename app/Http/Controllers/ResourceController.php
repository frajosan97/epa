<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Publication;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Container\Attributes\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Display the list of downloadable resources.
     *
     * Only published downloads (is_published = true, published_at in the past)
     * are returned. Featured items are shown first, then alphabetically.
     */
    public function downloads()
    {
        $downloads = Download::published()
            ->orderByDesc('is_featured')
            ->orderBy('title')
            ->get()
            ->map(function ($d) {
                /** @var Download $d */
                return [
                    'id' => $d->id,
                    'title' => $d->title,
                    'description' => $d->description,
                    'category' => $d->category,
                    'version' => $d->version,
                    'fileSize' => $d->file_size,
                    'downloads' => $d->download_count,
                    'date' => $d->published_at?->format('Y-m-d'),
                    'fileType' => $d->file_type,
                    'url' => asset('storage/' . $d->file_path),
                    'featured' => $d->is_featured,
                    'tags' => $d->tags ?? [],
                ];
            });

        return Inertia::render('Frontend/Resource/Download', [
            'downloadItems' => $downloads,
        ]);
    }

    /**
     * Display the list of published publications (public notices, press
     * releases, circulars) newest first.
     */
    public function publications()
    {
        $publications = Publication::published()
            ->latest('published_at')
            ->get();

        return Inertia::render('Frontend/Resource/Publications', [
            'publications' => $publications,
        ]);
    }

    /**
     * Display a single publication by ID.
     *
     * Unpublished / future-dated publications return 404.
     */
    public function showPublication(Publication $publication)
    {
        abort_unless($publication->is_published, 404);
        abort_if(
            $publication->published_at && $publication->published_at->isFuture(),
            404
        );

        return Inertia::render('Frontend/Resource/PublicationShow', [
            'publication' => $publication,
        ]);
    }

    /**
     * Stream / download a file from the "public" disk and increment the
     * download counter.
     *
     * Files live at storage/app/public/documents/<filename>, served through
     * the /storage symlink.
     */
    public function downloadFile(Download $download)
    {
        abort_unless($download->is_published, 404);

        $path = $download->absolute_path;
        abort_unless($path && file_exists($path), 404);

        $download->incrementDownloadCount();

        return response()->download($path, basename($path));
    }

    /**
     * Display the privacy policy page.
     */
    public function privacy()
    {
        return Inertia::render('Frontend/Resource/Privacy');
    }

    /**
     * Display the FAQs page.
     */
    public function faq()
    {
        return Inertia::render('Frontend/Resource/faq');
    }

    /**
     * Download a publication as PDF.
     *
     * If the publication has an attached file on the public disk, stream that.
     * Otherwise, generate a PDF from the HTML body on the fly.
     */
    public function downloadPublicationPdf(Publication $publication)
    {
        abort_unless($publication->is_published, 404);

        // 1) Attached file — serve it directly.
        if ($publication->file_path) {
            $path = \Illuminate\Support\Facades\Storage::disk('public')
                ->path($publication->file_path);

            if (file_exists($path)) {
                return response()->download(
                    $path,
                    basename($publication->file_path),
                    ['Content-Type' => 'application/pdf']
                );
            }
        }

        // 2) No attachment — generate a PDF from the body.
        $pdf = Pdf::loadView('pdfs.publication', [
            'publication' => $publication,
        ])->setPaper('a4');

        $filename = \Illuminate\Support\Str::slug(
            $publication->subtitle ?? $publication->title
        ) . '.pdf';

        return $pdf->download($filename);
    }
}