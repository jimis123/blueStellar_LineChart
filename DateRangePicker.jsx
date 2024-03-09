import React from "react";
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { format } from "date-fns";


export default function DatePicker() {

const [openCalender, setOpenCalender] = useState(false);    
const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
});

const handleChange = (ranges) => {
    setDate(ranges.selection);
};

const handleClick = () => {
    setOpenCalender((prev) => !prev)
};

    return (
      <div className="container">
        <span onClick={handleClick} className="calender">
            {
                `${format(date.startDate,"dd/MM/yyyy")} to ${format(date.endDate,"dd/MM/yyyy")}`
            }
        </span>
        {openCalender && <DateRangePicker 
            ranges={[date]}
            onChange={handleChange}
            minDate={new Date()}
        />}
      </div>
    );
  };
  