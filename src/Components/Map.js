import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    
    render() {
        const style = {
            position: 'centre',
            width: '100%',
            height: '75%'
          }
      return (
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
          <Marker position = {{lat:45.768522, lng:4.83773}} />
          <Marker position = {{lat:45.768241, lng:4.836341}} />
          <Marker position = {{lat:45.7696325, lng:4.8339403}} />
          <Marker position = {{lat:45.7696325, lng:4.8339403}} />
          <Marker position = {{lat:45.770857, lng:4.832605}} />
          <Marker position = {{lat:45.770791, lng:4.8326}} />
          <Marker position = {{lat:45.767543, lng:4.832217}} />
          <Marker position = {{lat:45.767193, lng:4.833933}} />
          <Marker position = {{lat:45.75653, lng:4.83587}} />
          <Marker position = {{lat:45.756292, lng:4.834068}} />
          {/* <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow> */}
        </Map>
      );
    }
}


  export default GoogleApiWrapper({
    apiKey: ("AIzaSyAlxyNI4iFH0A0NovgIm6XhqEDM5JFZkek")
  })(MapContainer)