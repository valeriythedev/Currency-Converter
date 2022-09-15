import React from 'react';
import '../styles/currency.css'
import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";

const CurrencyHeader = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className="currency-header" position="static" sx={{backgroundColor: "#332f2f"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Currency Converter
                    </Typography>
                    <Link color="inherit" underline="none"
                          href={"https://github.com/valeriythedev"}>@valeriythedev</Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default CurrencyHeader;