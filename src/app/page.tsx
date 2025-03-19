"use client"

import Button from "@/components/Button"
import { useState } from "react"

export default function Home (){
  const [data, setData] = useState<any>(null);
  const [problem, setProblem] = useState<any>(null);
  const [resIA, setResIA] = useState<any>(null);
  const [consApi, setConsApi] = useState<any>(null);
  const [soluIA, setSoluIA] = useState<any>(null);
  const handleEnu = async () => {
    try {
      const respuesta = await fetch("/api/consultaPrueba",{method: "GET"})
      const datos = await respuesta.json();
      setData(datos.data); //setData(datos.data.problem);
      setProblem(datos.data.problem)
    } catch (error) {
      
    }
  }
  const handlePalCla = async ()=>{
    try {
      const respuesta = await fetch("/api/consultaIA",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problem)
      })
      const datos = await respuesta.json();
      //const jsonObject = datos.choices[0].message.content
      setResIA(datos);
      
    } catch (error) {
      
    }
  }
  const handleDat = async ()=>{
    
    try {
      const respuesta = await fetch("/api/procesar",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resIA.choices[0].message.content)
      })
      const datos = await respuesta.json();
      setConsApi(datos);
            
    } catch (error) {
      
    }
  }
  const handleResIA = async ()=>{
    const PromptCompleto = {enunciado : JSON.stringify(data), datos: JSON.stringify(consApi)}
    console.log(PromptCompleto);
    
    try {
      const respuesta = await fetch("/api/respuestaIA",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },       
        body: JSON.stringify(PromptCompleto)
      })
      const datos = await respuesta.json();
      setSoluIA(datos);
      
    } catch (error) {
      
    }
  }
  return <>
    <Button onClick={handleEnu}>Consulta</Button>
    <p>Haz clic en el botón para consultar la API.</p>
    {data && (<>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <Button onClick={handlePalCla}>Cosultar a IA</Button>
    </>
    )}
  {resIA && (<>
    <pre>
      {JSON.stringify(resIA.choices[0].message.content,null,2)}
    </pre>
      <Button onClick={handleDat}>Buscar valores</Button>
  </>)}
  {consApi && (<>
    <pre>
      {JSON.stringify(consApi, null, 2)}
    </pre>
    <Button onClick={handleResIA}>Preguntar por respuesta</Button>
  </>)}
  {soluIA && (
    <>
      <pre>
        {JSON.stringify(soluIA.choices[0].message.content,null,2)}
      </pre>
    </>
  )}
  </>
}
// const info = resIA.choices[0].message.content.replace(/```json/g, '')
//                                             .replace(/```/g, '')
//                                             .replace(/\n/g, '')
//                                             .trim();
// const info2 = JSON.stringify(info)
// console.log(info2);
//console.log(resIA);