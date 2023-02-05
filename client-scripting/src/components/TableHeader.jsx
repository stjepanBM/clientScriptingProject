import React from 'react';
import { visuallyHidden } from '@mui/utils';  
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Box } from "@mui/system";

const TableHeader = (props) => {

    const headCells = [
        {
          id: 'Name',
          numeric: false,
          disablePadding: true,
          label: 'Name',
        },
        {
          id: 'Surname',
          numeric: false,
          disablePadding: false,
          label: 'Surname',
        },
        {
          id: 'Email',
          numeric: false,
          disablePadding: false,
          label: 'Email',
        },
        {
          id: 'Telephone',
          numeric: false,
          disablePadding:false,
          label: "Telephone"
        },
        {
          id: 'City',
          numeric: false,
          disablePadding: false,
          label: 'City',
        },
        {
          id: 'State',
          numeric: false,
          disablePadding: false,
          label: 'State',
        },
        {
          id: 'actions',
          numeric: false,
          disablePadding: false,
          label: 'Actions',
        },
      ];

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;