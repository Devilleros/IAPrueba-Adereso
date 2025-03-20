import { NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    const token = "392026e2-47ea-453d-96b2-b16c85bf77ca"
    const request = await req.json();

    //console.log(request);

    
    const prompt = `Analiza el siguiente enunciado: "${request.enunciado}" y los datos: ${request.datos}. 
      Devuelve únicamente el número de la solución con hasta 10 decimales.
      No incluyas texto adicional, ejemplos ni explicaciones, responde exclusivamente con el número. Ejemplo de salida esperada: 4569.1234567890
     `;

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