import emailjs from "emailjs-com";
import { useState } from "react";

export const ContactoComponent = () => {
  const [nombre, setNombre] = useState("");
  const [emial, setEmail] = useState("");
  const [mensaje, setMenjase] = useState("");

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVIVE,
        process.env.REACT_APP_EMAILJS_TEMPLATE,
        e.target,
        process.env.REACT_APP_EMAILJS_USER
      )
      .then(
        (result) => {
          console.log(result.text);
          setNombre("");
          setEmail("");
          setMenjase("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  const imputsChange = (event, inputName) => {
    let value = event.target.value;
    if (inputName === "nombre") {
      setNombre(value);
    } else if (inputName === "email") {
      setEmail(value);
    } else if (inputName === "mensaje") {
      setMenjase(value);
    }
  };

  const contacto = () => (
    <div id="contactanos">
      <h1>Ponente en contacato con nosotros</h1>

      <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>Nombre</label>
        <input
          type="text"
          name="user_name"
          value={nombre}
          onChange={(event) => imputsChange(event, "nombre")}
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={emial}
          onChange={(event) => imputsChange(event, "email")}
        />
        <label>Mensaje</label>
        <textarea
          name="message"
          value={mensaje}
          onChange={(event) => imputsChange(event, "mensaje")}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );

  return (
    <div>
      <h1>Hola soy el componente de contacto </h1>
      {contacto()}
    </div>
  );
};

export default ContactoComponent;
