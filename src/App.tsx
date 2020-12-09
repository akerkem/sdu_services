import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Copyright from "./Components/Copyright/Copyright";
import ContentPage from "./Components/Content/Content";

function App() {
  return (
    <div className="App">
      <Copyright />
      <ContentPage />
    </div>
  );
}

export default App;
