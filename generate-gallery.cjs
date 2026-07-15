const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'client', 'public', 'images');
const outputFile = path.join(__dirname, 'client', 'src', 'data', 'galleryImages.json');

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const fullPath = path.join(dirPath, file);
        // convert to relative web path
        const relativePath = fullPath.replace(path.join(__dirname, 'client', 'public'), '').replace(/\\/g, '/');
        // determine category from parent folder name
        const category = path.basename(dirPath);
        arrayOfFiles.push({ src: relativePath, category: category });
      }
    }
  });

  return arrayOfFiles;
}

try {
  // create data dir if not exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const result = getAllFiles(publicImagesDir);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log('Successfully generated galleryImages.json with ' + result.length + ' images.');
} catch (error) {
  console.error('Error generating gallery:', error);
}
