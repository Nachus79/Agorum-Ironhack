import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
        setError("Error al obtener detalles del evento");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!event) return <p className="text-center">Evento no encontrado</p>;

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title">{event.title}</h2>
          <p className="card-text">{event.description}</p>
          <p className="card-text">
            <small className="text-muted">
              Fecha: {new Date(event.date).toLocaleDateString()} | Ubicación: {event.location}
            </small>
          </p>
          <p className="card-text">
            <strong>{event.isOnline ? "Evento Online" : "Evento Presencial"}</strong>
          </p>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Ir al enlace del evento
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

