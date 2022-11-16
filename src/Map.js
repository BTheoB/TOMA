import React, {Component} from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    
    render() {
        const style = {
            width: '100%',
            height: '100%'
          }
          const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '100%'
          }
      return (
        <Map google={this.props.google} 
         zoom={10}
         style={style}
         initialCenter={{
            lat: 45.7456185326184, 
            lng: 4.8964004986007215
          }}
         containerStyle={containerStyle}
         onClick={this.onMapClicked}
        >
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ("AIzaSyAlxyNI4iFH0A0NovgIm6XhqEDM5JFZkek")
  })(Map)