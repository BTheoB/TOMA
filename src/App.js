import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [data]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}


//Fonction d'appel API pour avoir le nombre de place en temps réel d'un parking 
function ApiTRP() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("https://download.data.grandlyon.com/files/rdata/lpa_mobilite.donnees/parking_temps_reel.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  let content = ' ';


  if (error) {
    content = <div>Erreur : {error.message}</div>

  } else if (!isLoaded) {
    content = <div>Chargement...</div>
  } else {
    content = 
      <ul>
        {items.map(item => (
          <li key={item["Parking_schema:identifier"]}>
            {item["mv:currentValue"]} {item["Parking_schema:name"]} {item["dct:date"]}
          </li>
        ))}
      </ul>
    
  }

  return (<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{content}</p>
    </header>
  </div>);
}



export default ApiTRP;