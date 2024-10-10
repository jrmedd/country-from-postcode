![build](https://github.com/jrmedd/country-from-postcode/actions/workflows/main.yaml/badge.svg)

# country-from-postcode

A simple package that determines the country (England, Scotland, Wales, Northern Ireland, Channel Islands, Isle of Man) based on a UK postcode. No external dependencies.

## Installation

```bash
npm install country-from-postcode
```
## Usage
```typescript
import { getCountryFromPostcode } from 'country-from-postcode';

const country = getCountryFromPostcode('SW1A 1AA');
console.log(country); // Outputs: "England"
```

The function `getCountryFromPostcode` returns one of the following country names:

* England
* Scotland
* Wales
* Northern Ireland
* Channel Islands
* Isle of Man
* “Invalid postcode” (if the postcode format is invalid)
* “Unknown postcode” (if the postcode does not match any known area or district)

Edge Cases

The package handles edge cases where postcodes span across borders:

* Dumfries and Galloway: Postcode DG1 maps to Scotland, but DG16 maps to England.
* Welsh Borders: Postcodes like SY1 (England) and SY10 (Wales) are handled correctly.

## UK Postcode Format

UK postcodes follow a specific format:

* The outward code (before the space) consists of the area (1-2 letters) and the district (1-2 digits).
* The inward code (after the space) identifies more specific locations, such as a street.

For more detailed information on UK postcode formats, refer to:

* [Doogal's postcodes](https://www.doogal.co.uk/UKPostcodes)
* [ONS Postal geographies](https://www.ons.gov.uk/methodology/geography/ukgeographies/postalgeography)
* [Wikipedia: UK Postcodes](https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom)

## License

This package is licensed under the WTFPL. Do what you want.