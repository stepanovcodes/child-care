import * as placeIdsAPI from "./placeIds-api";

export async function getPlaceId(placeId) {
    try {
      const data = await placeIdsAPI.detail(placeId);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err)
    }
  }