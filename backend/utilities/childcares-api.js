const BASE_URL = `http://localhost:4000/childcares`;

export async function index() {
    const res = await fetch(BASE_URL, { method: "GET", cache: 'no-store' });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }
  
  export async function create(data) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      throw new Error("Invalid Request");
    }
  }
  
  export async function destroy(uuid) {
    const url = `${BASE_URL}/${uuid}`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (res.ok) {
    } else {
      throw new Error("Invalid Request");
    }
  }
  
  export async function update(uuid, updatedData) {
    const url = `${BASE_URL}/${uuid}`;
  
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