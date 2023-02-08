import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TableToolbar = (props) => {

    const navigate = useNavigate();
    const { numSelected } = props;
    const isAuth = useSelector((state) => state.token);

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
              <IconButton onClick={() => props.onDelete()}>
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