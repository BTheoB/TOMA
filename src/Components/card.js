import React, { Component } from "react";
import 'bulma/css/bulma.min.css';


export class Card extends Component {
    render() {
      return (
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Liste de tous les parkings
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            <div class="card-content">
                <div class="content">
                    <ul>
                        <li> {/* ici faire la boucle pour afficher les *** ADRESSE *** des parking */} prochainement ... </li>
                    </ul>                 
                </div>
            </div>
        </div>
      );
    }
}

function parkingInfoPopUp(id) {

    if (localStorage.getItem('resulatParkingsRealTime') != null && localStorage.getItem('FormatedTabParkingInfo') != null) {
  
      let parkingsInfo = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));
      console.log(parkingsInfo[id]["identifier"]);
    }
}


function loadCardParkingMap() {


    // if (localStorage.getItem('FormatedTabParkingInfo') != null && localStorage.getItem('resulatParkingsRealTime') != null) {
  
    //   let parkingsTempsReel = JSON.parse(localStorage.getItem('resulatParkingsRealTime'));
    //   let FormatedTabParkingInfo = JSON.parse(localStorage.getItem('FormatedTabParkingInfo'));
  
    //   let returnVal = [];
    //   let tableauIntermediaire =[]; 
  
    //   parkingsTempsReel.forEach(parking => {
  
    //     tableauIntermediaire = [];
    //     tableauIntermediaire["id"] = parking["Parking_schema:identifier"];
    //     tableauIntermediaire["lat"] = FormatedTabParkingInfo[parking["Parking_schema:identifier"]]["lat"];
    //     tableauIntermediaire["lon"] =FormatedTabParkingInfo[parking["Parking_schema:identifier"]]["lon"];
    //     returnVal.push(tableauIntermediaire);
  
    //   });
  
    //   return returnVal;
    // }  
}
    
export default Card;