const BASE_URL = `${process.env.NEXT_APP_BASE_URL}/photos`;

export async function detail(uuid) {
  const url = `${BASE_URL}/${uuid}`;
  const config = {
    method: "GET",
    /*cache: 'no-store',*/
    next: {revalidate: 600},
  };
  const res = await fetch(url, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}
