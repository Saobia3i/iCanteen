<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public string $senderName;
    public string $senderEmail;
    public string $bodyText;
    public string $subjectLine;

    /**
     * @param string $name
     * @param string $email
     * @param string $subject
     * @param string $message
     */
    public function __construct(string $name, string $email, string $subject, string $message)
    {
        $this->senderName  = $name;
        $this->senderEmail = $email;
        $this->subjectLine = $subject;
        $this->bodyText    = $message;
    }

    public function build()
    {
        // Important: send FROM your app's address, and REPLY-TO the customer.
        // Many SMTPs reject arbitrary From addresses.
        return $this->from(config('mail.from.address'), config('mail.from.name'))
                    ->replyTo($this->senderEmail, $this->senderName)
                    ->subject($this->subjectLine)
                    ->view('emails.contact_message');
    }
}
