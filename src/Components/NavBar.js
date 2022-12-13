import React from "react";
import {Link} from "react-router-dom";
import 'bulma/css/bulma.min.css';
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../Pages/sign_in/features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../Pages/Home";




function NavBar(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  
    return(
        <div className="box has-background-primary-light">
            <div className="Nav has-background-primary-light">
                <nav class="navbar has-background-primary-light" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a class="navbar-item">
                            {/* <figure class="image is-128x128">
                                <img src="https://bulma.io/images/placeholders/128x128.png"> </img>
                            </figure>  */}
                            
                        </a>
                    </div>
                
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a class="navbar-item">
                                <strong><Link to="/">Home</Link> </strong>
                            </a>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                <a class="button is-primary">
                                        <strong><Link to="/SignUp">Sign up</Link></strong>
                                    </a>
                                    <a class="button is-primary">
                                        <strong><Link to="/Connection">Log in</Link></strong>
                                    </a>
                                    {/* <a class="button is-light">
                                        Log in
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>





        // <ul>
        //     <li><Link to="/">Home</Link></li>
        //     <li><Link to="/Connection">Connection</Link></li>
        // </ul> 
    );
}

export default NavBar;