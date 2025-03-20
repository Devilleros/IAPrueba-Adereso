export async function GET (){
    const token = "392026e2-47ea-453d-96b2-b16c85bf77ca"
    const res = await fetch("https://recruiting.adere.so/challenge/test",{
    //const res = await fetch("https://recruiting.adere.so/challenge/start",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()

      return Response.json({data})
}