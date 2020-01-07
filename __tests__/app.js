'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
var fs = require("fs");

const answers = {
  'package.name': 'My Package',
  'vendor.name': 'Test Vendor',
  'author.name': 'Test Author',
  'author.email': 'test.author@example.org',
  'package.license': 'MIT',
  'package.namespace': 'TestVendor\\MyPackage'
};

/**
* Testing function to check the content of two files against each other
* 
* @param {string} file path to the generated file
* @param {string} fixture path to the fixture  to check against
*/
function equalsFileContent(file, fixture) {
  assert.equalsFileContent(
    file,
    fs.readFileSync(path.join(__dirname, 'fixtures/' + fixture), 'utf8')
  );
}

describe('generator-php-cli-app:app', () => {
  beforeAll(() => {
    jest.mock('github-username', () => {
      return () => Promise.resolve('test-vendor');
    });
  });

  afterAll(() => {
    jest.unmock('github-username');
  });

  it('creates a readme file', () => {
    return helpers
    .run(path.join(__dirname, '../generators/app'))
    .withPrompts(answers)
    .then(() => {
      let readme = 'README.md';
      assert.file([readme]);
      equalsFileContent(readme, 'README.md');
    })
  });
})