import React, { Component } from "react";
import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import { useEffect } from 'react';



//fonction qui rend les information d'un parking selon son Identifiant 

function parkingInfo(id) {

    if (localStorage.getItem('resulatParkingsRealTime') != null && localStorage.getItem('FormatedTabParkingInfo') != null) {

        return JSON.parse(localStorage.getItem('FormatedTabParkingInfo'))[id];
    }
}

function CardContent({ currentParking }) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch("https://download.data.grandlyon.com/files/rdata/lpa_mobilite.donnees/parking_temps_reel.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);

                    //Ici on viens faire la requête à l'api et on recupère les informations de places en temps réel du bon parking
                    var i = 0;
                    while (i < result.length && result[i]["Parking_schema:identifier"] != currentParking) {
                        i++;
                    }
                    setItem(result[i]);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [currentParking]);

    if (error) {
        return error.message
    } else if (!isLoaded) {
        return "Chargement..."
    } else {

        //Affichage des information du parking selectionné

        //Choses a afficher : 
        //L'adresse
        //Capacité total
        //Nom
        //Photo
        var infoP = parkingInfo(currentParking);

        return <div class="content">

            <h1>{infoP["name"]}</h1>

            <h3>
                {"Places : " + item["mv:currentValue"]}
            </h3>

            <h3>
                {"Adresse : " + infoP["address"]["schema:streetAddress"] + ", " + infoP["address"]["schema:postalCode"]}
            </h3>

            <img src={infoP["photograph"]["schema:url"]}></img>
        </div>

    }






}

export default CardContent;
