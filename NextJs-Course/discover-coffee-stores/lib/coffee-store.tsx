function getUrlForCoffeeStores(latLong: string, query: string, limit: number) {
  console.log(
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}limit=${limit}`
  );
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

export default async function fetchCoffeeStores() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("28.60170759688603%2C77.23658436676742", "coffee", 6),
    options
  );

  const data = await response.json();

  return data.results;
}
