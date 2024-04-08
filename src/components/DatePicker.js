import React from "react";
import { DateRangePicker } from "@adobe/react-spectrum";
import { today } from "@internationalized/date";

function DatePicker({ onDateChange }) {
  let [value, setValue] = React.useState({
    start: today(),
    end: today(),
  });

  const setDate = (date) => {
    setValue(date);
    onDateChange(date);
  };

  return (
    <DateRangePicker
      label="Choose time interval"
      value={value}
      onChange={setDate}
    />
  );
}

export default DatePicker;
