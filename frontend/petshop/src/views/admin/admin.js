import './admin.css'
import { useEffect, useState } from 'react';
import { getDogs, getCats, getBirds } from '../../api_requests/animal-http-requests';
import { objectNameOrder as dogObjectNameOrder, objectNames2Labels as dogObjectNames2Labels, detailFields as dogDetailFields }  from '../../model/Dog';
import { objectNameOrder as catObjectNameOrder, objectNames2Labels as catObjectNames2Labels, detailFields as catDetailFields }  from '../../model/Cat';
import { objectNameOrder as birdObjectNameOrder, objectNames2Labels as birdObjectNames2Labels, detailFields as birdDetailFields }  from '../../model/Bird';
import BasicTable from "../../components/table/table";
import Collapse from "@mui/material/Collapse"
import List from "@mui/material/List"; 
import ListItemButton from "@mui/material/ListItemButton"; 
import ListItemText from "@mui/material/ListItemText"; 
import ExpandLess from "@mui/icons-material/ExpandLess"; 
import ExpandMore from "@mui/icons-material/ExpandMore"; 

const fieldNames = ["name", "calories", "fat", "carbs", "protein"]
const fieldNames2Labels = {
  "name": "Name",
  "calories": "Calories",
  "fat": "Fat",
  "carbs": "Carbs",
  "protein": "Protein"
}

const data = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  { name: "Jelly Bean", calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
  { name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
  { name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
  { name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0 }
];

export default function Admin() {
  const [openDogs, setOpenDogs] = useState(false); 
  const [openCats, setOpenCats] = useState(false); 
  const [openBirds, setOpenBirds] = useState(false); 
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [birds, setBirds] = useState([]);

  const handleClickDogSection = () => { 
      setOpenDogs(!openDogs);
  }; 

  const handleClickCatSection = () => {
    setOpenCats(!openCats);
  };

  const handleClickBirdSection = () => {
    setOpenBirds(!openBirds);
  };

  useEffect(() => {
    if (dogs.length === 0) {
      getDogs().then((res) => {
        if (res) setDogs(res);
      });
    }
    
    if (cats.length === 0) {
      getCats().then((res) => {
        if (res) setCats(res);
      });
    }

    if (birds.length === 0) {
      getBirds().then((res) => {
        if (res) setBirds(res);
      });
    }
  }, [])

  return (
    <div id="admin">
      <List sx={{ width: '100%', display:"flex", flexDirection:"column" }}>
        <ListItemButton onClick={handleClickDogSection} > 
          <ListItemText primary="Dogs" /> 
        {openDogs ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openDogs}>
          <BasicTable fieldNames={dogObjectNameOrder} data={dogs} fieldNames2Labels={dogObjectNames2Labels} detailFieldNames={dogDetailFields}/>
        </Collapse>
        <ListItemButton onClick={handleClickCatSection} > 
          <ListItemText primary="Cats" /> 
        {openCats ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCats}>
          <BasicTable fieldNames={catObjectNameOrder} data={cats} fieldNames2Labels={catObjectNames2Labels}  detailFieldNames={catDetailFields}/>
        </Collapse>
        <ListItemButton onClick={handleClickBirdSection} > 
          <ListItemText primary="Birds" /> 
        {openBirds ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openBirds}>
          <BasicTable fieldNames={birdObjectNameOrder} data={birds} fieldNames2Labels={birdObjectNames2Labels}  detailFieldNames={birdDetailFields}/>
        </Collapse>
      </List>
    </div>
  );
}
