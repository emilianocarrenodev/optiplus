<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'plugin/PHPMailer/vendor/autoload.php';

function validReq($valor) {
    if(trim($valor) == '') {
       	return false;
    } else {
       	return true;
    }
 }

if(validReq($_POST['name']) && validReq($_POST['email']) && validReq($_POST['message'])) {

	// Instantiation and passing `true` enables exceptions
	$mail = new PHPMailer(true);

	try {
	    //Server settings
	    $mail->SMTPDebug  = false;                                  // Enable verbose debug output
	    $mail->isSMTP();                                            // Send using SMTP
	    $mail->Host       = '';                						// Set the SMTP server to send through
	    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
	    $mail->Username   = '';           							// SMTP username
	    $mail->Password   = '';                         			// SMTP password
	    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
	    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
	    $mail->CharSet    = PHPMailer::CHARSET_UTF8;

	    //Recipients
	    $mail->setFrom('', '');
	    $mail->addAddress('', '');

	    // Content
	    $mail->isHTML(true);                                  // Set email format to HTML
	    $mail->Subject = 'Asignación de citas';

	    $mail->Body = "<html><body>";
		$mail->Body .="<h2>Formulario de contacto</h2>";
		$mail->Body .= "<table rules='all' style='width: 100%; border-color: #666;' cellpadding='10'>";
		$mail->Body .= "<tr style='background: #eee;'><td style='width: 120px;'><strong>Nombre:</strong> </td><td>" . $_POST['name'] . "</td></tr>";
		$mail->Body .= "<tr><td style='width: 120px;'><strong>E-mail:</strong> </td><td>" . $_POST['email'] . "</td></tr>";
		$mail->Body .= "<tr style='background: #eee;'><td style='width: 120px;'><strong>Mensaje:</strong> </td><td>" . $_POST['message'] . "</td></tr>";

	    $mail->Body .= "</table>";
		$mail->Body .= "</body></html>";

	    $mail->send();

	    echo json_encode(['alert' => 'valid', 'message' => 'Mensaje enviado!!!']);
	    
	} catch (Exception $e) {
	    echo json_encode(['alert' => 'error', 'message' => 'Mensaje no enviado!!!']);
	}

}else{
	echo json_encode(['alert' => 'error', 'message' => 'Faltan campos requeridos, por favor revisar!!!']);
}
?>