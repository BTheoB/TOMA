import React from "react";
// import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import logo from "./logo.svg";
import Map from './Map';
import "./App.css";



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
      <Map />
    </div>
  );
}

//  Cette fonction créer un tableau tel que tab(key,value) nommé FormatedTabParkingAdress 
//  avec la key étant l'identifier (ex "L23DL4") et la valeur etant les informations sur le parking
//  Cela permet de retrouver plus facilement les informations d'un parking
function setTabParking(parkingsInfo){
  
  let formatedparkingsInfo = {};
  parkingsInfo.values.forEach((element) => {                   //Créer un tableau permettant d'acceder directement à l'élement voulue par ca clé
    formatedparkingsInfo[element["identifier"]] = element;
  });

  localStorage.setItem('FormatedTabParkingInfo', JSON.stringify(formatedparkingsInfo));

}

//fonction qui rend les information d'un parking selon son Identifiant 
function GetInfoParking(id) {
  
  let FormatedTabParkingAdress = localStorage.getItem('FormatedTabParkingInfo');
  // Il faut surment parse la string FormatedTabParkingAdress
  return FormatedTabParkingAdress[id];

}


function getBothApi(){

  const [isLoadedAPI1, setIsLoaded1] = useState(false);
  const [isLoadedAPI2, setIsLoaded2] = useState(false);

  useEffect(() => {
    fetch("https://download.data.grandlyon.com/files/rdata/lpa_mobilite.donnees/parking_temps_reel.json")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded1(true);
          setItems(result);
          localStorage.setItem('resulatParkingsRealTime', JSON.stringify(result));
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded1(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    fetch("https://download.data.grandlyon.com/ws/rdata/lpa_mobilite.parking_lpa_2_0_0/all.json?maxfeatures=100&start=1")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded2(true);
          setItems(result);
          localStorage.setItem('resulatParkingsInfo', JSON.stringify(result));
          setTabParking(result);
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded2(true);
          setError(error);
        }
      )
  }, []);



  if (isLoadedAPI1 && isLoadedAPI2) {
    return true
  }
  

}

//function test d'affichages des info sur les parkings avec leur nombre de place en temps réel
function GetParkingsRealTime() {
  
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
          localStorage.setItem('resulatParkingsRealTime', JSON.stringify(result));
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>
  } else if (!isLoaded) {
    return <div>Chargement...</div>
  } else {
    return items;
  }


}

//Donne le tableau d'information complet sur tous les parkings
function GetParkingsInfo() {
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
          localStorage.setItem('resulatParkingsInfo', JSON.stringify(result));
          setTabParking(result);
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
    return error.message
  } else if (!isLoaded) {
    return "Chargement..."
  } else {
    return (
      <ul>
        <li>
          'c est prêt !'
        </li>
        {items.values.map(item => (
          <li key={item["identifier"]}>
            {item["identifier"]} {item["address"]["schema:streetAddress"]}
          </li>
        ))}
      </ul>
    );
  }

}






// Initialise le contexte de l'application : 
// -  Cette fonction initialise les parkings dans des tableau afin d'éviter de devoir refaire des requêtes à l'API
//    Le tableau est stocker dans le local storage 

function initContext() {
  const [isLoaded, isLoadedAPI1] = useState([]);
  const [isLoaded2, isLoadedAPI2] = useState([]);

  let isLoaded = GetParkingsInfo();
  let isLoaded2 = GetParkingsRealTime();

  if()

}


function App() {


  initContext();

  var items = localStorage.getItem('resulatParkingsInfo') ? localStorage.getItem('resulatParkingsInfo') : [];
  items = JSON.parse(items);
  console.log(items);
  return (
    <ul>
      {items.values.map(item => (
        <li key={item["identifier"]}>
          {item["identifier"]} {item["address"]["schema:streetAddress"]}
        </li>
      ))}
    </ul>
  );
  //Pour tester ce que rend la fonction dans les tableaux 
}



export default initContext;
