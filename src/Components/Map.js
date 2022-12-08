import React, { Component } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
var parse = require('html-react-parser');


export class MapContainer extends Component {


  render() {
    const style = {
      position: 'right',
      width: '65%',
      height: '65%',
      margin: '20px',
    }
    return (
      <div>
        <div className="block">
          <Map
            google={this.props.google}
            zoom={10}
            style={style}
            initialCenter={{
              lat: 45.78169339534074,
              lng: 4.879089080629745
            }}
            onClick={this.onMapClicked}
          >


            {/* <Marker onClick={this.onMarkerClick}
                    name={'Current location'} /> */}

          
            {/* <Marker key={"LPA0764"} position={{ lat: 45.768522, lng: 4.83773 }} onClick={() => {parkingInfoPopUp("LPA0764")}} /> */}
            {loadMarkerParkingMap().map(parking =>(
              <Marker key={parking["id"]} position={{ lat: parking["lat"], lng: parking["lon"] }} onClick={() => {parkingInfoPopUp(parking["id"])}} />
            ))}
            {/* <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow> */}
          </Map>
        </div>
      </div>
    );
  }


}


//En cours
function parkingInfoPopUp(id) {

  if (localStorage.getItem('resulatParkingsRealTime') != null && localStorage.getItem('FormatedTabParkingInfo') != null) {

    let parkingsInfo = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));
    console.log(parkingsInfo[id]["identifier"]);
  }
}


//Initialise le tableau de parkings à afficher sur la map
function loadMarkerParkingMap() {


  if (localStorage.getItem('FormatedTabParkingInfo') != null && localStorage.getItem('resulatParkingsRealTime') != null) {

    let parkingsTempsReel = JSON.parse(localStorage.getItem('resulatParkingsRealTime'));
    let FormatedTabParkingInfo = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));

    let returnVal = [];
    let tableauIntermediaire =[]; 

    parkingsTempsReel.forEach(parking => {

      tableauIntermediaire = [];
      tableauIntermediaire["id"] = parking["Parking_schema:identifier"];
      tableauIntermediaire["lat"] = FormatedTabParkingInfo[parking["Parking_schema:identifier"]]["lat"];
      tableauIntermediaire["lon"] =FormatedTabParkingInfo[parking["Parking_schema:identifier"]]["lon"];
      returnVal.push(tableauIntermediaire);

    });

    return returnVal;
  }

  

}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyAlxyNI4iFH0A0NovgIm6XhqEDM5JFZkek")
})(MapContainer)