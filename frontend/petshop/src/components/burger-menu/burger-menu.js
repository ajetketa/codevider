import { Link } from 'react-router-dom'

import './burger-menu.css';
import { useState, useRef } from 'react';

export default function BurgerMenu(props) {
  const [image, setImage] = useState("/burger-menu.svg");
  const active = useRef(false)

  function handleClick() {
    document.querySelector("#burger-menu-links").classList.toggle("active");
    active.current = !active.current
    if (active.current) {
      setImage("/x.svg")
    } else {
      setImage("/burger-menu.svg")
    }
  }

  return (
    <>
      <div id="burger-menu-button" style={props.style} onClick={handleClick}>
        <img src={image} alt="menu"/>
      </div>
      <div id="burger-menu-links">
        <ul>
          {props.links.map((link, index) => {
            return (
              <li key={index}>
                <Link class="burger-link" to={link.path}>{link.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}