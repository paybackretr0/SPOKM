const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { judul, kategori, isi } = req.body;
    if (!judul || !kategori || !isi) {
        res.send('Harap isi semua field.');
        return;
    }

    // Data yang akan ditulis ke file
    const data = `${judul}\n${kategori}\n${isi}\n---\n`;
    const filePath = path.join(__dirname, 'submissions.txt');

    // Menulis data ke file submissions.txt
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('PublikasiOrg.html');
    });
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
