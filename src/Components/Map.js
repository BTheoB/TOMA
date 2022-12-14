import React, { Component } from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {

  parkingInfoPopUp = (id) => {

    this.props.changeParking(id);

  }


  render() {
    const style = {
      position: 'right',
      width: '65%',
      height: '65%',
      margin: '20px',
    }

    //cette partie du code recupère la localisation actuelle de l'utilisateur afin de l'afficher
    //Ne fonctionne pas du fait que la page est constament rechargé
    
    // var latcur= 45.78169339534074;
    // var lngCur= 4.879089080629745;
  
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
          
    //         latcur= position.coords.latitude;
    //         lngCur= position.coords.longitude;
        
    //     }
    //   );
    // }






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


            {/* {<Marker position ={{latcur, lngCur}}
                    name={'Current location'} />} */}

          
            {/* <Marker key={"LPA0764"} position={{ lat: 45.768522, lng: 4.83773 }} onClick={() => {parkingInfoPopUp("LPA0764")}} /> */}
            {/* {loadMarkerParkingMap().length == 0 ? loadMarkerParkingMap().map(parking =>(
              <Marker key={parking["id"]} position={{ lat: parking["lat"], lng: parking["lon"] }} onClick={() => {this.parkingInfoPopUp(parking["id"])}} />
            )) : true} */}
            {loadMarkerParkingMap().map(parking =>(
              // <Marker key={parking["id"]} position={{ lat: parking["lat"], lng: parking["lon"] }} onClick={() => {parkingInfoPopUp(parking["id"])}} />
              <Marker key={parking["id"]} position={{ lat: parking["lat"], lng: parking["lon"] }} onClick={() => {this.parkingInfoPopUp(parking["id"])}} />
            ))}
          </Map>
        </div>
      </div>
    );
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