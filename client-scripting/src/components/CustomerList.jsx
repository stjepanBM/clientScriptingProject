// import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { 
  Checkbox, Table,
  Box, Paper,
  TableBody, TableCell,
  TableContainer, TableRow,
  Typography, 
  TablePagination,
  Button,
  FormControlLabel,
  Switch
} from "@mui/material";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setCities, setCustomers, setStates } from "state";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";

const CustomerList = () => {

    TableHeader.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    TableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    const customers = useSelector((state) => state.customers);
    const token = useSelector((state) => state.token);
    const cities = useSelector((state) => state.cities);
    const states = useSelector((state) => state.states);
    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const main = theme.palette.primary.main;


    const getCustomers = async () => {
      const getCustomersResponse = await fetch(
          "http://www.fulek.com/nks/api/aw/last200customers"
      );
      const customers = await getCustomersResponse.json();
      dispatch(setCustomers({customers: customers}));
      // console.log(customers);
    };


    const getCities = async () => {
      const getCities = await fetch(
        "http://www.fulek.com/nks/api/aw/cities"
      );
      const data = await getCities.json();
      dispatch(setCities({cities: data}));
    }

    const getStates = async () => {
      const getStates = await fetch(
        "http://www.fulek.com/nks/api/aw/states"
      );
      const data = await getStates.json();
      dispatch(setStates({states: data}));
    }

    useEffect(() => {
      getCustomers();
      getCities();
      getStates();

    }, []);

    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = customers.map((n) => n.Id);
        console.log(newSelected);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }

    const descendingComparator = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
          return -1;
        }
      if (b[orderBy] > a[orderBy]) {
          return 1;
        }
      return 0;
    }

    const getComparator = (order, orderBy) => {
      return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
      <>
        <Box m="2rem auto" sx={{width:'85%'}}>
          <Paper sx={{width:'100%', mb:2}}>
          <TableToolbar numSelected={selected.length} />
          <TableContainer sx={{justifyContent: "center"}}>
          <Table
            sx={{ minWidth: 750, justifyContent: "center" }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={customers.length}
            />
            <TableBody>
              { stableSort(customers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const city = cities.find((item) => row.CityId === item.Id );
                  const state = states.find((item) => city.StateId === item.Id );
                  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.Id)}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.Name}
                      </TableCell>
                      <TableCell align="left">{row.Surname}</TableCell>
                      <TableCell align="left">{row.Email}</TableCell>
                      <TableCell align="left">{row.Telephone}</TableCell>
                      <TableCell align="left">
                        {city.Name}
                      </TableCell>
                      <TableCell align="left">{state.Name}</TableCell>
                      <TableCell align="left">
                          <Button onClick={() => {

                              if(token) {
                                navigate(`/edit/${row.Id}`);
                              } else {
                                Swal.fire({
                                  icon: 'warning',
                                  title: 'You are not logged in!',
                                  showCloseButton: true,
                                  focusConfirm: true,
                              });
                              }
                            }
                          }
                            sx={{
                              m: "0 0.5rem",
                              p: "0.3rem",
                              backgroundColor: main,
                              color: alt,
                              "&:hover": { color: main },
                            }}
                          >
                              Edit
                          </Button>
                          <Button onClick={() => {

                            if(token) {
                              navigate(`/${row.Id}/bills`);
                            } else {
                              Swal.fire({
                                icon: 'warning',
                                title: 'You are not logged in!',
                                showCloseButton: true,
                                focusConfirm: true,
                            });
                            }
                          }
                          }
                            sx={{
                              p: "0.3rem",
                              backgroundColor: main,
                              color: alt,
                              "&:hover": { color: main },
                            }}>
                              View
                          </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
             </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      </Box>
      </>
    );
};

export default CustomerList;