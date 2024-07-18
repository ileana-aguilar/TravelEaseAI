import React, { useState } from 'react';

const StepThree = ({ formData, setFormData, handleChange, handleNext, handleBack }) => {
    const [selected, setSelected] = useState(formData.travelCompanions);
    const handleButtonClick = (value) => {
        setFormData({
          ...formData,
          travelCompanions: value
        });
        setSelected(value);
      };
    
    const isNextButtonDisabled = !selected;
    console.log('StepThree', formData.travelCompanions);
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <div className='itineray-header'>
            <h2>{formData.destination} Itineray</h2>
        </div>
      <div className='div-shadow-two step-two-div'>
      <div className='progress-bar-div'>
            <div className='progress-bar' style={{ width: '75%' }}></div>
        </div>
        <div className='step-three-content'>
        <div className='form-header'>
            <label className='when-label'>Who’s going with you?</label>
            <p>Choose one.</p>
        </div>
        <div className="step-three-wrapper">
            <button
                type="button"
                className={`step-three-selections ${selected === 'Solo' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Solo')}
            >
                Solo
            </button>
            <button
                type="button"
                className={`step-three-selections ${selected === 'Partner' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Partner')}
            >
                Partner
            </button>
            <button
                type="button"
                className={`step-three-selections ${selected === 'Friends' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Friends')}
            >
                Friends
            </button>
            <button
                type="button"
                className={`step-three-selections ${selected === 'Family' ? 'active' : ''}`}
                onClick={() => handleButtonClick('Family')}
            >
                Family
            </button>
        </div>
        </div>
      </div>
      <div className='form-buttons-div'>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit" className='submit-button' disabled={isNextButtonDisabled}> Next </button>
      </div>
    </form>
  );
};

export default StepThree;
