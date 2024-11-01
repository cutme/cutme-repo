<?php

require_once('phpmailer/class.phpmailer.php');    //dodanie klasy phpmailer
require_once('phpmailer/class.smtp.php');    //dodanie klasy smtp

$mail = new PHPMailer(true);

$type = $_POST['type'];
$body = '';
$body .= 'Wiadomość ze strony:'.PHP_EOL;

$inputs = [
    'name' => 'Imię i nazwisko: ',
    'message' => 'Wiadomość: ',
    'email' => 'E-mail: '
];

foreach($inputs as $k => $v) {
    $label = $k;
    if (isset($_POST[$label])) {
        $body .= $v.htmlspecialchars(stripslashes(trim($_POST[$label]))).PHP_EOL;
    }
}


try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    
    $mail->isSMTP();                                            // Send using SMTP
    $mail->CharSet = 'UTF-8';

    $mail->Host = 'smtp.zenbox.pl';
    $mail->Username = 'postmaster@cutme.pl';
    $mail->Password = 'eA%sEY9CXxs!';
    $mail->Mailer = 'smtp';    //do wysłania zostanie użyty serwer SMTP
    $mail->SMTPAuth = true;    //włączenie autoryzacji do serwera SMTP
    $mail->Port = 587;
    $mail->From = 'postmaster@cutme.pl';

    //Recipients
    $mail->setFrom('postmaster@cutme.pl');
    $mail->addAddress('info@cutme.pl' );     // Add a recipient

    // Content
    $mail->isHTML(false);                                  // Set email format to HTML
    $mail->ContentType = 'text/plain';
    $mail->Subject = 'Post ze strony cutme.pl';
    $mail->Body    = $body;

    $mail->send();

    echo 'Mail sent';

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


?>