import React from 'react';
import Navbar from '../components/Navbar';
import NewPost from '../components/NewPost';
import '../index.css';

function NewPostView(){
    return(
        <div className="app-container">
        <div className="sidebar">
            <Navbar />
        </div>
        <div className="main-content">
            <NewPost/>
        </div>
        </div>
    )
}
export default NewPostView;