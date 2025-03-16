import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";  

const Home = () => {
  return (
    <div className="container my-4">
     <div className="card p-2 shadow-lg" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
     


        <div className="content text-center">
          <h3>Bienvenido a Agorum, el espacio de los amantes de las Humanidades y las Ciencias de Clío</h3>
    <br/> {/*¿CHAPUZA? (REVISAR) */}
    <br/>
          <p className="lead" style={{ marginBottom: "0", fontStyle: "italic" }}>
            Este sitio está diseñado para profesionales, estudiantes y cualquier persona interesada en la Historia, la Arqueología, la Antropología y otras disciplinas humanísticas. Aquí encontrarás información, recursos y un lugar para compartir conocimientos y experiencias. 
            <br/>
            <br/>
             Ya seas un académico, un periodista en busca de datos o simplemente un apasionado que quiere aprender más, Agorum es el espacio ideal para ti.
          </p>
        </div>
      </div>
      <div className="text-center">
        <img 
          src="/foro2.jpg" 
          alt="Reconstrucción de un foro romano" 
          className="img-fluid mt-4"
        />
      </div>
    </div>
  );
};

export default Home;



  