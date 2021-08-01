const puppeteer = require("puppeteer");
const fs = require("fs");
module.exports.generatePdf = (inputHtml) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.time("timecalc");
      var options = {
        format: "A4",
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "0px",
          bottom: "0px",
        },
        printBackground: true,
        path: "assets/output.pdf",
      };

      const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
      });
      const page = await browser.newPage();
      await page.goto(`data:text/html,`, {
        waitUntil: "networkidle0",
      });
      await page.setContent(inputHtml);
      await page.pdf(options);
      await browser.close();
      console.timeEnd("timecalc");
      console.log("Output PDF created");
      fs.writeFileSync("assets/output.html", inputHtml);
      console.log("Output HTML created");
      resolve(true);
    } catch (error) {
      console.log("PDF gen failed", error);
      reject(error);
    }
  });
};
