import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import DropdownFilter from "../../components/dropdown-filter/dropdown-filter";
import SearchFilter from '../../components/search-filter/search-filter';
import Card from "../../components/card/card";
import Modal from "../../components/modal/modal";
import { Dog, objectNames2Labels as dogObjectNames2Labels, cardDetailFields as dogCardDetailFields } from "../../model/Dog" 
import { Cat, objectNames2Labels as catObjectNames2Labels, cardDetailFields as catCardDetailFields } from "../../model/Cat"
import { Bird, objectNames2Labels as birdObjectNames2Labels, cardDetailFields as birdCardDetailFields } from "../../model/Bird"
import { getBirds, getCats, getDogs } from '../../api_requests/animal-http-requests';
import './gallery.css'

const FILTER_VALUES = {
  selected: 'All',
  options: ['All', 'Dogs', 'Cats', 'Birds']
}

export default function Gallery() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [objectFieldNames2Labels, setObjectFieldNames2Labels] = useState({});
  const [detailedFields, setDetailedFields] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValues, setFilterValues] = useState(FILTER_VALUES);
  const [search, setSearch] = useState('');
  const [animals, setAnimals] = useState([]);
  const dogs = useRef([]);
  const cats = useRef([]);
  const birds = useRef([]);

  useEffect(() => {
    let type = "All";
    let search = "";
    if (filterValues.options.includes(searchParams.get('type'))) type = searchParams.get('type');
    if (searchParams.get('search')) search = searchParams.get('search');
    
    handleModification(type, search);
  }, [])

  useEffect(() => {
    if (loading && !initialLoad) {
      setInitialLoad(true);
    }
  }, [loading]);

  function handleSelection(selection) {
    handleModification(selection, search)
  }

  function handleSearch(search) {
    handleModification(filterValues.selected, search)
  }
   
  async function handleModification(selected, search) {
    let animalList = []
    setLoading(true)

    if (selected === 'Dogs' || selected === 'All') {
      if (dogs.current.length === 0) {
        let dogList = await getDogs();
        console.log(dogList)
        dogs.current = dogList.map((dogPayload) => new Dog(dogPayload)); 
      }
      animalList = [...animalList, ...dogs.current];
    }
    if (selected === 'Cats' || selected === 'All') {
      if (cats.current.length === 0) {
        let catList = await getCats();
        cats.current = catList.map((catPayload) => new Cat(catPayload)); 
      }
      animalList = [...animalList, ...cats.current];
    }
    if (selected === 'Birds' || selected === 'All') {
      if (birds.current.length === 0) {
        let birdList = await getBirds();
        birds.current = birdList.map((birdPayload) => new Bird(birdPayload)); 
      }
      animalList = [...animalList, ...birds.current];
    }

    animalList = animalList.filter((animal) => animal.name.toLowerCase().includes(search?.toLowerCase() || ''))
    
    setFilterValues({
      ...filterValues,
      selected: selected
    })
    setSearch(search)
    
    setAnimals(animalList)
    setLoading(false)
  }

  function handleCardClick(animalClass, animalId) {
    const foundAnimal = animals.find((animal) => animal.id === animalId && animal.constructor.name === animalClass);
    if (animalClass === 'Dog') {
      setObjectFieldNames2Labels(dogObjectNames2Labels);
      setDetailedFields(dogCardDetailFields);
    } else if (animalClass === 'Cat') {
      setObjectFieldNames2Labels(catObjectNames2Labels);
      setDetailedFields(catCardDetailFields);
    } else if (animalClass === 'Bird') {
      setObjectFieldNames2Labels(birdObjectNames2Labels);
      setDetailedFields(birdCardDetailFields);
    } 

    setSelectedAnimal(foundAnimal);
    setShowModal(true);
  }

  return (
    <div>
      <div id="gallery-filters">
        <DropdownFilter handleSelection={handleSelection} values={filterValues} />
        <SearchFilter handleSearch={handleSearch} placeholder="Search by race..." />
      </div>
      {(!initialLoad || loading) && (
        <div id="gallery-loading">
          <img src="/loading.gif" alt="loading" />
          <p>Loading your animals, please wait...</p>
        </div>
      )}
      {!loading  && initialLoad && animals.length === 0 && (
        <div id="gallery-no-results">
          <img src="/no-data-found.jpg" alt="no results" />
        </div>
      )}
      {!loading && animals.length > 0 && (
        <div id="gallery-cards">
          <div id="gallery-card-items">
            {animals.map((animal) => (
              <Card animal={animal} handleCardClick={handleCardClick} />
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          animal={selectedAnimal}
          objectFieldNames2Labels={objectFieldNames2Labels}
          selectedDetailFields={detailedFields}
          handleCloseModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
