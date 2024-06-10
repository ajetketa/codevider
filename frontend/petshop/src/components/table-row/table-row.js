import "./table-row.css";
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BasicTableRow(props) {
  const [open, setOpen] = useState(false);
  const { data, fieldNames } = props;

  return (
    <>
      <TableRow
        key={data.name}
        sx={{ '& > *': { borderBottom: 'unset' }}}
      >
        <TableCell sx={{ width: '20px' }} >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      {fieldNames.map((fieldName) => 
        <TableCell sx={{ maxWidth: '20px'}}>{Array.isArray(data[fieldName]) ? data[fieldName].join(', ') : data[fieldName]}</TableCell>
        )
      }
        <TableCell align="center" sx={{ maxWidth: '30px'}}>
          <div class="action-buttons">
            <Button variant="contained" sx={{ backgroundColor: 'green'}}>Edit</Button>
            <Button variant="contained" sx={{ backgroundColor: 'red'}}>Delete</Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow sx={{ paddingTop: 0, paddingBottom: 0 }}>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0, overflowY: "hidden" }} colSpan={fieldNames.length + 2}>
          <Collapse in={open} unmountOnExit>
            <Box sx = {{ margin: 2, height: '250px', display: "grid", gridTemplateColumns: "1fr 1.5fr" }}>
              <div id="image" style={{ display: "flex", justifyContent: "center"}}>
                <img src={data.image} style= {{ width: "80%", height: "250px", objectFit: "cover" }}></img>
              </div>
              <div id="details" style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                {props.detailFieldNames.map((fieldName) => <p><b>{props.fieldNames2Labels[fieldName]}</b>: {data[fieldName]}</p>)}
              </div>
            </Box>
          </Collapse>
        </TableCell> 
      </TableRow>
    </>
  )
}