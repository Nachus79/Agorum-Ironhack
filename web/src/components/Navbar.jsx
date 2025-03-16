import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid flex-column">

        <h1 className="navbar-brand text-center w-100">Agorum</h1>

        <div className="d-flex justify-content-between w-100">
          <ul className="navbar-nav d-flex">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/news">Noticias</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/events">Eventos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/forum">Foro</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/resources">Recursos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Perfil de usuario</Link></li>     
          </ul>

          <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Registrarse</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


        

