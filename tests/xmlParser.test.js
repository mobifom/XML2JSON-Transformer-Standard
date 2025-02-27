const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');
const parseXMLFile = require('../src/parsers/parseXMLFile');
const removeLeadingZeros = require('../src/parsers/removeLeadingZeros');
const parseXMLString = require('../src/parsers/parseXMLString');
const xmlToJson = require('../src/parsers/xmlToJson');
const processElementNode = require('../src/parsers/processElementNode');
const processChildNodes = require('../src/parsers/processChildNodes');

// Sample XML data for testing
const sampleXML = `

<PurchaseOrder>
  <POHeaderDetails>
    <CompanyCode__>1100</CompanyCode__>
    <VendorNumber__>0010002645</VendorNumber__>
    <OrderNumber__>5500000150</OrderNumber__>
    <OrderDate__>2023-06-02</OrderDate__>
    <Currency__>NZD</Currency__>
    <DocNumber__>0000000000087110</DocNumber__>
  </POHeaderDetails>
  <POItemDetails>
    <Item>
      <ItemNumber__>00010</ItemNumber__>
      <Material__>200148</Material__>
      <Description__>Item 1 description</Description__>
      <OrderedQuantity__>20.000</OrderedQuantity__>
    </Item>
  </POItemDetails>
  <DeliveryAddressDetails>
    <ShipToCompany__>FBNZ</ShipToCompany__>
    <ShipToStreet__>1/80 street Road</ShipToStreet__>
    <ShipToCity__>Auckland</ShipToCity__>
    <ShipToZipCode__>1234</ShipToZipCode__>
    <ShipToCountry__>NZ</ShipToCountry__>
  </DeliveryAddressDetails>
</PurchaseOrder>
`;

// Expected JSON result from the sample XML
const expectedJSON = {
  "PurchaseOrder": {
    "POHeaderDetails": {
      "CompanyCode__": "1100",
      "VendorNumber__": "10002645",
      "OrderNumber__": "5500000150",
      "OrderDate__": "2023-06-02",
      "Currency__": "NZD",
      "DocNumber__": "87110"
    },
    "POItemDetails": {
      "Item": {
        "ItemNumber__": "00010",
        "Material__": "200148",
        "Description__": "Item 1 description",
        "OrderedQuantity__": "20.000"
      }
    },
    "DeliveryAddressDetails": {
      "ShipToCompany__": "FBNZ",
      "ShipToStreet__": "1/80 street Road",
      "ShipToCity__": "Auckland",
      "ShipToZipCode__": "1234",
      "ShipToCountry__": "NZ"
    }
  }
};

describe('XML to JSON Transformation', () => {
  test('parseXMLString should parse XML string to JSON', () => {
    const result = parseXMLString(sampleXML);
    expect(result).toEqual(expectedJSON);
  });

  test('removeLeadingZeros should remove leading zeros from specified fields', () => {
    expect(removeLeadingZeros('VendorNumber__', '0010002645')).toBe('10002645');
    expect(removeLeadingZeros('DocNumber__', '00010')).toBe('10');
    expect(removeLeadingZeros('Material__', '200148')).toBe('200148');
  });

  test('parseXMLFile should parse XML file to JSON', (done) => {
    const filePath = path.join(__dirname, 'sample.xml');
    fs.writeFileSync(filePath, sampleXML);

    parseXMLFile(filePath, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual(expectedJSON);
      fs.unlinkSync(filePath); // Clean up the test file
      done();
    });
  }, 15000); // Increase timeout for this test

  test('processElementNode should process element node attributes', () => {
    const xmlString = `
      <Element attr1="value1" attr2="value2">
        <ChildElement>Text</ChildElement>
      </Element>
    `;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const element = xmlDoc.getElementsByTagName('Element')[0];
    let obj = {};

    obj = processElementNode(element, obj);

    expect(obj["@attributes"]).toEqual({ attr1: "value1", attr2: "value2" });
  });

  test('xmlToJson should convert XML to JSON', () => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sampleXML, 'application/xml');
    const result = xmlToJson(xmlDoc);

    expect(result).toEqual(expectedJSON);
  });

  test('processChildNodes should process child nodes', () => {
    const xmlString = `
      <Parent>
        <Child>Value1</Child>
        <Child>Value2</Child>
      </Parent>
    `;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const parent = xmlDoc.getElementsByTagName('Parent')[0];
    let obj = {};

    obj = processChildNodes(parent, obj, 'Parent', xmlToJson);

    expect(obj.Child).toEqual(['Value1', 'Value2']);
  });

  // Edge case tests
  test('parseXMLString should handle empty XML string', () => {
    const emptyXML = '';
    expect(() => parseXMLString(emptyXML)).toThrow('Empty XML string');
  });

  test('parseXMLString should handle XML with missing fields', () => {
    const incompleteXML = `
      <PurchaseOrder>
        <POHeaderDetails>
          <CompanyCode__>1100</CompanyCode__>
        </POHeaderDetails>
      </PurchaseOrder>
    `;
    expect(() => parseXMLString(incompleteXML)).toThrow('Invalid XML structure');
  });

  test('parseXMLString should handle unexpected XML structure', () => {
    const unexpectedXML = `
      <UnexpectedRoot>
        <SomeField>Value</SomeField>
      </UnexpectedRoot>
    `;
    expect(() => parseXMLString(unexpectedXML)).toThrow('Invalid XML structure');
  });

  test('parseXMLString should handle invalid XML format', () => {
    const invalidXML = `
      <PurchaseOrder>
        <POHeaderDetails>
          <CompanyCode__>1100<CompanyCode__>
        </POHeaderDetails>
    `;
    expect(() => parseXMLString(invalidXML)).toThrow('Invalid XML structure');
  });

  test('removeLeadingZeros should return the original string if key is not in fieldsToClean', () => {
    expect(removeLeadingZeros('NonExistentKey', '00123')).toBe('00123');
  });
});