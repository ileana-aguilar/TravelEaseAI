import React from 'react';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import '../index.css';


function FeedView(){
    return(
        <div className="app-container">
            <div className="sidebar">
                <Navbar/>
            </div>
            <div className="main-content">
                <Feed/>
            </div>
        </div>
    )
}
export default FeedView;