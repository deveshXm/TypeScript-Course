import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

async function getListOfCoffeeStores() {
  const photos: any = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result: any) => result.urls["small"]);
}

function getUrlForCoffeeStores(latLong: string, query: string, limit: number) {
  console.log(
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}limit=${limit}`
  );
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

export default async function fetchCoffeeStores() {
  const photos = await getListOfCoffeeStores();
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

  return data.results.map((result: any, idx: number) => {
    const neighbor = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name : result.name,
      address: result.location.address === undefined ? "" : result.location.address,
      neighborhood: neighbor === undefined ? "" : neighbor[0],
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
}
