import { useEffect } from "react";
import "./modal.css"

export default function Modal(props) {

  function handleCloseModal(event) {
    if (event.target === event.currentTarget) props.handleCloseModal();
  }

  return (
    <div id="modal-container" onClick={handleCloseModal}>
      <div id="modal">
        <div id="modal-content">
          <div id="modal-image">
            <img src={props.animal.image} alt="cat"></img>
          </div>
          <div id="modal-text">
            <h3>{props.animal.name} - {props.animal.origin}</h3>
            <p>{props.animal.description}</p>
            <div id="modal-content-grid">
              {props.selectedDetailFields.map((detailField) => {
                if (props.animal[detailField] !== undefined && props.animal[detailField] !== null) {
                  return <div><b>{props.objectFieldNames2Labels[detailField]}:</b> <span>{Array.isArray(props.animal[detailField]) ? props.animal[detailField].join(", ") : props.animal[detailField]}</span></div>
                }
              })}
            </div>          
          </div>
        </div>
      </div>
    </div>
  );
}