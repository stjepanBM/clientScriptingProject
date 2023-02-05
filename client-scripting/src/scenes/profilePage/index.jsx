import { useTheme } from "@emotion/react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/NavBar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Form from "./Form";


const ProfilePage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const username = useSelector((state) => state.user);
    const [user, setUser] = useState({});

    const getUser = async () => {
        const getUserByUsername = await fetch(
            `http://www.fulek.com/nks/api/aw/getUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify( {
                    username: username
                }),
        });
        const data = await getUserByUsername.json();

        if(!data.Message) {
            setUser(data);
            console.log(user);
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
    }

    useEffect(() => {
        getUser();
    }, []);


    return(
        <>
        <Navbar />
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >

            <Form user={user} />

            </Box>
        </>
    )
};

export default ProfilePage;