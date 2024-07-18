import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import IconCircle from "../assets/IconCircle.jsx";
import { formatDistanceToNow } from "date-fns";
import './Comment.css';
import { Link } from "react-router-dom";
import IconMoreInfo from "../assets/IconMoreInfo.jsx";
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment_id, comment_text, user_id, created_at, post_id, updateCommentCount }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setLoggedInUserId(user.id);
                }
            } catch (e) {
                console.error("Error fetching user:", e);
            }
        };
        getUser();
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let timeAgo = '';
    if (created_at) {
        const date = new Date(created_at);
        if (!isNaN(date)) {
            timeAgo = formatDistanceToNow(date).replace('about ', '') + ' ago';
        }
    }

    const handleMoreInfoClick = () => {
        setShowMoreOptions(!showMoreOptions);
    };

    const handleDelete = async () => {
        await supabase
            .from('Comments')
            .delete()
            .eq('id', comment_id);
        console.log('Delete button clicked');
        updateCommentCount(); // Update the comment count
            
    };

    const handleReport = () => {
        // Implement report functionality here
        console.log('Report button clicked');
    };

    const fillColor = windowWidth >= 1024 ? (isHovered ? "#213547" : "var(--white)") : "#213547";
console.log(windowWidth)
    console.log(fillColor)
    return (
        <div className='comment-container' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className='comment-info'>
                <Link to={'/Profile/Posts/' + user_id}>
                    <span className='comment-user'><IconCircle size={40} aria-label="User profile" />@{user_id}</span>
                </Link>
                <time dateTime={created_at}>{timeAgo}</time>
                <button type="button" className="more-info" onClick={handleMoreInfoClick}>
                    <IconMoreInfo size={20} fillColor={fillColor} />
                </button>
                {showMoreOptions && (
                    loggedInUserId === user_id ? (
                        <Link to={`/Feed/PostDetail/${post_id}`}>
                            <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
                        </Link>
                    ) : (

                            <button type="button" className="report-button" onClick={handleReport}>Report</button>
                    )
                )}
            </div>
            <div className='comment-text'>
                <p>{comment_text}</p>
            </div>
        </div>
    );
}

export default Comment;
