const fs = require('fs');
const files = [
  'C:\\Users\\ACER\\.gemini\\antigravity-ide\\brain\\322f2982-6f33-49b0-b140-0dcb232ee30e\\.system_generated\\steps\\97\\content.md',
  'C:\\Users\\ACER\\.gemini\\antigravity-ide\\brain\\322f2982-6f33-49b0-b140-0dcb232ee30e\\.system_generated\\steps\\98\\content.md',
  'C:\\Users\\ACER\\.gemini\\antigravity-ide\\brain\\322f2982-6f33-49b0-b140-0dcb232ee30e\\.system_generated\\steps\\99\\content.md'
];

files.forEach((file, i) => {
  try {
    const html = fs.readFileSync(file, 'utf-8');
    // Extract main text content
    const text = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                     .replace(/<[^>]+>/g, ' ')
                     .replace(/\s+/g, ' ');
                     
    // We are looking for "High Duck", "Ground Duck", "Full Duck"
    let match = text.match(/.{0,200}Duck Package.{0,800}/g);
    console.log(`\n\n--- P${i+1} ---`);
    if (match) {
        console.log(match.join('\n'));
    } else {
        console.log("No match found");
    }
  } catch (e) {
    console.error("Error reading file", file);
  }
});
