import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname && lastname && email && message && phone) {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
      setMessage("");
      axios({
        method: "POST",
        url: "http://localhost:8000/api/send-email",
        data: { firstname, lastname, email, message, phone },
      })
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return alert("Veuillez remplir tous les champs");
  };

  // function addClass() {
  //   document.body.classList.add("sent");
  // }

  // sendLetter.addEventListener("click", addClass);

  return (
    <div>
      <div class="wrapper centered">
        <form className="Contact" onSubmit={handleSubmit}>
          <h1 className="h1Contact">Contacter moi</h1>
          <div className="inputContact">
            <div className="question">
              <input
                className="prenom-contact"
                type="text"
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="question">
              <input
                className="nom-contact"
                type="text"
                placeholder="Nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="question">
              <input
                className="email-contact"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="question">
              <input
                className="tel-contact"
                type="tel"
                placeholder="Telephone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="question">
              <textarea
                className="text-area-contact"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <input className="buttonContact" type="submit" value="Envoyer" />
            </div>
            <p>Tel: 02 XX XX XX XX</p>
          </div>
        </form>
        <br />
      </div>
      <div class="envelope front"></div>
      <div class="envelope back"></div>
    </div>
  );
}
