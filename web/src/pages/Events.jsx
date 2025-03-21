import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Events() {
  const [eventsList, setEventsList] = useState([]);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/events")
      .then((res) => {
        console.log("Eventos recibidos:", res.data);
        setEventsList(res.data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="container my-2">
      <div
        className="card p-2 shadow-lg"
        style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}
      >
        <div className="card-body text-center">
          <h2>Eventos</h2>
          <p
            className="lead"
            style={{ fontStyle: "italic", marginBottom: "0" }}
          >
            Encuentra cursos, conferencias, exposiciones y actividades.
          </p>
          {isAuthenticated ? (
            <Link to="/createEvent" className="btn btn-primary mt-3">
              Crear Evento
            </Link>
          ) : (
            <p className="mt-3 text-muted">
              Debes iniciar sesión para crear un evento.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        {eventsList.length > 0 ? (
          eventsList.map((eventItem) => {
            const eventId = eventItem._id || eventItem.id;
            return (
              <div key={eventId} className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title">{eventItem.title}</h3>
                  <p className="card-text">{eventItem.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Fecha: {new Date(eventItem.date).toLocaleDateString()} |
                      Ubicación: {eventItem.location}
                    </small>
                  </p>
                  <Link to={`/events/${eventId}`} className="btn btn-secondary">
                    Leer más
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No hay eventos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
