<?php

// app/Http/Controllers/SearchController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:2'
        ]);

        $query = strtolower($request->input('query'));
        $results = $this->searchApplicationContent($query);

        return response()->json([
            'results' => $results,
            'query' => $query,
            'count' => count($results)
        ]);
    }

    protected function searchApplicationContent($query)
    {
        $results = [];

        // 1. Search through registered routes with titles
        $results = array_merge($results, $this->searchRoutes($query));

        // 2. Search through database content if you have any
        // $results = array_merge($results, $this->searchDatabaseContent($query));

        return $results;
    }

    protected function searchRoutes($query)
    {
        $results = [];
        $routes = Route::getRoutes()->getRoutes();

        foreach ($routes as $route) {
            if ($route->getName() && $this->routeHasTitle($route)) {
                $title = $this->getRouteTitle($route);
                $content = $this->getRouteContent($route);

                if (
                    Str::contains(strtolower($title), $query) ||
                    Str::contains(strtolower($content), $query)
                ) {

                    $results[] = [
                        'url' => url($route->uri()),
                        'title' => $title,
                        'snippet' => $this->getContentSnippet($content, $query)
                    ];
                }
            }
        }

        return $results;
    }

    protected function routeHasTitle($route)
    {
        // Implement logic to check if route has title
        // This could check route name, middleware, or other indicators
        return true;
    }

    protected function getRouteTitle($route)
    {
        // Get title from route name or other metadata
        return Str::title(str_replace('.', ' ', $route->getName()));
    }

    protected function getRouteContent($route)
    {
        // Get content associated with this route
        // This could come from a database, view files, etc.
        return '';
    }

    protected function getContentSnippet($content, $query, $length = 200)
    {
        if (empty($content)) return '';

        $content = strip_tags($content);
        $query = strtolower($query);
        $contentLower = strtolower($content);

        $pos = strpos($contentLower, $query);
        if ($pos === false) {
            return substr($content, 0, $length) . '...';
        }

        $start = max(0, $pos - ($length / 2));
        $snippet = substr($content, $start, $length);

        if ($start > 0) $snippet = '...' . $snippet;
        if ($start + $length < strlen($content)) $snippet .= '...';

        return $snippet;
    }
}
