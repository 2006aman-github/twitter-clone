import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import SideBar from "./Components/SideBar";
import Home from "./Components/Home";
import Widget from "./Components/Widget";

function App() {
  return (
    <div className="App">
      {/* Sidebar Component -> LEFT  */}
      <SideBar />
      {/* Home Component-> MIDDLE  */}
      <Home />
      {/* Current Status Component -> RIGHT  */}
      <Widget />
    </div>
  );
}

export default App;
