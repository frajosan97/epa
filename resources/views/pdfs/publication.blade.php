<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ $publication->subtitle ?? $publication->title }}</title>
    <style>
        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            font-size: 12px;
            color: #222;
            line-height: 1.6;
            margin: 24px;
        }

        h1 {
            font-size: 18px;
            margin-bottom: 4px;
        }

        .subtitle {
            color: #555;
            font-size: 14px;
            margin-bottom: 16px;
        }

        .meta {
            color: #666;
            font-size: 10px;
            margin-bottom: 20px;
        }

        .body p {
            margin-bottom: 10px;
        }

        .signature {
            margin-top: 30px;
            border-top: 1px solid #ccc;
            padding-top: 16px;
        }

        .signature p {
            margin: 4px 0;
        }

        .tagline {
            font-style: italic;
            color: #555;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <h1>{{ $publication->title }}</h1>

    @if($publication->subtitle)
        <div class="subtitle">{{ $publication->subtitle }}</div>
    @endif

    <div class="meta">
        @if($publication->reference_no)
            Ref: {{ $publication->reference_no }} &nbsp;|&nbsp;
        @endif
        @if($publication->published_at)
            {{ $publication->published_at->format('F j, Y') }}
        @endif
    </div>

    <div class="body">
        {!! $publication->body !!}
    </div>

    @if($publication->signatory_name || $publication->issued_by)
        <div class="signature">
            @if($publication->issued_by)
                <p><strong>Issued by:</strong> {{ $publication->issued_by }}</p>
            @endif
            @if($publication->signatory_name)
                <p>
                    <strong>{{ $publication->signatory_name }}</strong>
                    @if($publication->signatory_title)
                        — {{ $publication->signatory_title }}
                    @endif
                </p>
            @endif
            @if($publication->tagline)
                <p class="tagline">"{{ $publication->tagline }}"</p>
            @endif
        </div>
    @endif
</body>

</html>