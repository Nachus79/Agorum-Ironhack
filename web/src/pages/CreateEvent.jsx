import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    link: "",
    isOnline: false, 
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/events",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Evento creado exitosamente.");
      navigate("/events");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al crear el evento"
      );
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Crear Evento</h2>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description || ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            placeholder="Madrid...Valencia...Online"
            value={formData.location || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">Enlace</label>
          <input
            type="url"
            id="link"
            name="link"
            className="form-control"
            placeholder="http://www.ejemplo.com"
            value={formData.link || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">¿El evento es online?</label>
          <div>
            <label className="me-3">
              <input
                type="radio"
                name="isOnline"
                value="true"
                checked={formData.isOnline === true}
                onChange={handleChange}
              />{" "}
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="isOnline"
                value="false"
                checked={formData.isOnline === false}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;

