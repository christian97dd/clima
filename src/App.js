import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {
  // state principal
  // ciudad = state, setCiudad = this.setState()
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [error, setError] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    // prevenir ejecucion

    if(ciudad === '') return;
    const consultarApi = async () => {

      const appId = '82473d95b393e87b759d06da7242a4f5';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      // consultar la url 
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setResultado(resultado);
      
      
    }

    consultarApi();
  },[ ciudad, pais ]);


  const datosConsulta = datos => {
    // validar que ambos campos esten
    if(datos.ciudad === '' || datos.pais === '') {
      setError(true);
      return;
    }
    // ciudad y pais existen, agregarlos al state
    setCiudad(datos.ciudad);
    setPais(datos.pais);
    setError(false); 
  }




  // cargar un componente condicionalmente
  let componente;
  if(error) {
    // hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if (resultado.cod === "404"){
    componente = <Error mensaje="La ciudad no existe en nuestro registro" /> 
  } else {
    // mostrar el clima
    componente = <Clima resultado={resultado}/>
  }


  return (
    <div className="App">
      <Header 
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
