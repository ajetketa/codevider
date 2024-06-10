import './menu.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ANIMAL_MENU = [
  {
    header: "Feline Friends",
    message: "Cats are curious and independent creatures known for their playful antics and affectionate nature. They make great companions with their gentle purring and graceful movements.",
    image: "/menu-cat.png",
    type: "Cats"
  },
  {
    header: "Canine Companions",
    message: "Dogs are loyal and friendly animals, known for their strong bond with humans. They love to stay active, enjoy playtime, and offer unconditional love and companionship.",
    image: "/menu-dog.png",
    type: "Dogs"
  },
  {
    header: "Avian Wonders",
    message: "Birds are fascinating creatures with beautiful plumage and melodious songs. Their ability to fly and their diverse species make them a unique addition to any household.",
    image: "/menu-bird.png",
    type: "Birds"
  }
];


export default function Menu() {
  const navigate = useNavigate()
  let animalIndex = 0;
  let [selectedAnimal, setSelectedAnimal] = useState(ANIMAL_MENU[0]);

  useEffect(() => {
    document.querySelector("#menu-div").addEventListener("wheel", handleWheel, { passive: false });
    document.querySelector("#menu-div").addEventListener("touched", handleWheel, { passive: false });

    document.querySelector(".filled-shape:nth-child(1)").classList.add("active");
  }, [])

  function handleWheel(event) {
    let elementCompletelyVisible = elementIsVisibleInViewport(event.target);
    if (elementCompletelyVisible) {

      const delta = Math.sign(event.deltaY);
      if (delta > 0 && animalIndex < ANIMAL_MENU.length - 1) {
        event.preventDefault();

        document.querySelector(".filled-shape:nth-child(" + (animalIndex + 1) + ")").classList.remove("active");
        document.querySelector(".filled-shape:nth-child(" + (animalIndex + 2) + ")").classList.add("active");
        animalIndex++;
      } else if (delta < 0  && animalIndex > 0) {
        event.preventDefault();

        document.querySelector(".filled-shape:nth-child(" + (animalIndex + 1) + ")").classList.remove("active");
        document.querySelector(".filled-shape:nth-child(" + animalIndex + ")").classList.add("active");
        animalIndex--;
      }

      if (animalIndex >= 0 && animalIndex < ANIMAL_MENU.length) {
        setSelectedAnimal(ANIMAL_MENU[animalIndex]);
      }
    }
  }

  function handleAnimalSelection() {
    navigate("/gallery?type=" + selectedAnimal.type);
  }

  function elementIsVisibleInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };

  return (
    <section id="menu">
      <div id="menu-div">
        <div id="menu-header">
          {ANIMAL_MENU.map((menu) => {
            return <div class="filled-shape"></div>
          })}
        </div>

        <div id="menu-content">
          <div id="menu-row">
            <div id="content">
              <h1 id="header">{selectedAnimal.header}</h1>
              <div id="message">{selectedAnimal.message}</div>
            </div>
            <div id="image">
              <img src={selectedAnimal.image} alt="animal image" onClick={handleAnimalSelection}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}