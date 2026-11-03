<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <title>{{ $publication->title ?? 'EPA Publication' }}</title>

    <style>
        @page {
            size: A4;
            margin: 145px 40px 75px 40px;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #333333;
            line-height: 1.7;
            margin: 0;
            padding: 0;
        }

        /*
        |--------------------------------------------------------------------------
        | EPA BRAND COLORS
        |--------------------------------------------------------------------------
        */

        :root {
            --epa-purple: rgb(109, 0, 107);
            --epa-green: rgb(42, 143, 89);
            --epa-gold: rgb(187, 155, 34);
        }

        /*
        |--------------------------------------------------------------------------
        | HEADER
        |--------------------------------------------------------------------------
        */

        .header {
            position: fixed;
            top: -115px;
            left: 0;
            right: 0;
            height: 105px;
            width: 100%;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: middle;
        }

        .logo-cell {
            width: 85px;
            text-align: left;
        }

        .logo {
            width: 75px;
            height: auto;
        }

        .divider-cell {
            width: 3px;
            padding-left: 8px;
            padding-right: 12px;
        }

        .vertical-divider {
            width: 3px;
            height: 65px;
            background-color: rgb(109, 0, 107);
        }

        .party-name-cell {
            width: 42%;
            padding-left: 5px;
        }

        .party-name {
            font-size: 21px;
            font-weight: bold;
            line-height: 1.2;
            color: rgb(42, 143, 89);
            text-transform: uppercase;
        }

        .party-acronym {
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 2px;
            color: rgb(109, 0, 107);
            margin-top: 5px;
        }

        .contact-cell {
            text-align: right;
            font-size: 9px;
            line-height: 1.6;
            color: #444444;
        }

        .contact-cell strong {
            color: rgb(109, 0, 107);
        }

        .header-separator {
            border-bottom: 2px solid rgb(109, 0, 107);
            margin-top: 10px;
            width: 100%;
        }

        /*
        |--------------------------------------------------------------------------
        | FOOTER
        |--------------------------------------------------------------------------
        */

        .footer {
            position: fixed;
            bottom: -55px;
            left: -40px;
            right: -40px;
            height: 45px;
            padding-left: 40px;
            padding-right: 40px;
            width: auto;
        }

        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        .footer-table td {
            vertical-align: middle;
        }

        .footer-line {
            border-top: 1px solid rgb(109, 0, 107);
            width: 100%;
            margin-bottom: 8px;
        }

        .footer-website {
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
            color: rgb(109, 0, 107);
        }

        .footer-accent {
            text-align: right;
        }

        .accent-green {
            display: inline-block;
            width: 45px;
            height: 4px;
            background-color: rgb(42, 143, 89);
        }

        .accent-gold {
            display: inline-block;
            width: 20px;
            height: 4px;
            background-color: rgb(187, 155, 34);
            margin-left: 4px;
        }

        /*
        |--------------------------------------------------------------------------
        | PUBLICATION CONTENT
        |--------------------------------------------------------------------------
        */

        .content {
            width: 100%;
        }

        h1 {
            font-size: 24px;
            font-weight: bold;
            color: rgb(109, 0, 107);
            margin-top: 0;
            margin-bottom: 10px;
            line-height: 1.3;
        }

        .subtitle {
            font-size: 17px;
            color: #555555;
            margin-bottom: 22px;
            line-height: 1.5;
        }

        .meta {
            font-size: 12px;
            color: #666666;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dddddd;
        }

        .meta strong {
            color: rgb(109, 0, 107);
        }

        .body {
            font-size: 14px;
            line-height: 1.8;
        }

        .body p {
            margin-top: 0;
            margin-bottom: 15px;
            text-align: justify;
        }

        .body h1 {
            font-size: 24px;
            color: rgb(109, 0, 107);
        }

        .body h2 {
            font-size: 19px;
            color: rgb(109, 0, 107);
            margin-top: 22px;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        .body h3 {
            font-size: 16px;
            color: rgb(109, 0, 107);
            margin-top: 18px;
            margin-bottom: 8px;
        }

        .body ul,
        .body ol {
            padding-left: 25px;
            margin-top: 10px;
            margin-bottom: 15px;
        }

        .body li {
            margin-bottom: 6px;
        }

        .body table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        .body table th,
        .body table td {
            border: 1px solid #dddddd;
            padding: 8px;
            font-size: 13px;
        }

        .body table th {
            background-color: #f5f5f5;
            color: rgb(109, 0, 107);
            font-weight: bold;
        }

        .body blockquote {
            border-left: 3px solid rgb(42, 143, 89);
            padding-left: 15px;
            margin: 15px 0;
            color: #555555;
        }

        .body img {
            max-width: 100%;
            height: auto;
        }

        /*
        |--------------------------------------------------------------------------
        | SIGNATURE
        |--------------------------------------------------------------------------
        */

        .signature {
            margin-top: 40px;
            font-size: 14px;
            line-height: 1.5;
        }

        .signature p {
            margin: 5px 0;
        }

        .signature-name {
            font-weight: bold;
            color: rgb(109, 0, 107);
            font-size: 15px;
        }

        .signature-title {
            color: #444444;
        }

        .tagline {
            font-size: 13px;
            color: rgb(42, 143, 89);
            font-style: italic;
            margin-top: 12px;
        }

        /*
        |--------------------------------------------------------------------------
        | PAGE BREAK HELPERS
        |--------------------------------------------------------------------------
        */

        .page-break {
            page-break-after: always;
        }

        .avoid-break {
            page-break-inside: avoid;
        }
    </style>
</head>

<body>

    {{-- HEADER --}}
    <div class="header">

        <table class="header-table">
            <tr>
                {{-- LOGO --}}
                <td class="logo-cell">
                    <img src="{{ public_path('storage/images/logo/logo.png') }}" class="logo" alt="EPA Logo">
                </td>

                {{-- VERTICAL DIVIDER --}}
                <td class="divider-cell">
                    <div class="vertical-divider"></div>
                </td>

                {{-- PARTY NAME --}}
                <td class="party-name-cell">
                    <div class="party-name">
                        ECONOMIC PATRIOTIC<br>
                        ALLIANCE
                    </div>

                    <div class="party-acronym">
                        EPA PARTY
                    </div>
                </td>

                {{-- CONTACT INFORMATION --}}
                <td class="contact-cell">
                    <strong>EPA House</strong><br>
                    P.O. Box 2636-50200<br>
                    Lusaka Road, Bungoma, Kenya<br>
                    Tel: (+254) 733-868-843<br>
                    Email: info@epa.or.ke<br>
                    Website: www.epa.or.ke
                </td>
            </tr>
        </table>

        <div class="header-separator"></div>
    </div>


    {{-- FOOTER --}}
    <div class="footer">

        <div class="footer-line"></div>

        <table class="footer-table">
            <tr>
                <td>
                    <div class="footer-website">
                        WWW.EPA.OR.KE
                    </div>
                </td>

                <td class="footer-accent">
                    <span class="accent-green"></span>
                    <span class="accent-gold"></span>
                </td>
            </tr>
        </table>

    </div>


    {{-- MAIN CONTENT --}}
    <div class="content">

        {{-- PUBLICATION TITLE --}}
        @if(!empty($publication->title))
            <h1>
                {{ $publication->title }}
            </h1>
        @endif

        {{-- SUBTITLE --}}
        @if(!empty($publication->subtitle))
            <div class="subtitle">
                {{ $publication->subtitle }}
            </div>
        @endif

        {{-- PUBLICATION METADATA --}}
        @if(!empty($publication->reference_no) || !empty($publication->published_at))
            <div class="meta">

                @if(!empty($publication->reference_no))
                    <strong>Reference:</strong>
                    {{ $publication->reference_no }}
                @endif

                @if(!empty($publication->reference_no) && !empty($publication->published_at))
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                @endif

                @if(!empty($publication->published_at))
                    <strong>Date:</strong>
                    {{ \Carbon\Carbon::parse($publication->published_at)->format('d F Y') }}
                @endif

            </div>
        @endif

        {{-- PUBLICATION BODY --}}
        <div class="body">
            {!! $publication->body !!}
        </div>


        {{-- SIGNATORY --}}
        @if(
                !empty($publication->issued_by) ||
                !empty($publication->signatory_name) ||
                !empty($publication->signatory_title)
            )

            <div class="signature avoid-break">

                @if(!empty($publication->issued_by))
                    <p>{{ $publication->issued_by }}</p>
                @endif

                <br>

                @if(!empty($publication->signatory_name))
                    <p class="signature-name">
                        {{ $publication->signatory_name }}
                    </p>
                @endif

                @if(!empty($publication->signatory_title))
                    <p class="signature-title">
                        {{ $publication->signatory_title }}
                    </p>
                @endif

                @if(!empty($publication->tagline))
                    <p class="tagline">
                        {{ $publication->tagline }}
                    </p>
                @endif

            </div>
        @endif

    </div>

</body>

</html>