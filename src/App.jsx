import { useState } from 'react'

import './App.css'

function App() {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [reload, setReload] = useState(0)

  const buscarClima = async() =>{
    if(!ciudad.trim()) return;

    const apikey = import.meta.env.VITE_OPENWEATHER_KEY;
    
      try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${ciudad}&lang=es`
      );
      const data = await res.json();
      setClima(data);
      console.log(data)
      setReload((r) => r + 1);
    } catch (error) {
      console.error("error: ", error);
    }

   
  };
  return (
    <>
      <div className="formulario">
        <h1>Aplicacion del tiempo</h1>
        <div>
          <input type="text" placeholder='Ciudad'  value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
          <button onClick={buscarClima}>Buscar </button>
        </div>
      </div>
      {clima && clima.location &&clima.current &&(

        <div className="informacion"  key={reload}>
        <h2>Ciudad: {clima.location.name}, {clima.location.country}</h2>
        <p>Temperatura: {clima.current.temp_c}C</p>
        <p>Informacion: {clima.current.condition.text}</p>
      </div>
      )}      
     
    </>
  )
}

export default App
