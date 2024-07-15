import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar1.css';
import CustomCalendar from './CustomCalendar';
import './CustomCalendar.css'; 


const StepTwo = ({ formData, handleChange, handleNext, handleBack }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [isFlexible, setIsFlexible] = useState(false);
    const [lengthOfStay, setLengthOfStay] = useState('');

    const handleDateChange = (range) => {
        const [start, end] = range;
        if (end && (end - start) / (1000 * 60 * 60 * 24) > 2) {
            // Prevent selecting more than 2 days
            alert("You can only select up to 2 days.");
            return;
        }
        setDateRange(range);
        formData.travelDates = range;
        handleChange({ target: { name: 'travelDates', value: range } });
    };

    const tileDisabled = ({ date, view }) => {
        // Disable dates before today, but allow today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
        if (view === 'month') {
            return date < today;
        }
        return false;
    };

    const tileClassName = ({ date, view }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let className = '';
        if (view === 'month') {
            if (date < today) {
                className += 'disabled-tile ';
            }
            if (date.getDay() === 0) {
                className += 'sunday ';
            }
            if (date.toDateString() === today.toDateString()) {
                className += 'react-calendar__tile--now ';
            }
            if (dateRange[0] && dateRange[1] && date > dateRange[0] && date < dateRange[1]) {
                className += 'react-calendar__tile--range ';
            }
            if (dateRange[0] && date.toDateString() === dateRange[0].toDateString()) {
                className += 'react-calendar__tile--rangeStart ';
            }
            if (dateRange[1] && date.toDateString() === dateRange[1].toDateString()) {
                className += 'react-calendar__tile--rangeEnd ';
            }
        }
        return className.trim();
    };

    const activateFlexible = (e) => {
        e.preventDefault(); // Prevent form submission
        setIsFlexible(true);
        setLengthOfStay(1);
        setDateRange([null, null]);
    };

    const deactivateFlexible = (e) => {
        e.preventDefault(); // Prevent form submission
        setIsFlexible(false);
        setLengthOfStay('');
    };

    const handleDecrease = () => {
        if (lengthOfStay > 1) {
            setLengthOfStay(lengthOfStay - 1);
        }
    };

    const handleIncrease = () => {
        if (lengthOfStay < 2) {
            setLengthOfStay(lengthOfStay + 1);
        }
    };

    formData.lengthOfStay = lengthOfStay;

    const isNextButtonDisabled = () => {
        if (isFlexible) {
            return !lengthOfStay;
        } else {
            return !dateRange[0] || !dateRange[1];
        }
    };

    console.log('StepTwo', formData.travelDates);
    console.log('StepTwo', formData.lengthOfStay);

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className='form'>
        <div className='itineray-header'>
            <h2>{formData.destination} Itineray</h2>
        </div>
      <div className='div-shadow-two step-two-div'>
      <div className='progress-bar-div'>
            <div className='progress-bar' style={{ width: '50%' }}></div>
        </div>
        
        <div className='form-header'>
            <label className='when-label'>When do you want to go?</label>
            <p>Choose a date range or length of stay, up to 2 days.</p>
        </div>
        <div className='trip-length-button-div'>
            <button className={`trip-length-button ${isFlexible ? '' : 'active'}`} onClick={deactivateFlexible}> Dates (MM/DD)</button>
            <button className={`trip-length-button ${isFlexible ? 'active' : ''}`}  onClick={activateFlexible}> I'm Flexible</button>
        </div>

        {!isFlexible && (
            <div className='selected-dates'>
                <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_120_24)">
                <path d="M26.25 2.15364L19.2439 2.15366V0.721191C19.2439 0.324082 18.8523 0.00244141 18.3689 0.00244141C17.8854 0.00244141 17.4939 0.324082 17.4939 0.721191V2.1533H10.4939V0.721191C10.4939 0.324082 10.1023 0.00244141 9.61888 0.00244141C9.13544 0.00244141 8.74388 0.324082 8.74388 0.721191V2.1533H1.75C0.783562 2.1533 0 2.79694 0 3.5908V21.5596C0 22.3534 0.783562 22.9971 1.75 22.9971H26.25C27.2164 22.9971 28 22.3534 28 21.5596V3.5908C28 2.79728 27.2164 2.15364 26.25 2.15364ZM26.25 21.5596H1.75V3.5908H8.74388V4.31494C8.74388 4.71203 9.13544 5.03369 9.61888 5.03369C10.1023 5.03369 10.4939 4.71203 10.4939 4.31494V3.59116H17.4939V4.3153C17.4939 4.71241 17.8854 5.03405 18.3689 5.03405C18.8523 5.03405 19.2439 4.71241 19.2439 4.3153V3.59116H26.25V21.5596ZM20.125 11.4974H21.875C22.358 11.4974 22.75 11.1754 22.75 10.7786V9.34114C22.75 8.94439 22.358 8.62239 21.875 8.62239H20.125C19.642 8.62239 19.25 8.94439 19.25 9.34114V10.7786C19.25 11.1754 19.642 11.4974 20.125 11.4974ZM20.125 17.247H21.875C22.358 17.247 22.75 16.9254 22.75 16.5283V15.0908C22.75 14.694 22.358 14.372 21.875 14.372H20.125C19.642 14.372 19.25 14.694 19.25 15.0908V16.5283C19.25 16.9257 19.642 17.247 20.125 17.247ZM14.875 14.372H13.125C12.642 14.372 12.25 14.694 12.25 15.0908V16.5283C12.25 16.9254 12.642 17.247 13.125 17.247H14.875C15.358 17.247 15.75 16.9254 15.75 16.5283V15.0908C15.75 14.6944 15.358 14.372 14.875 14.372ZM14.875 8.62239H13.125C12.642 8.62239 12.25 8.94439 12.25 9.34114V10.7786C12.25 11.1754 12.642 11.4974 13.125 11.4974H14.875C15.358 11.4974 15.75 11.1754 15.75 10.7786V9.34114C15.75 8.94403 15.358 8.62239 14.875 8.62239ZM7.875 8.62239H6.125C5.642 8.62239 5.25 8.94439 5.25 9.34114V10.7786C5.25 11.1754 5.642 11.4974 6.125 11.4974H7.875C8.358 11.4974 8.75 11.1754 8.75 10.7786V9.34114C8.75 8.94403 8.358 8.62239 7.875 8.62239ZM7.875 14.372H6.125C5.642 14.372 5.25 14.694 5.25 15.0908V16.5283C5.25 16.9254 5.642 17.247 6.125 17.247H7.875C8.358 17.247 8.75 16.9254 8.75 16.5283V15.0908C8.75 14.6944 8.358 14.372 7.875 14.372Z" fill="#213547"/>
                </g>
                <defs>
                <clipPath id="clip0_120_24">
                <rect width="28" height="23" fill="white"/>
                </clipPath>
                </defs>
                </svg>



                <p>{dateRange[0] ? dateRange[0].toDateString() : 'Select a start date'}</p>

                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.6697 16.0134L17.9509 24.7321C17.8132 24.8605 17.631 24.9303 17.4428 24.927C17.2546 24.9237 17.075 24.8474 16.9419 24.7143C16.8087 24.5812 16.7325 24.4016 16.7292 24.2134C16.7259 24.0252 16.7957 23.843 16.9241 23.7053L24.4016 16.2265H4.84375C4.65105 16.2265 4.46625 16.15 4.32999 16.0137C4.19374 15.8774 4.11719 15.6926 4.11719 15.4999C4.11719 15.3072 4.19374 15.1224 4.32999 14.9862C4.46625 14.8499 4.65105 14.7734 4.84375 14.7734H24.4016L16.9241 7.29463C16.7957 7.1569 16.7259 6.97473 16.7292 6.7865C16.7325 6.59827 16.8087 6.41868 16.9419 6.28556C17.075 6.15244 17.2546 6.07619 17.4428 6.07287C17.631 6.06955 17.8132 6.13942 17.9509 6.26776L26.6697 14.9865C26.8057 15.1227 26.8822 15.3074 26.8822 15.4999C26.8822 15.6925 26.8057 15.8772 26.6697 16.0134Z" fill="#213547"/>
                </svg>

                <p>{dateRange[1] ? dateRange[1].toDateString() : 'Select an end date'}</p>
            </div>
        )}
        {!isFlexible && (
       <div className='calendar-div'>
       <Calendar
                onChange={handleDateChange}
                value={dateRange}
                selectRange={true}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
                showDoubleView={true} 
            />
      
      
      </div>
    )}
    
      </div>

      {isFlexible && (
                <div className='length-of-stay-div'>
                        <label>Length of Stay</label>
                        <div className='length-of-stay-controls'>
                            <button type="button" onClick={handleDecrease} disabled={lengthOfStay <= 1}>-</button>
                            <input type="number" value={lengthOfStay} readOnly required />
                            <button type="button" onClick={handleIncrease} disabled={lengthOfStay >= 2}>+</button>
                        </div>
                    </div>
            )}


      
      <div className='form-buttons-div'>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit" className='submit-button' disabled={isNextButtonDisabled()}>Next</button>
      </div>
    </form>
  );
};

export default StepTwo;
