export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function fetchData() {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/varo_app/records?page=1&perPage=30`
  );
  const data = await res.json();
  return data;
}
