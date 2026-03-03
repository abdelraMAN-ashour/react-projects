const BASE_URL = "https://restcountries.com/v3.1";

export async function getCountries() {
  const res = await fetch(
    `${BASE_URL}/all?fields=name,flags,population,region,capital,cca3`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  return await res.json();
}

export async function getCountry(code) {
  const res = await fetch(
    `${BASE_URL}/alpha/${code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,latlng`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch country with code ${code}`);
  }

  return await res.json();
}

export async function getBorders(bordersCode) {
  if (!bordersCode?.length) return [];

  const res = await fetch(
    `${BASE_URL}/alpha?codes=${bordersCode.join(",")}&fields=name`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch border countries");
  }

  return await res.json();
}