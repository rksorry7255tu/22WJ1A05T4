import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Contactus from "./pages/Contactus.jsx";
import Home from "./pages/Home.jsx";
import URLShortening from "./components/URLShortening.jsx";

const App = () => {
  return (
    <Router>
      <main style={{ padding: "10px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/services" element={<URLShortening />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
