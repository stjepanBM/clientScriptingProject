import React, { useEffect, useMemo, useState } from "react";
import Navbar from "components/NavBar";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import Form from "./Form"

const UpdateCustomer = () => {

    const { customerId } = useParams();
    const [customer, setCustomer] = useState({});
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
    const getCustomerById = async () => {
        const getCustomerById = await fetch(
            `http://www.fulek.com/nks/api/aw/customer/${customerId}`
        );
        const data = await getCustomerById.json();
        setCustomer(data);
    };

    useEffect(() => {
        getCustomerById();
    }, []);

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

            <Form customer={customer} />

            </Box>
        </>
    )
};

export default UpdateCustomer;