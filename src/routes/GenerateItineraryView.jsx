import React from 'react';
import Navbar from '../components/Navbar';
import NewPost from '../components/NewPost';
import '../index.css';
import GenerateItineraryForm from '../components/GenerateItineraryForm';

function GenerateItineraryView(){
    return(
        <div className="app-container">
        <div className="sidebar">
            <Navbar/>
        </div>
        <div className="form-main-content">
            <GenerateItineraryForm/>
        </div>
        </div>
    )
}
export default GenerateItineraryView;