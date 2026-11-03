<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?php echo e($publication->subtitle ?? $publication->title); ?></title>
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
    <h1><?php echo e($publication->title); ?></h1>

    <?php if($publication->subtitle): ?>
        <div class="subtitle"><?php echo e($publication->subtitle); ?></div>
    <?php endif; ?>

    <div class="meta">
        <?php if($publication->reference_no): ?>
            Ref: <?php echo e($publication->reference_no); ?> &nbsp;|&nbsp;
        <?php endif; ?>
        <?php if($publication->published_at): ?>
            <?php echo e($publication->published_at->format('F j, Y')); ?>

        <?php endif; ?>
    </div>

    <div class="body">
        <?php echo $publication->body; ?>

    </div>

    <?php if($publication->signatory_name || $publication->issued_by): ?>
        <div class="signature">
            <?php if($publication->issued_by): ?>
                <p><strong>Issued by:</strong> <?php echo e($publication->issued_by); ?></p>
            <?php endif; ?>
            <?php if($publication->signatory_name): ?>
                <p>
                    <strong><?php echo e($publication->signatory_name); ?></strong>
                    <?php if($publication->signatory_title): ?>
                        — <?php echo e($publication->signatory_title); ?>

                    <?php endif; ?>
                </p>
            <?php endif; ?>
            <?php if($publication->tagline): ?>
                <p class="tagline">"<?php echo e($publication->tagline); ?>"</p>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</body>

</html><?php /**PATH C:\xampp\htdocs\epa\resources\views/pdfs/publication.blade.php ENDPATH**/ ?>