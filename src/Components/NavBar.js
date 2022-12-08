import React from "react";
import {Link} from "react-router-dom";


function NavBar(){
    return(
        <div className="App">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <img 
                            src="..\TOMA.png" width="112" height="28"> 
                        </img>
                    </a>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
            
                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item">
                            <Link to="/">Home</Link>
                        </a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-primary">
                                    <strong><Link to="/Connection">Sign up</Link></strong>
                                </a>
                                <a class="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>





        // <ul>
        //     <li><Link to="/">Home</Link></li>
        //     <li><Link to="/Connection">Connection</Link></li>
        // </ul> 
    );
}

export default NavBar;