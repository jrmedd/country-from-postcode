const postcodeData = {
  England: {
    AL: ["*"],
    B: ["*"],
    BA: ["*"],
    BB: ["*"],
    BD: ["*"],
    BH: ["*"],
    BL: ["*"],
    BN: ["*"],
    BR: ["*"],
    BS: ["*"],
    CA: ["*"],
    CB: ["*"],
    CF: ["*"],
    CH: ["1", "3", "4", "6", "7", "8"],
    CM: ["*"],
    CO: ["*"],
    CR: ["*"],
    CT: ["*"],
    CV: ["*"],
    CW: ["*"],
    DA: ["*"],
    DE: ["*"],
    DG: ["16"],
    DH: ["*"],
    DL: ["*"],
    DN: ["*"],
    DT: ["*"],
    DY: ["*"],
    E: ["*"],
    EC: ["*"],
    EN: ["*"],
    EX: ["*"],
    FY: ["*"],
    GL: ["*"],
    GU: ["*"],
    HA: ["*"],
    HD: ["*"],
    HG: ["*"],
    HP: ["*"],
    HR: ["1", "2", "4", "6", "7", "8"],
    HU: ["*"],
    HX: ["*"],
    IG: ["*"],
    IP: ["*"],
    KT: ["*"],
    L: ["*"],
    LA: ["*"],
    LD: ["7", "8"],
    LE: ["*"],
    LN: ["*"],
    LS: ["*"],
    LU: ["*"],
    M: ["*"],
    ME: ["*"],
    MK: ["*"],
    N: ["*"],
    NE: ["*"],
    NG: ["*"],
    NN: ["*"],
    NP: ["*"],
    NR: ["*"],
    NW: ["*"],
    OL: ["*"],
    OX: ["*"],
    PE: ["*"],
    PL: ["*"],
    PO: ["*"],
    PR: ["*"],
    RG: ["*"],
    RH: ["*"],
    RM: ["*"],
    S: ["*"],
    SA: ["*"],
    SE: ["*"],
    SG: ["*"],
    SK: ["*"],
    SL: ["*"],
    SM: ["*"],
    SN: ["*"],
    SO: ["*"],
    SP: ["*"],
    SR: ["*"],
    SS: ["*"],
    ST: ["*"],
    SW: ["*"],
    SY: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11"],
    TA: ["*"],
    TF: ["*"],
    TN: ["*"],
    TS: ["*"],
    TW: ["*"],
    UB: ["*"],
    W: ["*"],
    WA: ["*"],
    WC: ["*"],
    WD: ["*"],
    WF: ["*"],
    WN: ["*"],
    WR: ["*"],
    WS: ["*"],
    WV: ["*"],
    YO: ["*"],
  },
  Wales: {
    CF: ["*"],
    CH: ["5"],
    HR: ["3", "5"],
    LD: ["1", "2", "3", "4", "5", "6"],
    LL: ["*"],
    NP: ["*"],
    SA: ["*"],
    SY: [
      "10",
      "11",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "99",
    ],
  },
  Scotland: {
    AB: ["*"],
    DD: ["*"],
    DG: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    EH: ["*"],
    FK: ["*"],
    G: ["*"],
    HS: ["*"],
    IV: ["*"],
    KA: ["*"],
    KW: ["*"],
    KY: ["*"],
    ML: ["*"],
    PA: ["*"],
    PH: ["*"],
    TD: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    ZE: ["*"],
  },
  "Northern Ireland": { BT: ["*"] },
  "Channel Islands": { GY: ["*"], JE: ["*"] },
  "Isle of Man": { IM: ["*"] },
};

/**
 * Extracts the area from a given postcode (the first 1 or 2 letters).
 * @param postcode - The postcode to extract the area from.
 * @returns The area portion of the postcode.
 */
function getPostcodeArea(postcode: string): string {
  postcode = postcode.toUpperCase().replace(/\s+/g, "");
  const area = postcode.match(/^[A-Z]{1,2}/);
  return area ? area[0] : "";
}

/**
 * Extracts the district from a given postcode (the numbers following the area).
 * @param postcode - The full postcode.
 * @param area - The area portion of the postcode.
 * @returns The district portion of the postcode.
 */
function getPostcodeDistrict(postcode: string, area: string): string {
  postcode = postcode.toUpperCase().replace(/\s+/g, "").slice(0, -3);
  const districtMatch = postcode.match(new RegExp(`^${area}([0-9]{1,2})`)); // Matches the number after the area
  return districtMatch ? districtMatch[1] : "";
}

/**
 * Determines the country for a given UK postcode.
 * @param postcode - The postcode to check.
 * @returns The country corresponding to the postcode or an error message.
 */
function getCountryFromPostcode(postcode: string): string {
  const isValid: boolean =
    /^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(postcode);
  if (isValid) {
    const area: string = getPostcodeArea(postcode);
    if (!area) return "Unknown"; // If no valid postcode area is found

    const district: string = getPostcodeDistrict(postcode, area);

    for (const country in postcodeData) {
      if (postcodeData[country][area]) {
        if (
          postcodeData[country][area].includes("*") ||
          postcodeData[country][area].includes(district)
        ) {
          return country;
        }
      }
    }
    return "Unknown postcode"; // If postcode doesn't match any known area or district
  } else {
    return "Invalid postcode";
  }
}

export { getCountryFromPostcode };
