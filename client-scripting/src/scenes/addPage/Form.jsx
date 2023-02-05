import React from "react";


import { useEffect, useRef, useState } from "react";
import
{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";


import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import Swal from "sweetalert2";

const customerSchema = yup.object().shape({
    name: yup.string().required("required"),
    surname: yup.string().required("required"),
    email: yup.string().required("required"),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
});


const Form = () => {

}

export default Form;