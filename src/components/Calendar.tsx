import React from 'react';
import { DayPicker } from 'react-day-picker';
import Tooltip from '@mui/material/Tooltip';

// ...existing imports

const Calendar = ({ onDateSelect }) => {
  // ...existing state and functions

  // Function to check if a date is disabled (Sunday)
  const isDisabledDay = (date: Date) => {
    return date.getDay() === 0;
  };

  // Custom day content to show tooltip for Sundays
  const renderDay = (date) => {
    if (date.getDay() === 0) {
      return (
        <Tooltip title="Disponible uniquement sur réservation">
          <span style={{ pointerEvents: 'none', opacity: 0.5 }}>
            {date.getDate()}
          </span>
        </Tooltip>
      );
    }
    return <span>{date.getDate()}</span>;
  };

  return (
    <DayPicker
      // ...other props...
      disabled={isDisabledDay}
      onDayClick={(date, modifiers) => {
        if (!modifiers.disabled) {
          onDateSelect(date);
        }
      }}
      components={{ DayContent: renderDay }}
      // ...other props...
    />
  );
};

export default Calendar;