const processElementNode = require('./processElementNode');
const processChildNodes = require('./processChildNodes');
const removeLeadingZeros = require('./removeLeadingZeros');

/**
 * Converts an XML DOM element to a JSON object.
 * @param {Object} xml - The XML DOM element to convert.
 * @param {string} [parentKey=''] - The parent key for nested elements.
 * @returns {Object|string} - The JSON object representation of the XML.
 */
const xmlToJson = (xml, parentKey = '') => {
  let obj = {};

  if (xml.nodeType === 1) {
    obj = processElementNode(xml, obj);
  } 
  else if (xml.nodeType === 3) {
    obj = removeLeadingZeros(parentKey, xml.nodeValue);
  }

  if (xml.hasChildNodes()) {
    obj = processChildNodes(xml, obj, parentKey, xmlToJson);
  }

  if (typeof obj === 'object' && Object.keys(obj).length === 0) {
    return '';
  }

  return obj;
};

module.exports = xmlToJson;