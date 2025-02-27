const { DOMParser } = require('xmldom');
const xmlToJson = require('./xmlToJson');

/**
 * Parses an XML string and converts it to a JSON object.
 * @param {string} xmlString - The XML string to parse.
 * @returns {Object} - The JSON object representation of the XML.
 * @throws {Error} - If there is an error parsing the XML string.
 */
const parseXMLString = (xmlString) => {
  if (!xmlString.trim()) {
    throw new Error('Empty XML string');
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  if (xmlDoc.getElementsByTagName('parsererror').length) {
    throw new Error('Error parsing XML string');
  }

  const result = xmlToJson(xmlDoc);

  if (!result.PurchaseOrder || !result.PurchaseOrder.POHeaderDetails || !result.PurchaseOrder.POItemDetails || !result.PurchaseOrder.DeliveryAddressDetails) {
    throw new Error('Invalid XML structure');
  }

  return result;
};

module.exports = parseXMLString;