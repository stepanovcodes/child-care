import * as photosAPI from "./photos-api";

export async function getPhoto(uuid) {
  try {
    const data = await photosAPI.detail(uuid);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}
