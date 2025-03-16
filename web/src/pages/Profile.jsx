import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    studies: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/v1/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch("http://localhost:3000/api/v1/users/me", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessage("Perfil actualizado correctamente");
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setMessage("Error al actualizar el perfil");
      });
  };

  return (
    <div className="container my-4">
      <div
        className="card p-2 shadow-lg mx-auto"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body text-center">
          <h2 className="text-center">Perfil de Usuario</h2>
          <p>Desde aquí puedes modificar tus datos.</p>
        </div>
      </div>

      {message && <p className="text-center">{message}</p>}
      
      {/* REVISAR EL EFECTO VISUAL, NO ME CONVENCE */}
      <div className="col-md-4 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              value={userData.userName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={userData.firstName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={userData.lastName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={userData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studies" className="form-label">
              Nivel de Estudios
            </label>
            <select
              id="studies"
              name="studies"
              className="form-select"
              value={userData.studies || ""}
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
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
          <button type="submit" className="btn btn-primary w-50">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

