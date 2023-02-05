import React from "react";
import
{
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";
import Swal from "sweetalert2";

const userSchema = yup.object().shape({
    name: yup.string().required("required"),
    username: yup.string().required("required"),
});

const Form = ({user}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const initialValuesUser = {
        name: user.name,
        username: user.username,
    };

    const updateUser = async (values, onSubmitProps) => {
        const updateUserResp = await fetch(`http://www.fulek.com/nks/api/aw/editUser`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                id: user.id,
                username: values.username,
                name: values.name,
                password: user.password,
                img: user.img
            }),
        });
        const data = await updateUserResp.json();
        onSubmitProps.resetForm();
        if(!data.Message) {
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
                        title: 'Successfully updated user!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    dispatch(setUser({user: data.username}));
                    navigate("/");
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
                        icon: 'error',
                        title: 'Error!',
                        text: data.Message,
                        showConfirmButton: true,
                    });
                },
            });
        }
    };


    const handleFormSubmit = async (values, onSubmitProps) => 
    {
        await updateUser(values, onSubmitProps);
    };

    return (
        
        <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initialValuesUser}
        validationSchema={userSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
        }) =>
        (
            <form onSubmit={handleSubmit}>

                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}>


                            <TextField
                                label={values.name ? "" :"Name"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={Boolean(touched.name) && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label={"Username"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={Boolean(touched.username) && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box>
                        <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}

                            >
                                UPDATE
                            </Button>
                        </Box>
            </form>
        )}
        </Formik>
    
    )

}

export default Form;