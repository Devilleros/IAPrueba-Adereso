import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const token = "392026e2-47ea-453d-96b2-b16c85bf77ca"
    const request = await req.json()
    console.log(request);
    

    const res = await fetch("https://recruiting.adere.so/challenge/solution",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(request)
      })
      const data = await res.json()

      console.log(data);
      

    return new Response (JSON.stringify(data))
}