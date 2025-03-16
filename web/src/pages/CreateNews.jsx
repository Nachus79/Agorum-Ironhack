import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //ACTUALIZACIÓN DEL ESTADO...(REVISAR):
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //ENVÍO DEL FORMULARIO: 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // REPASAR LO DEL TOKEN.
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/news",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Noticia creada exitosamente.");
      //LISTA (QUE NO TONTA) DE NOTICIAS:
      navigate("/news");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al crear la noticia"
      );
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Crear Noticia</h2>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
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
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
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
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Noticia</button>
      </form>
    </div>
  );
};

export default CreateNews;



