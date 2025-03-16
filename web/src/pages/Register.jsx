import React from "react";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  // FUNCIÓN PARA EL ENVÍO DEL FORMULARIO.
  const handleSubmit = async (e) => {
    e.preventDefault(); // EVITA LA RECARGA DE LA PÁGINA (REVISAR).
    try {
      // PETICIÓN POST PARA ENVIAR LA INFORMACIÓN DE USUARIO.
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Registro realizado con éxito");
    } catch (error) {
      alert("Error al registrarse, por favor, revise los campos");
    }
  };

  return (
    <div className="content">
      {" "}
      {/*PARA EL CONTENEDOR GENERAL (REVISAR EL INDEX.CSS) */}
      <div className="container-fluid mt-5">
        <h2 className="mb-4">Registro</h2>

        <p>
          &nbsp;&nbsp;&nbsp;Por favor, rellena todos los campos para registrarte
          en el sistema. Asegúrate de elegir un nombre de usuario, una
          contraseña segura y seleccionar el nivel de estudios y el rol
          adecuado.
        </p>

        <p>
          &nbsp;&nbsp;&nbsp;Estos últimos definen tus posibilidades en{" "}
          <strong>Agorum/La Orden de Clío</strong>. Si tienes conocimientos
          sólidos en las ciencias de Clío (Historia, Historia del Arte,
          Arqueología, etc.) puedes inscribirte como "Magister" y colaborar
          activamente en la página.
        </p>

        <p>&nbsp;&nbsp;&nbsp; EXPLICACIÓN Y BLA, BLA, BLA...¡TERMINAAAAAAAR!</p>

        {/* AL ACTIVAR EL ENVÍO LLAMAMOS AL HANDLESUBMIT */}
        {/* FORMULARIO DE REGISTRO (SEGURO QUE ME DEJO ALGO) */}
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
         <div className="card p-4 shadow-lg" style={{ width: '400px' }}> 
          <form
            onSubmit={handleSubmit}
            className="mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="mb-3">
              <b>
                <label htmlFor="username" className="form-label">
                  Nombre de usuario
                </label>
              </b>
              <input
                type="text"
                id="username" // ID PARA QUE SEA ÚNICO
                placeholder="Ignacio79..."
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="firstname" className="form-label">
                  Nombre de pila
                </label>
              </b>
              <input
                type="text"
                id="firstname"
                placeholder="Laura..."
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="lastname" className="form-label">
                  Apellido/os
                </label>
              </b>
              <input
                type="text"
                id="lastname"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </b>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
              </b>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="studies" className="form-label">
                  Nivel de Estudios:
                </label>
              </b>
              <select id="studies" name="studies" className="form-select">
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="licenciatura">Licenciatura</option>
                <option value="diplomatura">Diplomatura</option>
                <option value="grado">Grado</option>
                <option value="postgrado">Postgrado</option>
                <option value="doctorado">Doctorado</option>
                <option value="autodidacta">Autodidacta</option>
                <option value="prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
               Registrarse
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Register;
