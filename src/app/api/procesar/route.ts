import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let jsonMatch = "";
    const request = await req.json();
    if(request.match(/```json\n([\s\S]*?)\n```/)){
         jsonMatch =  request.match(/```json\n([\s\S]*?)\n```/);
    }else{
         jsonMatch = request;   
    }
    

    interface ArrDatos {
        planet?: string;
        name?: string;
        atributo?: string;
        franquicia?: string;
        franchise?: string;
        operacion?: string;
        rotation_period?: number;
        orbital_period?: number;
        diameter?: number;
        surface_water?: number;
        population?: number;
        height?: number;
        mass?: number;
        homeworld?: string;
        base_experience?: number;
        weight?: number;
    }

    interface ParsedContent {
        elementos: ArrDatos[];
    }

    interface Names{
        planet?: string;
        name?: string;
        fran?: string;
    }
    

    let parsedContent: ParsedContent = { elementos: [] };
    if (typeof jsonMatch === "string") {
        try {
            parsedContent = JSON.parse(jsonMatch);
              } catch (error) {
              console.error("Error al parsear el JSON:", error);
              return NextResponse.json(
                  { error: "Error al parsear el JSON" },
                  { status: 400 }
              );
              }
    }
    else if (jsonMatch[1]) {
        try {
            parsedContent = JSON.parse(jsonMatch[1]);
              } catch (error) {
              console.error("Error al parsear el JSON:", error);
              return NextResponse.json(
                  { error: "Error al parsear el JSON" },
                  { status: 400 }
              );
              }
    } else {
    console.error("No se encontró contenido JSON en la respuesta.");
    return NextResponse.json(
        { error: "No se encontró contenido JSON en la respuesta." },
        { status: 400 }
    );}


    //console.log(parsedContent);
    
  // Procesar datos
  const names: Names[] = parsedContent.elementos
    .filter((item) => item.name)
    .map((item) => {
      if(item.franquicia === "pokemon"){
        return { name: item.name?.toLowerCase(), fran: item.franquicia || item.franchise, planet: item.planet };
      }else{
        return { name: item.name, fran: item.franquicia || item.franchise, planet: item.planet }
      }
    });

  async function processElements(): Promise<ParsedContent> {
    const arrDatos: ParsedContent = { elementos: [] };

    // console.log(names);

    for (const element of names) {
      if (element.fran === "pokemon") {
        // console.log("entro");
        
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${element.name}`,
            {
              method: "GET",
            }
          );

          if (!res.ok) {
            console.error(
              `Error fetching data for ${element.name}:`,
              res.statusText
            );
            continue;
          }

          const data = await res.json();
          const dataUtil: ArrDatos = {
            name: element.name,
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
          };

          arrDatos.elementos.push(dataUtil);
        } catch (error) {
          console.error(`Error procesando ${element.name}:`, error);
        }
      } else {
        if (element.planet === "si") {
            let i=true
            let cont= 0
            while (i){
                cont ++
                try {
                    const res = await fetch(
                      `https://swapi.dev/api/planets/${cont}/`,
                      {
                        method: "GET",
                      }
                    );
          
                    if (!res.ok) {
                      console.error(
                        `Error fetching data for ${element.name}:`,
                        res.statusText
                      );
                      continue;
                    }
                    const data = await res.json();
                    if(data.name === element.name){
                        const dataUtil: ArrDatos = {
                            name: element.name,
                            rotation_period: data.rotation_period,
                            orbital_period: data.orbital_period,
                            diameter: data.diameter,
                            surface_water: data.surface_water,
                            population: data.population
                        };
                        arrDatos.elementos.push(dataUtil);
                        i =false
                    }
                    if(cont>50){i=false}
          
                  } catch (error) {
                    console.error(`Error procesando ${element.name}:`, error);
                  }
            }
            //arrDatos.elementos.push(element);
        } else {
            let i=true
            let cont= 0
            while (i){
                cont ++
                try {
                    const res = await fetch(
                      `https://swapi.dev/api/people/${cont}/`,
                      {
                        method: "GET",
                      }
                    );
          
                    if (!res.ok) {
                      console.error(
                        `Error fetching data for ${element.name}:`,
                        res.statusText
                      );
                      continue;
                    }
                    const data = await res.json();
                    if(data.name === element.name){
                        const dataUtil: ArrDatos = {
                            name: element.name,
                            height: data.height,
                            mass: data.mass,
                            //homeworld: data.homeworld
                        };
                        arrDatos.elementos.push(dataUtil);
                        i = false
                    }
                    if(cont>75){i=false}
          
                  } catch (error) {
                    console.error(`Error procesando ${element.name}:`, error);
                  }
            }
        }
      }
    }

    return arrDatos;
  }

  try {
    const arrDatos = await processElements();
    return NextResponse.json(arrDatos);
  } catch (error) {
    console.error("Error al procesar elementos:", error);
    return NextResponse.json(
      { error: "Error interno al procesar los elementos." },
      { status: 500 }
    );
  }
}


// import { log } from "console";
// import next from "next";

// export async function POST (req:Request){
//     const request = await req.json()
//     const jsonMatch = request.match(/```json\n([\s\S]*?)\n```/);

//     interface ArrDatos {
//         name?: string,
//         atributo?: string;
//         franquicia?: string;
//         franchise?: string,
//         operacion?: string;
//         rotation_period?: number,
//         orbital_period?: number,
//         diameter?: number,
//         surface_water?: number,
//         population?: number,
//         height?: number,
//         mass?: number,
//         homeworld?: string,
//         base_experience?: number,
//         weight?: number
//     }

//     interface ParsedContent {
//         elementos: ArrDatos[];
//     }

//     let parsedContent: ParsedContent = {elementos: []}

//     if (jsonMatch && jsonMatch[1]) {
//         try {
//             parsedContent = JSON.parse(jsonMatch[1]);
//             //console.log("Contenido extraído como JSON:", parsedContent);
//         } catch (error) {
//             console.error("Error al parsear el JSON:", error);
//         }
//     } else {
//         console.error("No se encontró contenido JSON en la respuesta.");
//     }
//     ///////////////////////////////////////
//     const names =  parsedContent.elementos
//                                 .filter(item => item.name)
//                                 .map(item => {return ({"name": item.name, "fran": item.franquicia||item.franchise})})


//     console.log(names);
    
//     //let arrDatos: ParsedContent = {elementos:[]}

//     async function processElements(): Promise<Response> {
//         const arrDatos: ParsedContent = { elementos: [] };
//         for (const element of names) {
//             if (element.fran === "pokemon") {
//               try {
//                 const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.name.toLowerCase()}`, {
//                   method: "GET"
//                 });
        
//                 if (!res.ok) {
//                   console.error(`Error fetching data for ${element.name}:`, res.statusText);
//                   continue; // Si la respuesta no es válida, salta al siguiente elemento
//                 }
        
//                 const data = await res.json();
//                 const dataUtil: ArrDatos = {
//                   name: element.name,
//                   base_experience: data.base_experience,
//                   height: data.height,
//                   weight: data.weight
//                 };
        
//                 arrDatos.elementos.push(dataUtil);
//               } catch (error) {
//                 console.error(`Error procesando ${element.name}:`, error);
//               }
//             } else {
//               arrDatos.elementos.push(element); // Para Star Wars u otros, mantén los datos originales
//             }
//           }
        
//           return new Response(JSON.stringify(arrDatos), {
//             headers: { "Content-Type": "application/json" }
//           });
//     }
    
//     processElements().then((response) => {
//      response.text().then((text) => console.log("Resultado final:", text));
//     })
// }
/*


async function processElements(): Promise<Response> {
  const arrDatos: ArrDatos = { elementos: [] };

  for (const element of names) {
    if (element.fran === "pokemon") {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${element.name.toLowerCase()}`, {
          method: "GET"
        });

        if (!res.ok) {
          console.error(`Error fetching data for ${element.name}:`, res.statusText);
          continue; // Si la respuesta no es válida, salta al siguiente elemento
        }

        const data = await res.json();
        const dataUtil: PokemonData = {
          name: element.name,
          base_experience: data.base_experience,
          height: data.height,
          weight: data.weight
        };

        arrDatos.elementos.push(dataUtil);
      } catch (error) {
        console.error(`Error procesando ${element.name}:`, error);
      }
    } else {
      arrDatos.elementos.push(element); // Para Star Wars u otros, mantén los datos originales
    }
  }

  return new Response(JSON.stringify(arrDatos), {
    headers: { "Content-Type": "application/json" }
  });
}


*/
//const contentString = request.choices[0].message.content;
// const jsonMatch = request.match(/```json\n([\s\S]*?)\n```/);


// return new Response (JSON.stringify("bien"))
// const request = await req.json();
// const reqOjb = request.replace(/```json/g, '')
//                         .replace(/```/g, '')
//                         .replace(/\n/g, '')
//                         .trim();
// let reqArr: object[];
// try {
//     const parseData = JSON.parse(reqOjb);
//     if (parseData && parseData.elementos){
//         reqArr = parseData.elementos;
//     }else{
//         throw new Error("Expected 'elementos' property is missing.");
//     }
// } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return new Response("Invalid JSON input", { status: 400 });
// }

// console.log(reqArr);

//const reqArr: object[] = JSON.parse(reqOjb).elementos
// console.log(reqArr);
// console.log(reqArr.length);
// const arr:object[] = await reqArr.flatMap((elemento: object)=>{
//     if ("name" in elemento) {
//         return elemento
//     } 
//     return []
// })
