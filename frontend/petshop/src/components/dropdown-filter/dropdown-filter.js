import './dropdown-filter.css'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function DropdownFilter(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(props.values)
  const [searchParams, setSearchParams] = useSearchParams();
  const optionsRef = useRef(null);
  const contentRef = useRef(null);
  const selectedRef = useRef(null);
  const filterRef = useRef(null);
  console.log(props)

  function handleFilterClick(event) {
    event.stopPropagation();

    setIsOpen(!isOpen);
  };

  function handleFilterClose(event) {
    event.stopPropagation();

    if (event.target === filterRef.current) return;
    if (Array.from(filterRef.current ? filterRef.current.getElementsByTagName('*') : []).includes(event.target)) return;
    if (event.target === contentRef.current) return;
    if (Array.from(contentRef.current ? contentRef.current.getElementsByTagName('*') : []).includes(event.target)) return;
    
    setIsOpen(false);
  }

  function handleSelection(e) {
    selectedRef.current.textContent = e.target.textContent
    const params = new URLSearchParams(searchParams);
    
    params.set('type', e.target.textContent);
    setSearchParams(params);

    setValues({selected: e.target.textContent, options: values.options})
    props.handleSelection(e.target.textContent)
  };

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight + 2;
      optionsRef.current.style.maxHeight = `${contentHeight}px`;
    } else {
      optionsRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("click", handleFilterClose);

    return () => window.removeEventListener("click", handleFilterClose)
  }, [])

  useEffect(() => {
    setValues(props.values)
  }, [props.values])

  return (
    <div id="dropdown-filter-container">
      <div ref={filterRef} id="filter" onClick={handleFilterClick}>
        <div ref={selectedRef} id="filter-content">
          {values.selected}
        </div>
        <div id="filter-icon">
          <img src="/triangle.svg" alt="filter" />
        </div>
      </div>
      <div ref={optionsRef} id="filter-options">
        <ul ref={contentRef} onClick={handleSelection}>
          {values.options.map((value, index) => (
            <li key={index}>
              {values.selected === value && 
                <div id="filled-checkmark">
                  <img src="/checkmark.svg" alt="checkmark" id="options-checkmark" />
                </div>
              }
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}