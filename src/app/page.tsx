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
    //console.log(PromptCompleto);
    
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

  const handleEnv = async ()=>{
    //const preAnswer = Number( soluIA.choices[0].message.content)
    //preAnswer.toString()
    const datosAEnviar = {
      problem_id: data.id,
      answer: Number( soluIA.choices[0].message.content),
    }
    
    console.log(datosAEnviar);
    
    try {
      const respuesta = await fetch("/api/enviarResp",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosAEnviar)
      })
      const nuevosDatos = await respuesta.json()
      console.log(nuevosDatos);
      
      setData(nuevosDatos.next_problem); //setData(datos.data.problem);
      setProblem(nuevosDatos.next_problem.problem)
    } catch (error) {
      
}
  }

  const enterParrafo = {
    whiteSpace: "pre-wrap"
  }

  return <>
    <Button onClick={handleEnu}>Consulta</Button>
    <p>Haz clic en el botón para consultar la API.</p>
    {data && (<>
      <pre style={enterParrafo}>
        {JSON.stringify(data, null, 2)}
      </pre>
      <Button onClick={handlePalCla}>Cosultar a IA</Button>
    </>
    )}
  {resIA && (<>
    <pre style={enterParrafo}>
      {JSON.stringify(resIA.choices[0].message.content,null,2)}
    </pre>
      <Button onClick={handleDat}>Buscar valores</Button>
  </>)}
  {consApi && (<>
    <pre style={enterParrafo}>
      {JSON.stringify(consApi, null, 2)}
    </pre>
    <Button onClick={handleResIA}>Preguntar por respuesta</Button>
  </>)}
  {soluIA && (
    <>
      <pre style={enterParrafo}>
        {JSON.stringify(Number(soluIA.choices[0].message.content),null,2)}
      </pre>
      <Button onClick={handleEnv}>enviar respuesta</Button>
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