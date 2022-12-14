import React, { Component } from "react";
import 'bulma/css/bulma.min.css';
import { render } from "@testing-library/react";



export class BarDeRecherche extends Component {

    render() {

        const handleChange = (event) => {
            event.preventDefault();
            //Recherche si le nom ou l'ID est correcte 

            var research = document.getElementById("zone_recherche").value;
            if (research.length > 6 && localStorage.getItem('resulatParkingsRealTime') != null) {
                let parkings = JSON.parse(localStorage.getItem('resulatParkingsRealTime'));
                var i = 0;
                while (i < parkings.length-1 && (parkings[i]["Parking_schema:name"] !== research && parkings[i]["Parking_schema:identifier"] !== research)) {
                    i++;
                }
                
                if( i === parkings.length-1 && (parkings[i]["Parking_schema:name"] !== research && parkings[i]["Parking_schema:identifier"] !== research)){
                    //On à pas trouver de parking donc nous ne faisons rien
                    document.getElementById("zone_recherche").classList.add("is-danger");
                    
                }else{
                    document.getElementById("zone_recherche").classList.remove("is-danger");
                    this.props.changeParking(parkings[i]["Parking_schema:identifier"]);
                }
                
            }


        }


        return (
            <div class="box">
                <div className="columns is-mobile">
                    <div className="column">
                        <input class="input is-normal" id="zone_recherche" type="text" placeholder="Quel parking cherchez-vous ?" list="parking-list" />
                    </div>
                    <div className="column">
                        <button class="button is-primary" id="btn-lancer-recherche" type="button" onClick={handleChange} >
                            Recherche
                        </button>
                        <datalist id="parking-list">
                            {   initList().map(parking => (
                                <option id={parking}>{parking}</option>
                                ))}
                        </datalist>
                    </div>
                </div>
            </div>
        );
    }

}


function initList() {

    let returnVal = [];

    if (localStorage.getItem('resulatParkingsRealTime') != null) {

        let parkingsTempsReel = JSON.parse(localStorage.getItem('resulatParkingsRealTime'));
        
        parkingsTempsReel.forEach(parking => {
              
          returnVal.push(parking["Parking_schema:identifier"]);
          returnVal.push(parking["Parking_schema:name"]);
    
        });
        
        
      }
      return returnVal;
}