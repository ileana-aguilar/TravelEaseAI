import React from 'react';
import Navbar from '../components/Navbar';
import ProfilePosts from '../components/ProfilePosts';
import '../index.css';

function ProfilePostView(){
    return(
        <div className="app-container">
        <div className="sidebar">
            <Navbar />
        </div>
        <div className="main-content">
            <ProfilePosts/>
        </div>
        </div>
    )
}
export default ProfilePostView;