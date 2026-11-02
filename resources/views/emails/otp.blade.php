<!DOCTYPE html>
<html>

<head>
    <title>Your Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .otp-code {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #2563eb;
            margin: 20px 0;
            padding: 10px 20px;
            background: #f1f5f9;
            display: inline-block;
            border-radius: 4px;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Your EPA Verification Code</h2>
        <p>Please use the following verification code to complete your authentication:</p>

        <div class="otp-code">{{ $otp }}</div>

        <p>This code will expire in 5 minutes. Please do not share this code with anyone.</p>

        <p>If you didn't request this code, you can safely ignore this email.</p>

        <div class="footer">
            <p>Thank you,<br>The EPA Team</p>
        </div>
    </div>
</body>

</html>