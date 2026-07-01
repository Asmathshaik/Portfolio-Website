const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('Launching browser to render PDF...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Resolve absolute path to resume.html
    const htmlPath = 'file://' + path.resolve(__dirname, '../public/resume.html');
    console.log(`Loading HTML from: ${htmlPath}`);
    
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });
    
    // Set custom print options to format it perfectly for A4 print
    console.log('Generating A4 PDF...');
    await page.pdf({
      path: path.resolve(__dirname, '../public/resume.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    console.log('PDF Resume successfully generated at public/resume.pdf!');
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
