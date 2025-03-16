/*
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function News() {
  return (
    <div className="container my-2">
      <div className="card p-2 shadow-lg" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <div className="card-body text-center">
          <h2>Noticias</h2>
          <p className="lead" style={{ fontStyle: "italic", marginBottom: "0" }}>
            Para estar a la última sobre el Pasado.
          </p>
        </div>
      </div>
    </div>
  );
}

export default News;
*/

import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function News() {
  // Verificamos si el usuario está autenticado (esto es un ejemplo sencillo)
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="container my-2">
      <div className="card p-2 shadow-lg" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
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
            <p className="mt-3 text-muted">Debes iniciar sesión para crear una noticia.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
