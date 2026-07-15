const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const heicConvert = require('heic-convert');

const publicImagesPath = path.join(__dirname, 'public', 'images');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.toLowerCase().endsWith('.heic')) {
            console.log(`Converting ${fullPath}...`);
            try {
                const inputBuffer = fs.readFileSync(fullPath);
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer, // the HEIC file buffer
                    format: 'JPEG',      // output format
                    quality: 0.8         // the jpeg compression quality, between 0 and 1
                });
                const outputPath = fullPath.replace(/\.heic$/i, '.jpg');
                fs.writeFileSync(outputPath, outputBuffer);
                console.log(`Successfully converted to ${outputPath}`);
                
                // Optionally delete the original HEIC file
                // fs.unlinkSync(fullPath);
            } catch (err) {
                console.error(`Failed to convert ${fullPath}: ${err.message}`);
            }
        }
    }
}

async function main() {
    console.log('Starting HEIC conversion...');
    await processDirectory(publicImagesPath);
    console.log('Done!');
}

main();
