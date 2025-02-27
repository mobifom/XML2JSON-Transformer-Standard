const { readFile } = require('fs').promises;
const parseXMLString = require('./parseXMLString');

/**
 * Reads an XML file and converts it to a JSON object.
 * @param {string} filePath - The path to the XML file.
 * @param {Function} callback - The callback function to handle the result.
 */
const parseXMLFile = async (filePath, callback) => {
  try {
    const data = await readFile(filePath, 'utf-8');
    const result = parseXMLString(data);
    callback(null, result);
  } catch (err) {
    callback(new Error(`Error reading input file: ${err.message}`), null);
  }
};

module.exports = parseXMLFile;