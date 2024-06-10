import { Outlet, Link } from "react-router-dom";
import './layout.css';
import BurgerMenu from '../../components/burger-menu/burger-menu';

const burgerMenuStyle = {
    margin: "0.7rem",
    padding: "0.1rem",
    border: "2px solid black",
    borderRadius: "10px",
    cursor: "pointer"
}

const links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Gallery",
    path: "/gallery"
  },
  {
    name: "Admin",
    path: "/admin"
  }
]

export default function Layout() {
  return (
    <div>
      <nav>
        <div id="logo">
          <img id="logo-img" src="/pawprint.png" alt="logo"/>
          <h1 id="logo-text">Paws & Whiskers</h1>
        </div>
        <div id="burger-menu">
          <BurgerMenu style={burgerMenuStyle} links={links}/>
        </div>
        <div id="content-menu">
          <ul>
            <li>
              <Link class="link" to="/">Home</Link>
            </li>
            <li>
              <Link class="link" to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link class="link" to="/admin">Admin</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}