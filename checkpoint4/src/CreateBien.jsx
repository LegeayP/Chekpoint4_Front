import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateBien.css";
import ListDeBien from "./DeleteBien";

export default function CreateBiens() {
  const [choosedBien, setChoosedBien] = useState([]);
  const [biens, setBiens] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/bien`,
      withCredentials: true,
    })
      .then(({ data }) => {
        setBiens(data);
      })
      .catch((err) => {
        console.log(err, "bien: ");
      });
  }, []);
  const [bien, setBien] = useState("");
  const [fileSelected, setFileSelected] = useState("");
  const [file, setFile] = useState("");
  const [bienImage, setBienImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [surface, setSurface] = useState("");
  const [secteur, setSecteur] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const onSubmitBien = async (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:8000/api/bien",
      data: {
        name,
        description,
        prix,
        surface,
        type,
        secteur,
        status,
      },
    })
      .then((response) => {
        console.log(response.data);

        setBien(response.data.id);
        alert("Bien créé avec succés!");
      })

      .catch((err) => {
        alert(err.response);
      });
  };

  const onChangeFile = (event) => {
    const { type } = event.target.files[0];
    if (type !== "image/png" && type !== "image/jpeg") {
      alert("Veuillez sellectioner une image .jpeg, .jpg ou png");
    } else {
      setFileSelected(event.target.files[0]);
    }
  };
  const onSubmitFile = async (event) => {
    event.preventDefault();
    if (fileSelected) {
      const bienSelected = biens.find((item) => item.id === choosedBien);
      console.log(bienSelected);
      const data = new FormData();
      data.append("file", fileSelected);
      data.append(
        "configuration",
        JSON.stringify({ alt: bienSelected.name, bien_id: bienSelected.id })
      );
      console.log(choosedBien, "fileselected");
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/images",
        data,
      })
        .then((data) => {
          setBienImage({
            filename: data.data.src,
            bien_id: choosedBien,
          });
        })
        .catch((err) => {
          alert(err.response);
        });
    }
  };

  const PlusImage = () => {
    return <input type="file" accept="image/*" onChange={onChangeFile}></input>;
  };
  return (
    <div className="CreateBien">
      <p>Création d&#039;un bien</p>
      <form onSubmit={onSubmitBien} className="CreationBien">
        <label htmlFor="Nom du bien">
          Nom du bien
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>

        <label htmlFor="Description">
          Description
          <input
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </label>
        <label htmlFor="prix">
          Prix
          <input
            type="text"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          ></input>
        </label>
        <label htmlFor="surface">
          Surface
          <input
            value={surface}
            type="text"
            onChange={(e) => setSurface(e.target.value)}
          ></input>
        </label>
        <label htmlFor="secteur">
          Secteur
          <input
            value={secteur}
            type="text"
            onChange={(e) => setSecteur(e.target.value)}
          ></input>
        </label>
        <label htmlFor="type">
          Type du bien
          <input
            value={type}
            type="text"
            onChange={(e) => setType(e.target.value)}
          ></input>
        </label>
        <label htmlFor="type">
          Achat ou Location
          <input
            value={status}
            type="text"
            onChange={(e) => setStatus(e.target.value)}
          ></input>
        </label>

        <button type="submit">Confirmer</button>
        {onSubmitBien && <p>{bien}</p>}
      </form>
      <select
        onBlur={(e) => setChoosedBien(parseInt(e.target.value, 10))}
        onChange={(e) => setChoosedBien(parseInt(e.target.value, 10))}
      >
        {biens.map((bien) => (
          <option key={bien.id} value={bien.id}>
            {bien.name}
          </option>
        ))}
      </select>
      <div>{choosedBien}</div>
      <p>Associé une ou plusieur image au bien</p>
      <form onSubmit={onSubmitFile} className="CreationBien">
        <label htmlFor="file">
          Choisie une image
          <input type="file" accept="image/*" onChange={onChangeFile}></input>
        </label>
        <button onClick={PlusImage}> + </button>
        <button type="submit">Confirmer</button>
      </form>
      <ListDeBien />
    </div>
  );
}
