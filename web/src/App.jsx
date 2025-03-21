import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails"; 
import News from "./pages/News";
import CreateNews from "./pages/CreateNews";
import Forum from "./pages/Forum";
import CreateForum from "./pages/CreateForum";
import ForumDetails from "./pages/ForumDetails";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css"; //TENGO QUE REVISAR TAILWIND PARA FUTURAS VERSIONES.

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/createNews" element={<CreateNews />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/CreateForum" element={<CreateForum />} />
          <Route path="/forum/:id" element={<ForumDetails />} />
          
         {/*<Route path="/resources" element={<Resources />} /> */} {/*PARA MÁS ADELANTE*/}

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
