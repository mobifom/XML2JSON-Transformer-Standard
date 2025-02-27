/**
 * Removes leading zeros from specified fields.
 * @param {string} key - The key of the field.
 * @param {string} str - The string value of the field.
 * @returns {string} - The string value without leading zeros if applicable.
 */
const removeLeadingZeros = (key, str) => {
    const fieldsToClean = ['VendorNumber__', 'DocNumber__', 'Material__'];
    if (fieldsToClean.includes(key) && typeof str === 'string') {
      return str.replace(/^0+/, '');
    }
    return str;
  };
  
  module.exports = removeLeadingZeros;