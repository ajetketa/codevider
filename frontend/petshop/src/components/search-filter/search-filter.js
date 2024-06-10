import './search-filter.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function SearchFilter(props) {
  const [timeOutId, setTimeOutId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(event) {
    let changedSearch = event.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (changedSearch === '') {
      params.delete('search');
    } else {
      params.set('search', changedSearch);
    }
    setSearchParams(params);
    
    if (timeOutId !== null) clearTimeout(timeOutId)

    setTimeOutId(setTimeout(() => {
      props.handleSearch(changedSearch)
    }, 500))
  }

  return (
    <div id="search-filter-container">
      <input id="search-filter" type="text" onChange={handleSearch} value={searchParams.get('search')} placeholder={props.placeholder}>
      </input>
    </div>
  );
}