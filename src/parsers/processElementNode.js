/**
 * Processes an element node in the XML.
 * @param {Object} xml - The XML element node to process.
 * @param {Object} obj - The JSON object to populate with attributes.
 * @returns {Object} - The updated JSON object with attributes.
 */
const processElementNode = (xml, obj) => {
  if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
    for (let j = 0; j < xml.attributes.length; j++) {
      let attribute = xml.attributes.item(j);
      obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
    }
  }
  return obj;
};

module.exports = processElementNode;