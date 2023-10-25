require("dotenv").config();
const CHILDCARES_BASE_URL = `${process.env.NODE_BASE_URL}/childcares`;
const PHOTOS_BASE_URL = `${process.env.NODE_BASE_URL}/photos`;
const REVIEWS_BASE_URL = `${process.env.NODE_BASE_URL}/reviews`;

startProcessing()

async function startProcessing() {
  const childCares = await getChildCares();
  for (let elId = 1; elId <= 817; elId++) {
    const delay = (elId) * 5000; // 5 seconds delay for each iteration
    executeWithDelay(elId, delay, childCares);
    // console.log("Run", elId)
  }
}

function executeWithDelay(elId, delay, childCares) {
  setTimeout(() => {
    postPlaceIds(elId, childCares);
  }, delay);
}

// postPlaceIds(498);

async function postPlaceIds(elId, childCares) {
  //   const childCares = await getChildCares();
  let requestedPlaceIds = new Set(); // Create a Set to store requested placeIds
  const elementNumber = elId;

  childCares.forEach((element) => {
    if (element.id < elementNumber && !requestedPlaceIds.has(element.placeId)) {
      requestedPlaceIds.add(element.placeId);
    }
  });

  childCares.forEach(async (element) => {
    if (
      element.id === elementNumber &&
      (element.city === "EDMONTON") /* && element.latitude === null*/
    ) {
      console.log(`Start processing id ${element.id}`);
      const result = await getPlaceIdDetails(element);
      // console.log(result);
      if (result.status === "OK") {
        const data = {
          latitude: result.result.geometry.location.lat
            ? result.result.geometry.location.lat
            : null,
          longitude: result.result.geometry.location.lng
            ? result.result.geometry.location.lng
            : null,
          website: result.result.website ? result.result.website : null,
          rating: result.result.rating ? result.result.rating : null,
          userRatingsTotal: result.result.user_ratings_total
            ? result.result.user_ratings_total
            : null,
        };
        await updateChildCare(element.uuid, data);
        // console.log(`childCare id ${element.id} is updated`);

        if (!requestedPlaceIds.has(element.placeId)) {
          requestedPlaceIds.add(element.placeId);
          let reviewData = result.result.reviews?.map((review) => {
            return {
              placeId: element.placeId,
              authorName: review.author_name,
              profilePhotoUrl: review.profile_photo_url,
              rating: review.rating,
              relativeTimeDescription: review.relative_time_description,
              text: review.text,
              time: review.time,
              translated: review.translated,
            };
          });

          if (reviewData) {
            await createReviews(reviewData);
          }

          const photoData = result.result.photos?.map((photo) => {
            return {
              placeId: element.placeId,
              height: photo.height,
              width: photo.width,
              photoReference: photo.photo_reference,
            };
          });
          // photoData?.forEach(async (photo) => {
          //   await createPhoto(photo);
          // });
          if (photoData) {
            await createPhotos(photoData);
          }
        }
      }
    }
  });
}

async function getChildCares() {
  try {
    const data = await index();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function index() {
  const res = await fetch(CHILDCARES_BASE_URL, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

async function getPlaceIdDetails(element) {
  const key = process.env.GOOGLE_API_KEY;
  const placeId = element.placeId;
  // console.log(input)
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
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
      return res.json();
    } else {
      throw new Error("Invalid POST Request");
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function updateChildCare(uuid, data) {
  try {
    const updatedChildCare = await updateCh(uuid, data);
    return updatedChildCare;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function updateCh(uuid, updatedData) {
  const url = `${CHILDCARES_BASE_URL}/${uuid}`;

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

// async function createPhoto(data) {
//   try {
//     const newPhoto = await createPh(data);
//     return newPhoto;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// }

// async function createPh(data) {
//   try {
//     const res = await fetch(PHOTOS_BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     // console.log(JSON.stringify(data))
//     if (res.ok) {
//       return res.json();
//     }
//   } catch (err) {
//     throw new Error("Invalid Request");
//   }
// }

// async function createReview(data) {
//   try {
//     const newPhoto = await createRw(data);
//     return newPhoto;
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// }

// async function createRw(data) {
//   try {
//     const res = await fetch(REVIEWS_BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     // console.log(JSON.stringify(data))
//     if (res.ok) {
//       return res.json();
//     }
//   } catch (err) {
//     throw new Error("Invalid Request");
//   }
// }

async function createPhotos(dataArray) {
  try {
    const batchSize = 10;
    const responses = [];

    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batchData = dataArray.slice(i, i + batchSize);

      const res = await fetch(PHOTOS_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batchData),
      });

      console.log(batchData);

      if (res.ok) {
        responses.push(await res.json()); // Add the response to the array
      } else {
        throw new Error("Request failed");
      }
    }

    return responses; // Return an array of responses
  } catch (err) {
    throw new Error("Invalid Request");
  }
}

async function createReviews(dataArray) {
  try {
    const batchSize = 5;
    const responses = [];

    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batchData = dataArray.slice(i, i + batchSize);

      // console.log(batchData)

      const res = await fetch(REVIEWS_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batchData),
      });

      console.log(batchData);

      if (res.ok) {
        responses.push(await res.json()); // Add the response to the array
      } else {
        throw new Error("Request failed");
      }
    }

    return responses; // Return an array of responses
  } catch (err) {
    throw new Error("Invalid Request");
  }
}