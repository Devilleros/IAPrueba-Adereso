import { NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    const token = "392026e2-47ea-453d-96b2-b16c85bf77ca"
    const request = await req.json();

    //console.log(request);

    
    const prompt = `Dado el siguiente enunciado: "${request.enunciado}", extrae solo el valor numérico de la solución con hasta 10 decimales. datos: ${request.datos}. solo dame la respuesta numerica`;;

    //const prompt = `Te pasare los datos de un enunciado devuelveme solo el valor numerico, con hasta 10 decimales si aplica${request}`

    const res = await fetch("https://recruiting.adere.so/chat_completion",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify( {
          model: "gpt-40-mini",
          messages: [
            {
              role: "developer",
              content: "Presentando una prueba, aprendiendo a integrar IA a mis proyectos"
            },
            {
              role: "user",
              content: JSON.stringify(prompt)
            }
          ]
        })
      })
      const data = await res.json()
      return new Response (JSON.stringify(data))
}