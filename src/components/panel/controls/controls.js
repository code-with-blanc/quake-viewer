import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchQuakes } from '../../../store/quakes/quakes';
import { useDebounce } from '@uidotdev/usehooks';

function Controls({
    startDate, endDate, setDateRange, setRenderQuakes
}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchQuakes())
    }, [startDate, endDate])

    return (
        <div className='panel-controls'>
            <div>Date Range</div>
            <DateInput
                initialValue={startDate}
                onChange={(date) => {
                    setDateRange(date, endDate)
                }}
            />
            <DateInput
                initialValue={endDate}
                onChange={(date) => {
                    setDateRange(startDate, date)
                }}
            />
        </div>
    )
}

const DateInput = ({ onChange, initialValue }) => {
    const [tempDate, setTempDate] = useState(initialValue);
    const debouncedDate = useDebounce(tempDate, 1000);
    useEffect(() => {
        onChange(debouncedDate)
    }, [debouncedDate])

    return (
        <input
            defaultValue={timestampToText(initialValue)}
            value={timestampToText(tempDate)}
            onChange={(e) => {
                const date = Date.parse(e.target.value)
                setTempDate(date)
            }}
        />
    )
}

const timestampToText = (timestamp) => {
    const date = new Date()
    date.setTime(timestamp)
    return date.toLocaleDateString()
}

export default Controls
