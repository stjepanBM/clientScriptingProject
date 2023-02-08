import { useState } from "react";
import
{
    Box,
    IconButton,
    InputBase,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
} from "@mui/material";
import
{
    Search,
    DarkMode,
    LightMode,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";


const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const main = theme.palette.primary.main;
    let fullName = "";
    
    if(user) {   
         fullName= `${user}`;
    }


    return (

        <FlexBetween padding="1rem 6%" backgroundColor={alt} >
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    CustMng
                </Typography>
                {/* {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )} */}
            </FlexBetween>

            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            ) : (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>




                    {!user && (
                        
                        <Button type="button"
                            fullWidth
                            sx={{
                                p: "0.5rem",
                                backgroundColor: main,
                                color: alt,
                                "&:hover": { color: main },
                            }}
                            onClick={() => {navigate("/login")}}
                        >
                            Login/Register
                        </Button>

                    )}

                    {user && (

                            <>
                                <Button type="button"
                                    sx={{
                                        p: "0.5rem",
                                        backgroundColor: main,
                                        color: alt,
                                        "&:hover": { color: main },
                                    }}
                                    onClick={() => {navigate("/profile")}}
                                    >
                                        {fullName}
                                </Button>



                                <Button type="button"
                                    sx={{
                                        p: "0.5rem",
                                        backgroundColor: main,
                                        color: alt,
                                        "&:hover": { color: main },
                                    }}
                                    onClick={() => dispatch(setLogout())}
                                >
                                Logout
                                </Button>
                            </>

                    )}
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}


            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="300px"
                    minWidth="200px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="2rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>

                        <Button type="button"
                            sx={{
                                p: "0.5rem",
                                backgroundColor: main,
                                color: alt,
                                "&:hover": { color: main },
                            }}
                            onClick={() => {navigate("/login")}}
                         >
                          Login/Register
                        </Button>


                        {user && (

                            <>
                                <Button type="button"
                                    sx={{
                                        p: "0.5rem",
                                        backgroundColor: main,
                                        color: alt,
                                        "&:hover": { color: main },
                                    }}
                                    onClick={() => {navigate("/profile/:id")}}
                                    >
                                        {fullName}
                                </Button>

                            

                                <Button type="button"
                                    sx={{
                                        m:"1rem",
                                        p: "0.5rem",
                                        backgroundColor: main,
                                        color: alt,
                                        "&:hover": { color: main },
                                    }}
                                    onClick={() => dispatch(setLogout())}
                                >
                                Logout
                                </Button>
                            </>
                        
                        )}
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;