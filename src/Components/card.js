import React, { Component } from "react";
import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CardContent from "../Components/CardContent";
import { render } from "@testing-library/react";


export class Card extends Component {




    render() {

        return (
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Info parking
                    </p>
                    <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>
                <div class="card-content">
                        <CardContent currentParking = {this.props.currentParking}/>
                </div>
            </div>

        )
    }

}


export default Card;