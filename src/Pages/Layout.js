import React from "react";
import ConnectedNavBar from "../Components/ConnectedNavBar";


const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <ConnectedNavBar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
