import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient.js";
import IconCircle from "../assets/IconCircle.jsx";
import {formatDistanceToNow} from "date-fns";
import './Comment.css';

const Comment = ({comment_text, user_id, created_at}) => {

    let timeAgo = '';
    if (created_at) {
        const date = new Date(created_at);
        if (!isNaN(date)) {
            timeAgo =  formatDistanceToNow(date).replace('about ', '') + ' ago';
        }
    }
    return (
        <div className='comment-container'>
            <div className='comment-info'>
                <span className='comment-user' >  <IconCircle size={40} aria-label="User profile"/>@{user_id}</span>
                <time dateTime={created_at}>{timeAgo}</time>
            </div>
            <div className='comment-text'>
                <p>{comment_text}</p>
            </div>
        </div>
    )
}

export default Comment;