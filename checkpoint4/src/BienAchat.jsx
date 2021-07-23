import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BienAchat.css";

export default function BienAchat() {
  const [achats, setAchats] = useState([]);
  useEffect(() => {
    axios({ method: "GET", url: `http://localhost:8000/api/bien/status/Achat` })
      .then(({ data }) => {
        console.log(data, "bien à acheter");
        setAchats(data);
        console.log(setAchats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="containerAchat">
      <h1>Acheter</h1>
      <div className="AchatBien">
        {achats.map((achat) => (
          <ul className="Block1bien" key={achat.id}>
            <img
              className="imageAchat"
              src={`http://localhost:8000/images/${achat.src}`}
              alt={achat.name}
            />
            <div className="AchatName">
              <p>{achat.name}</p>
              <p>{achat.description}</p>
              <p>{achat.prix}€</p>
              <p>{achat.surface}m2</p>
              <p>{achat.secteur}</p>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}
