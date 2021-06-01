const express = require("express");
const path = require("path");
const pdfLib = require("./lib/pdf");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/main.html"));
});

app.post("/generate-pdf", async (req, res) => {
  const inputHtml = req.body?.html;
  console.log("req", req.body);
  if (!inputHtml) {
    res.json({ message: "html content is required" }).status(400);
    return;
  }
  await pdfLib.generatePdf(inputHtml);
  res.json({message:"PDF generated"}).status(201);
});

app.listen(port, () => {
  console.log(`PDF app listening at http://localhost:${port}`);
});
