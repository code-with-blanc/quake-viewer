import { forwardRef } from 'react'
import { format } from 'date-fns'
import ReactDatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import "./dateButton.scss"

const TimelineDateButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { value, onClick } = props as { value: Date, onClick: () => void }

  return (
      <button
          className="timeline-date-button"
          onClick={onClick} ref={ref}
      >
        {format(value, "MM/yyyy")}
      </button>
  )
})

export default function DateButton({
    value, onChange
}) {
      return (
        <ReactDatePicker
          selected={value}
          onChange={(date) => onChange(date)}
          customInput={<TimelineDateButton/>}
          showMonthYearPicker
        />
      );
}
