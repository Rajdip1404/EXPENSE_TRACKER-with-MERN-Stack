const express = require('express');
const {registerUser, loginUser, getUserInfo} = require("../controllers/auth.controller");
const {project} = require("../middlewares/auth.middleware");
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", project, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.send(`File uploaded successfully: ${imageUrl}`);
});


module.exports = router;