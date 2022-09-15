import React, {useEffect, useState} from 'react';
import '../styles/currency.css'
import {Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import CurrencyHeader from "./CurrencyHeader";

const superagent = require('superagent');

const CurrencyPage = () => {

    const [currencyArray, setCurrencyArray] = useState<[]>([]);
    const [from, setFrom] = useState<string>("USD");
    const [to, setTo] = useState<string>("EUR");
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        if (amount > 0 && from !== "" && to !== "") {
            // @ts-ignore
            superagent.get(`http://localhost:8080/api/currency/convert?from=${from}&to=${to}&amount=${amount}`).then((res) => {
                setResult(parseFloat(res.text));
            });
        } else {
            setResult(0);
        }
    }, [amount, from, to]);

    useEffect(() => {
        // @ts-ignore
        superagent.get(`http://localhost:8080/api/currency/`).then((res) => {
            const dataJSON = JSON.parse(res.text);
            // @ts-ignore
            const currencyArray = []
            Object.keys(dataJSON).map((idx) => {
                // @ts-ignore
                currencyArray.push(dataJSON[parseInt(idx, 10)]);
            });
            // @ts-ignore
            setCurrencyArray(currencyArray);
        });
    }, []);

    // @ts-ignore
    const handleFromChange = (e) => {
        // @ts-ignore
        setFrom(e.target.value);
    };

    // @ts-ignore
    const handleToChange = (e) => {
        // @ts-ignore
        setTo(e.target.value);
    }

    //
    // @ts-ignore
    const handleAmountChange = (e) => {
        // @ts-ignore
        setAmount(e.target.value);
    }

    return (
        <div className="currency">
            <CurrencyHeader/>
            <main className="currency-list">
                <Box className="currency-input" sx={{minWidth: 120, width: 200}}>
                    <FormControl>
                        <InputLabel id={"fromLabel"}>From</InputLabel>
                        <Select
                            sx={{
                                minWidth: 120,
                                width: 200
                            }}
                            labelId={"fromLabel"}
                            id={"fromSelect"}
                            label={"From"}
                            value={from}
                            // @ts-ignore
                            onChange={handleFromChange}
                        >
                            {currencyArray.map((currency, idx) => (
                                <MenuItem key={idx} value={currency}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="currency-input" sx={{minWidth: 120, width: 200}}>
                    <FormControl>
                        <InputLabel id={"toLabel"}>To</InputLabel>
                        <Select
                            sx={{
                                minWidth: 120,
                                width: 200
                            }}
                            labelId={"toLabel"}
                            id={"toSelect"}
                            label={"To"}
                            value={to}
                            // @ts-ignore
                            onChange={handleToChange}
                        >
                            {currencyArray.map((currency, idx) => (
                                <MenuItem key={idx} value={currency}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="currency-input" sx={{minWidth: 120, width: 200}}>
                    <FormControl>
                        <InputLabel id={"amountLabel"} htmlFor="outlined-amountLabel">Amount</InputLabel>
                        <OutlinedInput
                            sx={{
                                minWidth: 120,
                                width: 200
                            }}
                            id="outlined-adornment-amount"
                            value={amount}
                            // @ts-ignore
                            onChange={handleAmountChange}
                            type={"number"}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                </Box>
                <Box className="currency-input" sx={{minWidth: 120, width: 200}}>
                    <FormControl>
                        <TextField
                            id="outlined-read-only-input"
                            label="Result"
                            value={result + " " + to}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Box>
            </main>
        </div>
    );
}

export default CurrencyPage;