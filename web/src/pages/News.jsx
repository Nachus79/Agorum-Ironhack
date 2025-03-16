import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function News() {
  const [newsList, setNewsList] = useState([]);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    //PARA CONSEGUIR LAS NOTIVIAS QUE YA SE HAN CREADO. 
    axios.get("http://localhost:3000/api/v1/news")
      .then((res) => {
        setNewsList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching news: ", err);
      });
  }, []);

  return (
    <div className="container my-2">
      <div className="card p-2 shadow-lg" style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
        <div className="card-body text-center">
          <h2>Noticias</h2>
          <p className="lead" style={{ fontStyle: "italic", marginBottom: "0" }}>
            Para estar a la última sobre el Pasado.
          </p>
          {isAuthenticated ? (
            <Link to="/create-news" className="btn btn-primary mt-3">
              Crear Noticia
            </Link>
          ) : (
            <p className="mt-3 text-muted">
              Debes iniciar sesión para crear una noticia.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        {newsList.length > 0 ? (
          newsList.map((newsItem) => (
            <div key={newsItem.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{newsItem.title}</h3>
                <p className="card-text">{newsItem.description}</p>
                <p className="card-text">
                  <small className="text-muted">Categoría: {newsItem.category}</small>
                </p>
                <a
                  href={newsItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Leer más
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay noticias disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default News;
