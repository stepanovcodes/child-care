require("dotenv").config();
const CHILDCARES_BASE_URL = `${process.env.NODE_BASE_URL}/childcares`;

startProcessing()

async function startProcessing() {
  const childCares = await getChildCares();
  for (let elId = 1; elId <= 451; elId++) {
    const delay = elId * 5000; // 5 seconds delay for each iteration
    executeWithDelay(elId, delay, childCares);
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
      element.city === "CALGARY" /* && element.latitude === null*/
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
        };
        await updateChildCare(element.uuid, data);
        // console.log(`childCare id ${element.id} is updated`);
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
