import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Forum() {
  const [posts, setPosts] = useState([]);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/forum")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="container my-2">
      <div
        className="card p-2 shadow-lg"
        style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}
      >
        <div className="card-body text-center">
          <h2>Foro</h2>
          <p className="lead" style={{ fontStyle: "italic", marginBottom: "0" }}>
            Comparte tus ideas y participa en debates.
          </p>
          <br/>
          <p>
            Por favor, recuerda las normas de participación del foro (pincha aquí)
          </p>
          {isAuthenticated ? (
            <Link to="/createForum" className="btn btn-primary mt-3">
              Crear Post
            </Link>
          ) : (
            <p className="mt-3 text-muted">
              Debes iniciar sesión para crear un post.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.content}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Por: {post.author ? post.author.userName : "Anónimo"} |{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </small>
                </p>
                <Link to={`/forum/${post._id}`} className="btn btn-secondary">
                  Leer más
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay posts en el foro.</p>
        )}
      </div>
    </div>
  );
}

export default Forum;

