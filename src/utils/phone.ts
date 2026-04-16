export const PHONE_COUNTRY_CODES = [
  { label: "Ecuador", code: "+593" },
  { label: "Colombia", code: "+57" },
  { label: "Peru", code: "+51" },
  { label: "Mexico", code: "+52" },
  { label: "Argentina", code: "+54" },
  { label: "Chile", code: "+56" },
  { label: "Estados Unidos", code: "+1" },
  { label: "Espana", code: "+34" },
];

export const DEFAULT_PHONE_COUNTRY_CODE = "+593";

export const splitPhoneNumber = (phone?: string | null) => {
  const normalizedPhone = (phone || "").trim();

  if (!normalizedPhone) {
    return {
      countryCode: DEFAULT_PHONE_COUNTRY_CODE,
      localNumber: "",
    };
  }

  const matchedCountry = [...PHONE_COUNTRY_CODES]
    .sort((a, b) => b.code.length - a.code.length)
    .find((country) => normalizedPhone.startsWith(country.code));

  if (!matchedCountry) {
    return {
      countryCode: DEFAULT_PHONE_COUNTRY_CODE,
      localNumber: normalizedPhone.replace(/\D/g, ""),
    };
  }

  return {
    countryCode: matchedCountry.code,
    localNumber: normalizedPhone.slice(matchedCountry.code.length).replace(/\D/g, ""),
  };
};

export const buildPhoneNumber = (countryCode: string, localNumber: string) => {
  const sanitizedLocalNumber = localNumber.replace(/\D/g, "");

  if (!sanitizedLocalNumber) return "";

  return `${countryCode}${sanitizedLocalNumber}`;
};
