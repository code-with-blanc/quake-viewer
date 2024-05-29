import React, { useState, forwardRef } from 'react'
import { format } from 'date-fns'
import ReactDatePicker from 'react-datepicker';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import "react-datepicker/dist/react-datepicker.css";

import './timeline.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectDateRange } from '../../store/controls/controls';
import DateButton from './dateButton';

const DateSlider = ({
  startDate, endDate, setDateRange,
}) => {
  return (
    <div className="timeline-container">
      <div className="timeline-date-start">
        <DateButton
          value={startDate}
          onChange={(date) => setDateRange(date.getTime(), endDate)}
        />
      </div>
      <div className="timeline-slider" >
        <RangeSlider
          min={startDate}
          max={endDate}
          value={[startDate, endDate]}
          onInput={(param) => {
            console.log(param)
          }}
        />
      </div>
      <div className="timeline-date-end">
        <DateButton 
          value={endDate}
          onChange={(date) => setDateRange(startDate, date.getTime())}
        />
      </div>
    </div>
  )
}

export default DateSlider
