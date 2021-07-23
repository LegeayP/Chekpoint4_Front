import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BienAchat.css"

export default function BienLocative() {
  const [locatives, setLocatives] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/bien/status/Location`,
    })
      .then(({ data }) => {
        console.log(data, "bien à louer");
        setLocatives(data);
        console.log(setLocatives);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Louer</h1>
      <div className="LocationBien">
        {locatives.map((location) => (
          <ul className="Block1bien" key={location.id}>
            <img
              className="imageAchat"
              src={`http://localhost:8000/images/${location.src}`}
              alt={location.name}
            />
            <div className="AchatName">
              <p>{location.name}</p>
              <p>{location.description}</p>
              <p>{location.prix}€</p>
              <p>{location.surface}m2</p>
              <p>{location.secteur}</p>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}
