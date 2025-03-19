export async function POST (req: Request){
    const token = "392026e2-47ea-453d-96b2-b16c85bf77ca"
    const problem = await req.json();
    const prompt = `
    Analiza el siguiente texto y extrae:
1. Los nombre (el key sera "name") mencionados (pueden ser planetas, personajes, pokémon, etc.).
2. Las magnitudes o atributos asociados a cada nombre (y paslo a ingles como población = "population", altura = "height", masa = "mass", etc.).
3. Las operaciones matemáticas mencionadas entre sí (como suma, resta, etc.).
4. organiza el array como la ecuacion que resolveria el enunciado(dato1 * dato2).
5. añade la franquicia a la que pertenece y que es (pokemon o starwar)
6. no puede terminar en una operacion por que no se podria resolver.
7. no agregues enunciado ni explicaciones, solo el json
8. si es un planeta indicarlo("name": "Endor", "planet": "si", "atributo": "surface_water", "franquicia" : "starwar")
Proporciona una respuesta en formato JSON. Aquí está el texto:
:${problem}

Ejemplo de salida JSON:
{
  "elementos": [
    { "name": "Cerea", "planet": "si","atributo": "population", "franquicia" : "starwar"},
    { "operacion": "suma"},
    { "name": "Endor", "planet": "si","atributo": "surface_water", "franquicia" : "starwar" },
    { "operacion": "suma"},
    { "name": "pikachu","planet": "no", "atributo": "weight", "franquicia" : "pokemon" }
  ]
}
  `
    
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
              content: prompt
            }
          ]
        })
      })
      const data = await res.json()
      return new Response (JSON.stringify(data))
}