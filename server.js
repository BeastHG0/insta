const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/storeCredentials', (req, res) => {
    const owner = req.query.owner;
    const repo = req.query.repo;
    const path = req.query.path;

    const filePath = path.join(__dirname, owner, repo, path);

    fs.writeFile(filePath, req.files.file.data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error storing credentials.');
        } else {
            console.log('Credentials stored successfully.');
            res.send('Credentials stored successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
