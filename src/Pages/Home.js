import React from "react";
// import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import MapContainer from "../Components/Map";




//Donne le tableau d'information complet sur tous les parkings
function Home() {
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
            localStorage.setItem('resulatParkings', JSON.stringify(result));
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
    } else{
      return (
        <ul>
          {items.values.map(item => (
            <li key={item["identifier"]}>
              {item["identifier"]} {item["address"]["schema:streetAddress"]}
            </li>
          ))}
          <MapContainer />
        </ul> 
      );
    }
  
  }

export default Home;