import { useState } from "react";
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

const Form = (props) =>
{
    // const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // const isLogin = pageType === "login";
    // const isRegister = pageType === "register";
    const { palette } = useTheme();
    const cities = useSelector((state) => state.cities);
    const states = useSelector((state) => state.states);
    const token = useSelector((state) => state.token);

    const [customer, setCustomer] = useState(props.customer);

    const initialValuesCustomer = {
        name: customer.Name,
        surname: customer.Surname,
        email: customer.Email,
        city: customer.CityId
    };

    const editCustomer = async (values, onSubmitProps) =>
    {
        const loggedInResponse = await fetch("http://www.fulek.com/nks/api/aw/editcustomer", {
            method: "POST",
            headers: { 
                
                Authorization: `Bearer ${token}` ,
                "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (!loggedIn.message)
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
                    dispatch(
                        setLogin({
                            user: loggedIn.username,
                            token: loggedIn.token,
                        })
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully logged in!',
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
                        text: 'Incorrect email or password.',
                        showConfirmButton: true,
                    });
                },
            });
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) =>
    {

        //update customer
        editCustomer(values, onSubmitProps);


        // if (isLogin) await login(values, onSubmitProps);
        // if (isRegister) await register(values, onSubmitProps);
    };

    return (

        <Formik
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
                resetForm,
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
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={Boolean(touched.name) && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Surname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.surname}
                            name="surname"
                            error={Boolean(touched.surname) && Boolean(errors.surname)}
                            helperText={touched.surname && errors.surname}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />

                        <TextField
                            label="City"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.city}
                            name="city"
                            error={Boolean(touched.city) && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
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
    );
};

export default Form;