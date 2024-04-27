import React from 'react';
import Navbar from '../components/Navbar';
import PostDetail from '../components/PostDetail';
import '../index.css';

function PostDetailView(){
    return(
        <div className="app-container">
        <div className="sidebar">
            <Navbar />
        </div>
        <div className="main-content">
            <PostDetail/>
        </div>
        </div>
    )
}
export default PostDetailView;