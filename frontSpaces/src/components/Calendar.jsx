import React from 'react'
import { useState, useEffect, createTheme } from "react"
import Calendar from 'react-calendar'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Grid } from '@mui/material'
import './Calendar.css';

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'


const yyyymmdd = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${('00' + (date.getMonth() + 1)).slice(-2)}-${('00' + (date.getDate())).slice(-2)}`
};




export default () => {


    const [selectedDates, setSelectedDates] = useState("");
    const [date, setDate] = useState(new Date())

    function tileClassName({ date, view }) {
        if (view === 'month') {
            const dateStr = yyyymmdd(date)
            if (selectedDates.includes(dateStr)) {
                return "highlighted-date";
            }
        }
        return null
    }

    function handleActiveStartDateChange(ev) {
        console.log("canvi de mes", yyyymmdd(ev.activeStartDate))
    }

    function isWeekday(date) {
        const dayOfWeek = date.getDay();
        return dayOfWeek !== 0 && dayOfWeek !== 6;
    }

    return (<>
        <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                <Box sx={{
                    minWidth: 275,
                }}>

                    <Calendar
                        onActiveStartDateChange={handleActiveStartDateChange}
                        showNeighboringMonth={true}
                        tileClassName={tileClassName}
                        onChange={setDate}
                        value={date}
                        selectRange={true}
                    />

                </Box>
            </Grid>
        </Grid >

    </>)
}

