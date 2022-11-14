<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Models\Mysql;

class AdminNewUser extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Mysql\User $user)
    {

        $this->content = '<p>Name: ' . $user->name . '</p><p>Company: ' . $user->company . '</p><p>Email: ' . $user->email . '</p><p>Phone: ' . $user->phone . '</p>';
        
        $sub_domain = 'staging';
        if (env('APP_ENV') == 'prod') {
            $sub_domain = 'app';
        }

        $emails = ['kyle@deliciousdevelopment.net', 'logan.connors@behealthyr.com'];

        if (env('APP_ENV') != 'prod') $emails = ['kyle@deliciousdevelopment.net'];

        $this->to($emails);
        $this->subject(env('APP_ENV') == 'prod' ? (env('APP_NAME') . ' - New User') : 'Dev - ' . env('APP_NAME') . ' - New User');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.generic')
            ->with([
                'title' => 'New Sign Up',
                'content' => $this->content
            ]);
    }
}
