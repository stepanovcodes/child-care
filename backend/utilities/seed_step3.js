require("dotenv").config();
const PHOTOS_BASE_URL = `${process.env.NODE_BASE_URL}/photos`;

async function postImages() {
  const photos = await getPhotos();
  photos.forEach(async (photo) => {
    if (photo.id === 57) {
      const result = await getImage(photo);
      const buffer = await result.arrayBuffer();
      console.log(result.headers.get('content-type'));
      console.log(result);
      await updatePhoto(photo.uuid, {image: buffer});
    }
  });
}
async function getPhotos() {
  try {
    const data = await index();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function index() {
  const res = await fetch(PHOTOS_BASE_URL, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

async function getImage(photo) {
    const key = process.env.GOOGLE_API_KEY;
    const photoReference = photo.photoReference;
    const maxWidth = 500;
    // console.log(input)
    const url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=${maxWidth}&key=${key}`;
    const headers = {
      "Content-Type": "application/json",
    };
  
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
  
    try {
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        return res;
      } else {
        throw new Error("Invalid POST Request");
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async function updatePhoto(uuid, data) {
    try {
      const updatedPhoto = await updatePh(uuid, data);
      return updatedPhoto;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  
  async function updatePh(uuid, updatedData) {
    const url = `${PHOTOS_BASE_URL}/${uuid}`;
  
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    if (res.ok) {
    } else {
      throw new Error("Invalid PUT Request");
    }
  }

postImages()

//hello world
