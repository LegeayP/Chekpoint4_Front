import React, { useEffect, useState } from "react";

import axios from "axios";

export default function ListDeBien() {
  const [getBien, setGetBien] = useState([]);
  const [chooseBien, setChooseBien] = useState("");
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/bien`,
      withCredentials: true,
    })
      .then(({ data }) => {
        setGetBien(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "bien: ");
      });
  }, []);

  const deleteBien = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/bien/${chooseBien}`,
    })
      .then(() => {
        alert("Bien supprimer!");
        chooseBien();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Supprimer un bien</h2>
      <p>Choissi ton bien</p>
      <select
        onBlur={(e) => setChooseBien(parseInt(e.target.value, 10))}
        onChange={(e) => setChooseBien(parseInt(e.target.value, 10))}
      >
        {getBien.map((bien) => (
          <option key={bien.id} value={bien.id}>
            {bien.name}
          </option>
        ))}
      </select>
      <div>
        {chooseBien}
        <button onClick={deleteBien}>x</button>
      </div>
    </div>
  );
}
