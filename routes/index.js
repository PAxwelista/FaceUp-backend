var express = require("express");
var router = express.Router();

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/upload", async (req, res) => {
    const photoPath = `./tmp/photo.jpg`;
    const resultMove = await req.files.photoFromFront.mv(photoPath);
    if (!resultMove) {
        const resultCloudinary = await cloudinary.uploader.upload(photoPath);
        fs.unlinkSync("./tmp/photo.jpg");

        res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false });
    }
});

module.exports = router;
