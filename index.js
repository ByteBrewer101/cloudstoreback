const express = require("express");
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
	console.log(file.mimetype);
	const type = file.mimetype.slice("/")[1]
    const uniqueSuffix = Date.now() + "-" + "."+type;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const app = express();


app.post("/uploadphoto", upload.single("photo"), function (req, res, next) {
  console.log(req.file);
  res.send("File uploaded successfully.");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
