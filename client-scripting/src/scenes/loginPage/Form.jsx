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
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Swal from "sweetalert2";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    name: yup.string().required("required"),
    // img: yup.string().notRequired("required")
});

const loginSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister = {
    username: "",
    password: "",
    name: "",
    // img: ""
};

const initialValuesLogin = {
    username: "",
    password: "",
};

const Form = () =>
{
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const { palette } = useTheme();


    const register = async (values, onSubmitProps) =>
    {
        const formData = new FormData();
        for (let value in values)
        {
            formData.append(value, values[value]);
        }

        const savedUserResponse = await fetch(
            "http://www.fulek.com/nks/api/aw/registeruser",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser)
        {
            Swal.fire({
                icon: 'success',
                title: 'You successfully registered!',
                showConfirmButton: false,
                timer: 1500,
            });

            setPageType("login");
        }
    };


    const login = async (values, onSubmitProps) =>
    {
        const loggedInResponse = await fetch("http://www.fulek.com/nks/api/aw/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn)
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

                    // localStorage.setItem('is_authenticated', true);
                    // setIsAuthenticated(true);

                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully logged in!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    navigate("/home");
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
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) =>
            {
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
                            label="Username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={Boolean(touched.username) && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />



                        {isRegister && (
                            <>
                                <TextField
                                    label="name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={
                                        Boolean(touched.name) && Boolean(errors.name)
                                    }
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </>
                        )}
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
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() =>
                            {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
            }}
        </Formik>
    );
};

export default Form;