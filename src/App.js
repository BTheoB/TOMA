import { React, useState, useEffect, Component } from 'react';
import "./App.css";
import Home from "./Pages/Home";
import Connection from "./Pages/Connection";
import {Route, Routes} from 'react-router-dom';
import NavBar from './Components/NavBar';


//function de test de connection entre le serveur et le client
// function AppTest() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, [data]);


//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

//  Cette fonction créer un tableau tel que tab(key,value) nommé FormatedTabParkingAdress 
//  avec la key étant l'identifier (ex "L23DL4") et la valeur etant les informations sur le parking
//  Cela permet de retrouver plus facilement les informations d'un parking
function setTabParking(parkingsInfo) {

  let formatedparkingsInfo = {};
  parkingsInfo.values.forEach((element) => {                   //Créer un tableau permettant d'acceder directement à l'élement voulue par ca clé
    formatedparkingsInfo[element["identifier"]] = element;
  });

  localStorage.setItem('FormatedTabParkingInfo', JSON.stringify(formatedparkingsInfo));

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
          <p>"c est prêt !"</p>
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



function App() {

  //Initialise le contexte des données
  //Place dans le localStorage les données des parkings via l'api
  GetParkingsInfo();
  GetParkingsRealTime();
  //
  return <div className="App">
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Connection" element={<Connection />} />
    </Routes>

  </div>
}


function App2() {

  GetParkingsInfo();
  GetParkingsRealTime();

  var items = localStorage.getItem('resulatParkingsInfo');

  if(localStorage.getItem('resulatParkingsInfo') != null){
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
  }else{
    return (
      "Chargement..."
    );
  }
  
  //Pour tester ce que rend la fonction dans les tableaux 
}



// export default initContext;
export default App;
