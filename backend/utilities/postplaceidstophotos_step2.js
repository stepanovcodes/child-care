async function postPlaceIds() {
  const childCares = await getChildCares();
  childCares.forEach(async (element) => {
    if (element.city === "MEDICINE HAT") {
      const data = {placeId: element.placeId}
      console.log(data)
      await createPhoto(data);
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
  const res = await fetch("http://localhost:4000/childcares", {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

async function createPhoto(data) {
  try {
    const newPhoto = await create(data);
    return newPhoto;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function create(data) {
  try {
    const res = await fetch('http://localhost:4000/photos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(JSON.stringify(data))
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    throw new Error("Invalid Request");
  }
}

postPlaceIds();
