import React from "react";

//ESTILO GENERAL DEL FOOTER
const footerStyle = {
  backgroundColor: "#000", //NEGRO, SE PUEDE REVISAR PERO PARECE QUE OFRECE BUEN CONTRASTE
  color: "#fff",
  textAlign: "center",
  padding: "1rem",
  width: "100%",
};

/*ESTILOS PARA QUE LOS BOTONES DE ABAJO ("POLÍTICA DE PRIVACIDAD"...)*/
const textStyle = {
  textDecoration: "none",
  color: "white",
  margin: 0,
  fontFamily: "Roboto",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
      <button type="button" className="btn btn-link" style={textStyle}>
          Acerca de nosotros
        </button>
        <button type="button" className="btn btn-link" style={textStyle}>
          Política de privacidad
        </button>
        <button type="button" className="btn btn-link" style={textStyle}>
          Protección de datos y política de cookies
        </button>
        <button type="button" className="btn btn-link" style={textStyle}>
          Aviso legal
        </button>
        <button type="button" className="btn btn-link" style={textStyle}>
          Contacto
        </button>
      </div>
      <div>
        <p style={textStyle}>
          © Iñaki Monzón 2025. Práctica Final del Bootcamp Web Development Full
          Stack de Iron Hack.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

