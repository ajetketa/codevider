import "./table.css";
import BasicTableRow from "../table-row/table-row";
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable(props) {
  const [open, setOpen] = useState(false);  

  return (
    <TableContainer component={Paper} sx={{ marginBottom: "10px", maxHeight: "90vh"}}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>

          <TableRow sx={{ '& > *': { borderBottom: 'unset' }}}>
            <TableCell />
            {props.fieldNames.map((fieldName) => (
              <TableCell>{props.fieldNames2Labels[fieldName]}</TableCell>
            ))}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <BasicTableRow fieldNames={props.fieldNames} detailFieldNames={props.detailFieldNames} data={row} fieldNames2Labels={props.fieldNames2Labels} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}