import React from 'react';
import './Feed.css';
import './GenerateForm.css';
import IconSearch from '../assets/IconSearch';

const StepOne = ({ formData, handleChange, handleNext }) => {
    console.log('StepOne', formData.destination);
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className='form'>
      <div className='div-shadow step-one-div'>
        <div className='progress-bar-div'>
            <div className='progress-bar' style={{ width: '25%' }}></div>
        </div>
        <label className='where-label'>Where do you want to go?</label>
        <div className="input-wrapper">
            <IconSearch/>
            <input className="search-input" type="text" name="destination" placeholder="City or Town" value={formData.destination} onChange={handleChange} required />
        </div>
      </div>
      <div className='form-buttons-div'>
      <button type="submit" className='submit-button'> Next </button>
      </div>
    </form>
  );
};

export default StepOne;
