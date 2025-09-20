<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ $subjectLine }}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f6f7fb; padding:24px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.06); overflow:hidden;">
    <tr>
      <td style="padding:24px 24px 8px;">
        <h2 style="margin:0 0 8px; font-size:20px; color:#111827;">New Contact Message</h2>
        <p style="margin:0; color:#6b7280; font-size:14px;">You’ve received a new message from the website contact form.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px; color:#111827;">
          <tr>
            <td style="width:120px; color:#6b7280;">From</td>
            <td><strong>{{ $senderName }}</strong> &lt;{{ $senderEmail }}&gt;</td>
          </tr>
          <tr>
            <td style="width:120px; color:#6b7280;">Subject</td>
            <td>{{ $subjectLine }}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px 24px;">
        <div style="white-space:pre-wrap; line-height:1.6; color:#111827; border:1px solid #e5e7eb; border-radius:8px; padding:16px; background:#fafafa;">
          {{ $bodyText }}
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px 24px; color:#6b7280; font-size:12px;">
        Replying to this email will go to <strong>{{ $senderEmail }}</strong>.
      </td>
    </tr>
  </table>
</body>
</html>
