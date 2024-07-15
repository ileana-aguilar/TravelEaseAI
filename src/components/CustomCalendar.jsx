import React, { useState, useEffect } from 'react';
import './CustomCalendar.css';

const CustomCalendar = ({ onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    if (selectedDates.length === 2) {
      onChange(selectedDates);
    }
  }, [selectedDates, onChange]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDayClick = (day, date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    if (selectedDates.length === 2) {
      setSelectedDates([newDate]);
    } else {
      setSelectedDates([...selectedDates, newDate].sort((a, b) => a - b));
    }
  };

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${selectedDates.some(d => d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) ? 'selected' : ''}`}
          onClick={() => handleDayClick(day, date)}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);

  return (
    <div className="calendar-container">
      <div className="calendar-month">
        <div className="calendar-header">
          <button onClick={handlePreviousMonth}>Previous</button>
          <div className="month-year">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </div>
        </div>
        <div className="calendar-days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{generateCalendar(currentDate)}</div>
      </div>
      <div className="calendar-month">
        <div className="calendar-header">
          <div className="month-year">
            {nextMonthDate.toLocaleString('default', { month: 'long' })} {nextMonthDate.getFullYear()}
          </div>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{generateCalendar(nextMonthDate)}</div>
      </div>
    </div>
  );
};

export default CustomCalendar;
