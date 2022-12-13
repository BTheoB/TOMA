import React from "react";
import {Link} from "react-router-dom";
import 'bulma/css/bulma.min.css';
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../Pages/sign_in/features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";



function ConnectedNavBar(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
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
                                <strong><Link to="/ConnectedHome">Home</Link> </strong>
                            </a>
                        </div>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-end">
                                <h2 className="subtitle">
                                 Welcome !<strong>{user && user.name}</strong>
                                </h2>
                            <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={logout} className="button is-light">
                                Log out
                                </button>
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

export default ConnectedNavBar;