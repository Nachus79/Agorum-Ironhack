import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";  

const Home = () => {
  return (
    <div>
     
      <div>
        <h3>Bienvenido a Agorum, el espacio los amantes de las Humanidades y las Ciencias de Clío</h3>
        <p>Este es un espacio para profesionales, estudiantes y amantes de la Historia, Arqueología, Antropología y más...</p>
      </div>

   
      <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="path/to/image1.jpg" className="d-block w-100" alt="Evento 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Noticia/Eventos 1</h5>
              <p>Descripción breve de la noticia o evento destacado.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="path/to/image2.jpg" className="d-block w-100" alt="Evento 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Noticia/Eventos 2</h5>
              <p>Descripción breve de la noticia o evento destacado.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="path/to/image3.jpg" className="d-block w-100" alt="Evento 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Noticia/Eventos 3</h5>
              <p>Descripción breve de la noticia o evento destacado.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
};

export default Home;


  