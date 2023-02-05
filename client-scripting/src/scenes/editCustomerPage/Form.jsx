import { useEffect, useRef, useState } from "react";
import
{
    Box,
    Button,
    TextField,
    useMediaQuery,
    useTheme,
    Select,
    FormControl,
    MenuItem,
} from "@mui/material";


import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const customerSchema = yup.object().shape({
    name: yup.string().required("required"),
    surname: yup.string().required("required"),
    email: yup.string().required("required"),
    telephone: yup.string().required("required"),
    city: yup.string().required("required"),
});

const Form = ({customer}) =>
{

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    const navigate = useNavigate();
    const cities = useSelector((state) => state.cities);
    const states = useSelector((state) => state.states);
    const token = useSelector((state) => state.token);
    
    const initialValuesCustomer = {
        name: customer.Name,
        surname: customer.Surname,
        email: customer.Email,
        telephone: customer.Telephone,
        city: customer.CityId
    };
    
    const editCustomer = async (values, onSubmitProps) =>
    {

        const editCustomerResp = await fetch(`http://www.fulek.com/nks/api/aw/editcustomer`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify({
                Id: customer.Id,
                Name: values.name,
                Surname: values.surname,
                Email: values.email,
                Telephone: values.telephone,
                CityId: values.city,
            }),
        });
        // JSON.stringify(values)
        const editResponse = await editCustomerResp.json();
        
        if (!editResponse.Message)
        {

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
                        title: 'Successfully updated customer!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    navigate("/");
                },
            });
        } else
        {
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
                        text: editResponse.Message,
                        showConfirmButton: true,
                    });
                },
            });
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) =>
    {
        await editCustomer(values, onSubmitProps);
    };

    return (

        <Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initialValuesCustomer}
            validationSchema={customerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) =>
            (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >

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
                            label={values.surname ? "" : "Surname"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.surname}
                            name="surname"
                            error={Boolean(touched.surname) && Boolean(errors.surname)}
                            helperText={touched.surname && errors.surname}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label={values.email ? "" : "Email"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label={values.telephone ? "" : "Telephone"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.telephone}
                            name="telephone"
                            error={Boolean(touched.telephone) && Boolean(errors.telephone)}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <FormControl>
                            <Select
                                name="city"
                                id="cities"
                                value={values.city || ""}
                                onChange={handleChange}
                                error={Boolean(touched.city) && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                                sx={{ gridColumn: "span 4" }}
                                >
                                    <MenuItem key={""} value={""}>Not selected</MenuItem>
                                
                                {
                                    cities.map((city) => (
                                        <MenuItem key={city.Id} value={city.Id}>{city.Name}</MenuItem>    
                                    ))
                                }
                            </Select>
                        </FormControl>

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
    );
};

export default Form;