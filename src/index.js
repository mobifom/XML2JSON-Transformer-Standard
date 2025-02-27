const fs = require('fs');
const path = require('path');
const parseXMLFile = require('./parsers/parseXMLFile');

const [filePath, outputFilePath] = process.argv.slice(2);

if (!filePath || !outputFilePath) {
  console.error('Usage: node src/index.js <inputFilePath> <outputFilePath>');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Error: Input file "${filePath}" does not exist.`);
  process.exit(1);
}

if (path.extname(filePath).toLowerCase() !== '.xml') {
  console.error(`Error: Input file "${filePath}" is not an XML file.`);
  process.exit(1);
}

if (path.extname(outputFilePath).toLowerCase() !== '.json') {
  console.error(`Error: Output file "${outputFilePath}" is not a JSON file.`);
  process.exit(1);
}

parseXMLFile(filePath, (err, json) => {
  if (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } else {
    fs.writeFile(outputFilePath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to output file:', writeErr.message);
        process.exit(1);
      } else {
        console.log(`JSON output written to ${outputFilePath}`);
      }
    });
  }
});

