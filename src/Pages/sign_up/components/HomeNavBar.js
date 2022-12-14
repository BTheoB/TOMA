import React from "react";
import {Link} from "react-router-dom";
import 'bulma/css/bulma.min.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function NavBar(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  
    return(
        <div className="box has-background-primary-light">
            <div className="Nav has-background-primary-light">
                <nav class="navbar has-background-primary-light" role="navigation" aria-label="main navigation">
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a class="navbar-item">
                                <strong><Link to="/">Home</Link> </strong>
                            </a>
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