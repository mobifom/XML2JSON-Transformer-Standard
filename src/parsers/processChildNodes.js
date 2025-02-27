const removeLeadingZeros = require('./removeLeadingZeros');

/**
 * Processes child nodes in the XML.
 * @param {Object} xml - The XML element with child nodes.
 * @param {Object} obj - The JSON object to populate with child nodes.
 * @param {string} parentKey - The parent key for nested elements.
 * @param {Function} xmlToJson - The function to convert XML to JSON.
 * @returns {Object} - The updated JSON object with child nodes.
 */
const processChildNodes = (xml, obj, parentKey, xmlToJson) => {
  for (let i = 0; i < xml.childNodes.length; i++) {
    let item = xml.childNodes.item(i);
    let nodeName = item.nodeName;
    if (nodeName === undefined || (nodeName === '#text' && item.nodeValue.trim() === '')) {
      continue; 
    }
    if (typeof obj[nodeName] === "undefined") {
      obj[nodeName] = xmlToJson(item, nodeName);
    } else {
      if (typeof obj[nodeName].push === "undefined") {
        let old = obj[nodeName];
        obj[nodeName] = [];
        obj[nodeName].push(old);
      }
      obj[nodeName].push(xmlToJson(item, nodeName));
    }
  }
  if (obj['#text'] !== undefined) {
    obj = removeLeadingZeros(parentKey, obj['#text']);
  }
  return obj;
};

module.exports = processChildNodes;