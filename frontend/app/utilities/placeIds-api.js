import axios from "axios";

export async function detail(placeId) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  console.log(url)
  const res = await axios.get(url, requestOptions);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Invalid Request");
  }
}