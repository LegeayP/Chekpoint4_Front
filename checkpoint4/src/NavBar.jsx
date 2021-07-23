import React from "react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="NavBar">
      <ul className="ulNav">
        <li>
          <a href="/Accueil">Accueil</a>
        </li>
        <li>
          <a href="/BienAchat">Achat</a>
        </li>
        <li>
          <a href="/BienLocative">Location</a>
        </li>
        <li>
          <a href="Contact">Contact</a>
        </li>
       
      </ul>
    </div>
  );
}
