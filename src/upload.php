<?php
if (isset($_FILES['file'])) {
    $uploadDir = 'files/';
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        echo "Plik został przesłany: " . $uploadFile;
    } else {
        echo "Błąd przesyłania pliku.";
    }
} else {
    echo "Nie znaleziono pliku.";
}
?>