import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/NavBar";
import React from "react";
import Form from "./Form";
const AddPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <>
            <Navbar />
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Form />
            </Box>
        </>
    )
};


export default AddPage;