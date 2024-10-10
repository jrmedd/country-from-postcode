import { assert } from "chai";
import { getCountryFromPostcode } from "../lib/countryFromPostcode.js";

describe('getCountryFromPostcode', () => {
  it('should return "England" for postcode "SW1A 1AA"', () => {
    assert.equal(getCountryFromPostcode('SW1A 1AA'), 'England');
  });

  it('should return "Wales" for postcode "LL55 1SH"', () => {
    assert.equal(getCountryFromPostcode('LL55 1SH'), 'Wales');
  });

  it('should return "Scotland" for postcode "EH1 1YZ"', () => {
    assert.equal(getCountryFromPostcode('EH1 1YZ'), 'Scotland');
  });

  it('should return "Northern Ireland" for postcode "BT1 1AA"', () => {
    assert.equal(getCountryFromPostcode('BT1 1AA'), 'Northern Ireland');
  });

  it('should return "Invalid postcode" for an invalid postcode', () => {
    assert.equal(getCountryFromPostcode('INVALID'), 'Invalid postcode');
  });

  it('should return "Unknown postcode" for an unrecognized postcode', () => {
    assert.equal(getCountryFromPostcode('XX1 1AA'), 'Unknown postcode');
  });

  it('should return "Channel Islands" for postcode "JE1 1AA"', () => {
    assert.equal(getCountryFromPostcode('JE1 1AA'), 'Channel Islands');
  });

  it('should return "Isle of Man" for postcode "IM1 1AA"', () => {
    assert.equal(getCountryFromPostcode('IM1 1AA'), 'Isle of Man');
  });
});

describe('getCountryFromPostcode Edge Cases', () => {
  // Dumfries and Galloway: Postcode DG1 belongs to Scotland, while DG16 is in England
  it('should return "Scotland" for postcode "DG1 1AA"', () => {
    assert.equal(getCountryFromPostcode('DG1 1AA'), 'Scotland');
  });

  it('should return "England" for postcode "DG16 1AA"', () => {
    assert.equal(getCountryFromPostcode('DG16 1AA'), 'England');
  });

  // Wales: Postcode SY1 to SY9 belong to England, while SY10 to SY23 belong to Wales
  it('should return "England" for postcode "SY1 1AA"', () => {
    assert.equal(getCountryFromPostcode('SY1 1AA'), 'England');
  });

  it('should return "Wales" for postcode "SY10 1AA"', () => {
    assert.equal(getCountryFromPostcode('SY10 1AA'), 'Wales');
  });

  // Wales: HR3 is in Wales, but HR4 is in England
  it('should return "Wales" for postcode "HR3 1AA"', () => {
    assert.equal(getCountryFromPostcode('HR3 1AA'), 'Wales');
  });

  it('should return "England" for postcode "HR4 1AA"', () => {
    assert.equal(getCountryFromPostcode('HR4 1AA'), 'England');
  });

  // Wales: CH3 is in England, CH5 is in Wales
  it('should return "England" for postcode "CH3 1AA"', () => {
    assert.equal(getCountryFromPostcode('CH3 1AA'), 'England');
  });

  it('should return "Wales" for postcode "CH5 1AA"', () => {
    assert.equal(getCountryFromPostcode('CH5 1AA'), 'Wales');
  });

  // General validation tests
  it('should return "Invalid postcode" for an invalid postcode', () => {
    assert.equal(getCountryFromPostcode('INVALID'), 'Invalid postcode');
  });

  it('should return "Unknown postcode" for an unrecognized postcode', () => {
    assert.equal(getCountryFromPostcode('XX1 1AA'), 'Unknown postcode');
  });
});
