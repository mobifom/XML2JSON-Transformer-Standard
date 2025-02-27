# XML2JSON Transformer

## Overview

The XML2JSON Transformer is a Node.js application that converts XML files to JSON format. This application is designed to handle XML data structures and transform them into a JSON representation, making it easier to work with XML data in JavaScript applications.

## Features

- Converts XML files to JSON format.
- Removes leading zeros from specified fields(VendorNumber__,DocNumber__,Material__).
- Handles nested XML structures.
- Includes comprehensive test coverage using Jest.
- Validates XML structure and handles invalid or empty XML strings gracefully.

## Installation

To install the necessary dependencies, run the following command:

```sh
npm install
```

## Usage

To run the XML2JSON Transformer, use the following command:

```sh
node src/index.js <inputFilePath> <outputFilePath>
```

For example:

```sh
node src/index.js data/Sample1-PO5500000150_20230518184727_0000000000087110.xml data/Sample1-expected_results.json
```

## Dependencies

This project uses the following dependencies:

- [xmldom](https://www.npmjs.com/package/xmldom): A standard JavaScript XML parser.
- [jest](https://www.npmjs.com/package/jest): A delightful JavaScript Testing Framework with a focus on simplicity.

## Development

To run the tests and check the coverage, use the following command:

```sh
npm test
```

### Test Coverage

The project includes comprehensive test coverage for the XML to JSON transformation functionality. The tests ensure that the XML parsing and transformation are working correctly.

### Updated Test Cases

The test cases cover a variety of scenarios including:

1. **Standard XML to JSON conversion.**
2. **Removal of leading zeros from specified fields.**
3. **Handling empty XML strings.**
4. **Handling XML with missing fields.**
5. **Handling unexpected XML structures.**
6. **Handling invalid XML formats.**
7. **Validation of XML structure.**

### Verification and Resilience

To improve the resilience of the code and enhance the customer experience, the following types of verification and validation have been implemented:

1. **Input Validation:**
   - Ensures that the provided XML string is not empty.
   - Checks for well-formed XML and raises errors for invalid XML formats.
   - Validates the presence of required XML fields and structures.
   
2. **Error Handling:**
   - Gracefully handles parsing errors and provides meaningful error messages.
   - Catches and reports unexpected XML structures to avoid application crashes.
   
3. **Unit Testing:**
   - Comprehensive test cases using Jest to cover various scenarios and edge cases.
   - Validates the correctness of XML to JSON conversion.
   - Ensures that leading zeros are correctly removed from specified fields.
   
4. **Code Coverage:**
   - Ensures high code coverage to catch potential edge cases and bugs.
   - Regularly runs tests to maintain code quality and reliability.

#### Sample Test Output

```sh
PASS  tests/xmlParser.test.js
  XML to JSON Transformation
    √ parseXMLString should parse XML string to JSON
    √ removeLeadingZeros should remove leading zeros from specified fields
    √ parseXMLFile should parse XML file to JSON
    √ processElementNode should process element node attributes
    √ xmlToJson should convert XML to JSON
    √ processChildNodes should process child nodes
    √ parseXMLString should handle empty XML string
    √ parseXMLString should handle XML with missing fields
    √ parseXMLString should handle unexpected XML structure
    √ parseXMLString should handle invalid XML format
    √ removeLeadingZeros should return the original string if key is not in fieldsToClean

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.456 s
```

## License

This project is licensed under the MIT License.