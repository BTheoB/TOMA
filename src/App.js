import React from "react";
// import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";



// 
//function de test de connection entre le serveur et le client
function AppTest() {
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

  return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{content}</p>
    </header>
  </div>
  );       
}

//function test d'affichage des infos completes sur les parkings 
function GetAdressParking() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("https://download.data.grandlyon.com/ws/rdata/lpa_mobilite.parking_lpa_2_0_0/all.json?maxfeatures=100&start=1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result["values"]);
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
          <li key={item["identifier"]}>
            {item["identifier"]} {item["address"]["schema:streetAddress"]}
          </li>
        ))}
      </ul>
  }

  items.forEach((element) => {
    formatedparkingsInfo[element["identifier"]] = element;
  });

  return (<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {formatedparkingsInfo}
    </header>
  </div>);
}

//function test d'affichages des info sur les parkings avec leur nombre de place en temps réel
function getParkingsRealTime(){
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

  if (error) {
    return <div>Erreur : {error.message}</div>
  } else if (!isLoaded) {
    return <div>Chargement...</div>
  } else {
    return items;
  }

  
}

//Donne le tableau d'information complet sur les parkings
function getParkingsInfo(){  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("https://download.data.grandlyon.com/ws/rdata/lpa_mobilite.parking_lpa_2_0_0/all.json?maxfeatures=100&start=1")
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

  if (error) {
    return <div>Erreur : {error.message}</div>
  } else if (!isLoaded) {
    return <div>Chargement...</div>
  } else {
    return items["values"];
  }
}




// Initialise le contexte de l'application : 
// -  Cette fonction initialise les parkings dans des tableau afin d'éviter de devoir refaire des requêtes à l'API
//    Le tableau est stocker dans le local storage 

function initContext(){

  let parkings = getParkingsRealTime(); //A mettre dans le local storage 
  
  let parkingsInfo = getParkingsInfo(); //A mettre dans le local storage 
  let formatedparkingsInfo = [];  //Même tableau que parkingsInfo mais indexé par le code identifiant des parkings

  parkingsInfo.forEach((element) => {
    formatedparkingsInfo[element["identifier"]] = element;
  });

  var found = false;
  
  parkings.forEach(element => {
    
    while(!found){
      if(element["Parking_schema:identifier"] == parkingsInfo[i])
    }


  });  
}


function App(){
  initContext();
}



export default GetAdressParking;
