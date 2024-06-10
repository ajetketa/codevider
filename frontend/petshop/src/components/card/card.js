import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './card.css'

export default function Card(props) {
  const { animal } = props;
  const uniqueKey = `${animal.constructor.name}-${animal.id}`;

  function handleCardClick(event) {
    props.handleCardClick(event.currentTarget.dataset.class, event.currentTarget.dataset.id)
  }

  return (
    <div key={uniqueKey} data-class={animal.constructor.name} data-id={animal.id} id="card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={props.animal.image} alt="pet" />
      </div>
      <div className="card-content">
        <h3>{props.animal.name}</h3>
        <p>{props.animal.origin}</p>
      </div>
    </div>
  );
}