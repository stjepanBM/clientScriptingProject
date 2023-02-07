import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearSelected } from "state";

const TableToolbar = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { numSelected } = props;
    const isAuth = useSelector((state) => state.token);
    const selectedCustomer = useSelector((state) => state.selected);
    const token = useSelector((state) => state.token);

    const handleDelete = async () => {
        console.log(selectedCustomer);
        let responseOk = true;
        let errorMessages = [];
        
        for(let i = 0; i < selectedCustomer.length; i++) {
          const deleteCustomerResp = await fetch(`http://www.fulek.com/nks/api/aw/deletecustomer`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                Id: selectedCustomer[i],
            }),
          });
          const deleteResponse = await deleteCustomerResp.json();

          if(deleteResponse.Message) {
            responseOk = false;
            errorMessages.push(deleteResponse.Message);
          }
        }

        if(!responseOk) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () =>
            {
                Swal.showLoading();
            },
            willClose: () =>
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorMessages[0],
                    showConfirmButton: true,
                });
            },
          });
        } else {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () =>
            {
                Swal.showLoading();
            },
            willClose: () =>
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully deleted customers!',
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate("/");
            },
          });
          dispatch(clearSelected());
        }
    };

    return (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Customers
            </Typography>
          )}
          
          {(numSelected > 0) && isAuth  ? (
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add Customer">
              <IconButton onClick={() => navigate("/add")}>
                <AddBox />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      );
};

export default TableToolbar;