import React from 'react';
import Navbar from '../components/Navbar';
import UpdatePost from '../components/UpdatePost';
import '../index.css';

function UpdatePostView(){
    return(
        <div className="app-container">
        <div className="sidebar">
            <Navbar />
        </div>
        <div className="main-content">
            <UpdatePost/>
        </div>
        </div>
    )
}
export default UpdatePostView;