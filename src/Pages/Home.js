import React, { Component } from "react";
// import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import MapContainer from "../Components/Map";
import "../App";
import 'bulma/css/bulma.min.css';
import Card from "../Components/card";
import { BarDeRecherche } from "../Components/BarDeRecherche";
import NavBar from "../Components/NavBar";




//Donne le tableau d'information complet sur tous les parkings
class Home extends Component {

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
        <BarDeRecherche changeParking={this.changeParking} />
          <NavBar />
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


export default Home;