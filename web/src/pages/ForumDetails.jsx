import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ForumDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPost = () => {
    axios
      .get(`http://localhost:3000/api/v1/forum/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post details:", err);
        setError("Error al obtener los detalles del post");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3000/api/v1/forum/${id}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setNewComment("");
     
        setPost(res.data);
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
        setError("Error al agregar comentario");
      });
  };

  if (loading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!post) return <p className="text-center">Post no encontrado</p>;

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.content}</p>
          <p className="card-text">
            <small className="text-muted">
              Por: {post.author ? post.author.userName : "Anónimo"} |{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </p>
          
          <div className="mt-4">
            <h4>Comentarios</h4>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="border p-2 mb-2">
                  <p className="mb-0">{comment.text}</p>
                  <small className="text-muted">
                    {comment.author ? comment.author.userName : "Anónimo"} -{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No hay comentarios.</p>
            )}
          </div>
          {/* AGREGAR UN COMENTARIO: */}
          {localStorage.getItem("token") && (
            <div className="mt-4">
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <label htmlFor="newComment" className="form-label">
                    Agregar comentario:
                  </label>
                  <textarea
                    id="newComment"
                    className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar comentario
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;
