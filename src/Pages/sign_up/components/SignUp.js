import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import NavBar from "./HomeNavBar";
import axios from "axios";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/ConnectedHome");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
      <section className="hero is-fullheight is-fullwidth">
        <NavBar />
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={saveUser} className="box">
                <p className="has-text-centered">{msg}</p>
                  <h1 className="title is-2">Sign Up</h1>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                          <input
                            type="password"
                            className="input"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            placeholder="******"
                          />
                        </div>
                      </div>
                      <div className="field mt-5">
                      </div>
                      <div className="field">
                        <label className="label">Role</label>
                        <div className="control">
                          <div className="select is-fullwidth">
                            <select
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="control">
                          <button type="submit" className="button is-success">
                            Save
                          </button>
                        </div>
                 </form>
              </div>
            </div>
          </div>
        </div>
      </section> 
  );
};

export default SignUp;
