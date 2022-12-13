import React from "react";
import {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import MapContainer from "../Components/Map";
import "../App";
import 'bulma/css/bulma.min.css';
import Card from "../Components/card";
import ConnectedNavBar from "../Components/ConnectedNavBar";
import { BarDeRecherche } from "../Components/BarDeRecherche";





//fonction qui rend les information d'un parking selon son Identifiant 
function getInfoParking(id) {

  if(localStorage.getItem('FormatedTabParkingInfo') != null){
    return JSON.parse(localStorage.getItem('FormatedTabParkingInfo'))[id];
    //FormatedTabParkingAdress = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));
    //return FormatedTabParkingAdress[id];
  }
}


//Donne le tableau d'information complet sur tous les parkings
class ConnectedHome extends Component {
  constructor() {
    super();

    this.state = {
      currentParking: 'LPA0724'
      // ,positionActuelle:[lat: "45.78169339534074", lng: 4.879089080629745]
    }
  }

  changeParking = (parking) => {
    this.setState({ currentParking: parking });
  }

  //Mettre le card dans la map pour eviter de recharger la map à chaque fois

  render() {
    return (

      <div className="block">
          <ConnectedNavBar />
          <BarDeRecherche changeParking={this.changeParking} />
        <div className="columns">
          <div className="column">
            <MapContainer changeParking={this.changeParking} />
          </div>
          <div className="column is-4">
            <Card currentParking={this.state.currentParking} />
          </div>
        </div>
      </div>
    );
  }
}
  

export default ConnectedHome;