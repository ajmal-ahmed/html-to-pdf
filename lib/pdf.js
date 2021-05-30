const puppeteer = require('puppeteer');
const fs = require('fs')
module.exports.generatePdf=(inputHtml)=>{
    return new Promise(async (resolve, reject) => {
        try {
            var options = {
                format: 'A4',
                headerTemplate: "<p></p>",
                footerTemplate: "<p></p>",
                displayHeaderFooter: false,
                margin: {
                    top: "20px",
                    bottom: "20px"
                },
                printBackground: true,
                path: 'assets/output.pdf'
            }

            const browser = await puppeteer.launch({
                args: ['--no-sandbox'],
                headless: true
            });
            const page = await browser.newPage();
            await page.goto(`data:text/html;charset=UTF-8,${inputHtml}`, {
                waitUntil: 'networkidle0'
            });
            await page.pdf(options);
            await browser.close();
            console.log('Output PDF created')
            fs.writeFileSync('assets/output.html', inputHtml,)
            console.log('Output HTML created')
            resolve(true)
        } catch (error) {
            console.log('PDF gen failed', error);
            reject(error)
        }

    })
}