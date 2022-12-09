import React from "react";
// import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import MapContainer from "../Components/Map";
import "../App";
import 'bulma/css/bulma.min.css';
import Card from "../Components/card";



//fonction qui rend les information d'un parking selon son Identifiant 
function getInfoParking(id) {

  if(localStorage.getItem('FormatedTabParkingInfo') != null){
    return JSON.parse(localStorage.getItem('FormatedTabParkingInfo'))[id];
    //FormatedTabParkingAdress = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));
    //return FormatedTabParkingAdress[id];
  }
}


//Donne le tableau d'information complet sur tous les parkings
function Home() {
      return (
        <div className="block">
          <div className="columns">
            <div className="column">
              <MapContainer />
            </div>
            <div className="column is-4">
              <Card />
            </div>
          </div>
        </div>
      );
    }
  

export default Home;