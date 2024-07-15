import { useState } from 'react';
import axios from 'axios';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import LoadingOverlay from './LoadingOverlay';
import './GenerateForm.css';

const GenerateItineraryForm = () => {
    const initialFormData = {
        destination: '',
        travelDates: '',
        lengthOfStay: '',
        travelCompanions: '',
        interests: [],
        extraInterests: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);
    const [itinerary, setItinerary] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleChange = (e) => {
        const { value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prevData) => {
                const interests = checked
                    ? [...prevData.interests, value]
                    : prevData.interests.filter((interest) => interest !== value);

                return {
                    ...prevData,
                    interests
                };
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: value
            });
        }
    };

    const handleTextareaChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);  // Set loading to true when submit is clicked
        
        let content;
        if (!formData.travelDates) {
            content = `Generate a travel itinerary based on the following preferences: Destination: ${formData.destination}, Length of Stay: ${formData.lengthOfStay}, Travel Companions: ${formData.travelCompanions}, Interests: ${formData.interests}, Extra Interests: ${formData.extraInterests}. Keep responses 150 tokens max. When suggesting activities, include the name of the place. If given dates, list date. Organize itinerary by day and time of day. Example, morning, afternoon, evening. Focus activities around interests. End with a travel tip if there are enough tokens to do so. The itinerary is more important. Format travel tip as sentence 'Tip goes here' not like this: 'Travel Tip: Tip goes here.' nor like 'Tip: Tip goes here.'`;
        } else {
            const travelDates = formData.travelDates.toString(); // Ensure travelDates is a string
            console.log(travelDates);
            const dates = travelDates.split(',');
            console.log(dates[0]);
            console.log(dates[1]);
            if (!formData.lengthOfStay) {
                if (dates[0] === dates[1]) {
                    content = `Generate a travel itinerary based on the following preferences: Destination: ${formData.destination}, I want to be at the destination strictly on ${dates[0]}, Travel Companions: ${formData.travelCompanions}, Interests: ${formData.interests}, Extra Interests: ${formData.extraInterests}. Keep responses 150 tokens max. When suggesting activities, include the name of the place. If given dates, list date. Organize itinerary by day and time of day. Example, morning, afternoon, evening. For each day, list date. Example, 'Day 1 (${dates[0]} ):'. Focus activities around interests. End with a travel tip if there are enough tokens to do so. The itinerary is more important. Format travel tip as sentence 'Tip goes here' not like this: 'Travel Tip: Tip goes here.' nor like 'Tip: Tip goes here.'`;
                } else {
                    content = `Generate a travel itinerary based on the following preferences: Destination: ${formData.destination}, I want to be at the destination strictly from ${dates[0]} to ${dates[1]}, Travel Companions: ${formData.travelCompanions}, Interests: ${formData.interests}, Extra Interests: ${formData.extraInterests}. Keep responses 150 tokens max. When suggesting activities, include the name of the place. Organize itinerary by day and time of day. Example, morning, afternoon, evening. For each day, list date. Example, 'Day 1 (${dates[0]} ):'. Focus activities around interests. End with a travel tip if there are enough tokens to do so. The itinerary is more important. Format travel tip as sentence 'Tip goes here' not like this: 'Travel Tip: Tip goes here.' nor like 'Tip: Tip goes here.'`;
                }
            } else {
                content = `Generate a travel itinerary based on the following preferences: Destination: ${formData.destination}, Length of Stay: ${formData.lengthOfStay}, Travel Companions: ${formData.travelCompanions}, Interests: ${formData.interests}, Extra Interests: ${formData.extraInterests}. Keep responses 150 tokens max. When suggesting activities, include the name of the place. If given dates, list date. Organize itinerary by day and time of day. Example, morning, afternoon, evening. Focus activities around interests. End with a travel tip if there are enough tokens to do so. The itinerary is more important. Format travel tip as sentence 'Tip goes here' not like this: 'Travel Tip: Tip goes here.' nor like 'Tip: Tip goes here.'`;
            }
        }
        try {
            // Generate Itinerary using OpenAI GPT-3
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful travel assistant who specializes in creating travel itineraries tailored to customers preferences.',
                    },
                    {
                        role: 'user',
                        content: content,
                    },
                ],
                max_tokens: 150,
                temperature: 0.7,
                top_p: 1,
                n: 1,
                stream: false,
                stop: null,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY1}`,
                },
            });
            setItinerary(response.data.choices[0].message.content);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setError('Rate limit exceeded. Please try again later.');
            } else {
                setError('An error occurred while generating the itinerary. Please try again.');
            }
            console.error('Error generating itinerary:', error);
        } finally {
            setLoading(false);  // Set loading to false after the request is finished
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setCurrentStep(1);
        setItinerary('');
    };

    return (
        <div>
            {loading && <LoadingOverlay />} {/* Show loading overlay when loading */}
            {itinerary === '' && (
                <>
                    {currentStep === 1 && (
                        <StepOne formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} />
                    )}
                    {currentStep === 2 && (
                        <StepTwo formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />
                    )}
                    {currentStep === 3 && (
                        <StepThree formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />
                    )}
                    {currentStep === 4 && (
                        <StepFour formData={formData} setFormData={setFormData} handleChange={handleChange} handleTextareaChange={handleTextareaChange} handleBack={handleBack} handleSubmit={handleSubmit} loading={loading} />
                    )}
                </>
            )}
            {error && (
                <div style={{ color: 'red' }}>
                    <p>{error}</p>
                </div>
            )}
            {itinerary && (
                <div className='travel-itinerary-div'>
                    <h2>Your {formData.destination} Travel Itinerary:</h2>
                    <pre>{itinerary}</pre>
                    <button className='new-itinerary-button' onClick={resetForm}>Generate Another Itinerary</button>
                </div>
            )}
        </div>
    );
};

export default GenerateItineraryForm;
