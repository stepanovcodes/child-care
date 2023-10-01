require("dotenv").config();
const PHOTOS_BASE_URL = `${process.env.NODE_BASE_URL}/photos`;

async function postImages() {
  const photos = await getPhotos();
  photos.forEach(async (photo) => {
    // if (photo.placeId !== null) {
     if (photo.id === 2) {
      const result = await getImage(photo);
      const arrayBuffer = await result.arrayBuffer();
      const imageData = Buffer.from(
        arrayBuffer
      ).toString("base64");
      const imageType = result.headers.get("content-type");
      console.log(imageData);
      // console.log(result.arrayBuffer());
      const contentDispositionHeader = result.headers.get(
        "content-disposition"
      );
      let imageName = null;
      if (contentDispositionHeader) {
        // Use a regular expression to extract the filename from the content-disposition header
        const matches = /filename="([^"]+)"/.exec(contentDispositionHeader);

        if (matches && matches.length > 1) {
          imageName = matches[1];
        } else {
          // Filename not found in content-disposition header
          imageName = null;
        }
      } else {
        // Content-Disposition header not found in the response
        imageName = null;
      }

      await updatePhoto(photo.uuid, {
        imageData: imageData,
        imageType: imageType,
        imageName: imageName,
      });
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

  console.log(JSON.stringify(updatedData))

  if (res.ok) {
  } else {
    throw new Error("Invalid PUT Request");
  }

  // const url = `${PHOTOS_BASE_URL}/${uuid}`;

  // const res = await fetch(url, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": updatedData.imageType,
  //   },
  //   body: updatedData.imageData,
  // });

  // console.log(updatedData.imageData)

  // if (res.ok) {
  // } else {
  //   throw new Error("Invalid PUT Request");
  // }
}

postImages();
