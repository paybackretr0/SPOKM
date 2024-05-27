const fs = require('fs');
const path = require('path');

exports.publish = async (req, res) => {
    try {
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
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.publikasi = async (req, res) => {
    try {
      const user = await users.findByPk(req.userId);
      res.render("mhs/ppi", { accessToken: req.cookies.accessToken, user });
    } catch (error) {
      console.error(error);
      res.redirect("/login");
    }
  };