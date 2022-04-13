const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { json } = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

app.get('/showtimes', (req, res) => {
    fs.readFile('showtimes.json', (err, data) => {
        if (err) throw err;
        let result = JSON.parse(data);
        // console.log(result);
        res.json(result);
    });
});

