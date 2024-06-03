const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files were uploaded",
      });
    } else {
      const { picture } = req.files;

      picture.mv("./upload" + picture.name);

      res.send({
        status: true,
        message: "files were uploaded",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
