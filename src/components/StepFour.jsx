import React from 'react';

const StepFour = ({ formData, handleChange, handleTextareaChange, handleBack, handleSubmit }) => {
    console.log('StepFour', formData.interests);
    console.log('StepFour', formData.extraInterests);
  return (
    <form onSubmit={handleSubmit}>
        <div className='itineray-header'>
            <h2>{formData.destination} Itineray</h2>
        </div>
      <div className='div-shadow-two step-two-div'>
      <div className='progress-bar-div'>
            <div className='progress-bar' style={{ width: '100%' }}></div>
        </div>
        
        <div className='form-header'>
            <label className='when-label'>How do you want to spend your time?</label>
            <p>Choose as many as you’d like.</p>
            <div className='checkbox-buttons'>
            <div>
              <input
                type="checkbox"
                id="great-food"
                name="interests"
                value="Great Food"
                onChange={handleChange}
                checked={formData.interests.includes('Great Food')}
              />
              <label htmlFor="great-food">Great Food</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="historical-landmarks"
                name="interests"
                value="Historical Landmarks"
                onChange={handleChange}
                checked={formData.interests.includes('Historical Landmarks')}
              />
              <label htmlFor="historical-landmarks">Historical Landmarks</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="art-galleries"
                name="interests"
                value="Art Galleries"
                onChange={handleChange}
                checked={formData.interests.includes('Art Galleries')}
              />
              <label htmlFor="art-galleries">Art Galleries</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="nightlife-bars"
                name="interests"
                value="Nightlife and Bars"
                onChange={handleChange}
                checked={formData.interests.includes('Nightlife and Bars')}
              />
              <label htmlFor="nightlife-bars">Nightlife and Bars</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="outdoors"
                name="interests"
                value="Outdoors"
                onChange={handleChange}
                checked={formData.interests.includes('Outdoors')}
              />
              <label htmlFor="outdoors">Outdoors</label>
            </div>
          </div>
        </div>
        <div className='interest-textarea'>
            <label className='interests-label'>Other Interests</label>
        <textarea
            name="extraInterests"
            value={formData.extraInterests}
            onChange={handleTextareaChange}
            placeholder="Spa, Shopping, etc."
          />
        </div>
      </div>
      <div className='form-buttons-div'>
        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit" className='submit-button'> Submit </button>
      </div>
    </form>
  );
};

export default StepFour;
