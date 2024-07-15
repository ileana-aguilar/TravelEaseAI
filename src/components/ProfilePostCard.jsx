import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './ProfilePostCard.css';
import IconHeart from '../assets/IconHeart';
import { supabase } from "../../supabaseClient.js";
import { formatDistanceToNow } from 'date-fns';
import IconComment from '../assets/IconComment.jsx';

const ProfilePostCard = ({ id, created_at, Title, Description, Photo, user_id, CurrentLikeCount }) => {
    console.log(id, created_at, Title, Description, Photo, user_id);
    const [media, setMedia] = useState([]);
    // Initialize LikeCount with CurrentLikeCount
    const [LikeCount, setLikeCount] = useState(CurrentLikeCount);
    const [commentsCount, setCommentsCount] = useState(0);

    const fetchComments = async () => {
        if (id) { // Check if id is not null
            let { data: comments, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id);

            if (error) console.log('Error fetching comments: ', error);
            else setCommentsCount(comments.length);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    useEffect(() => {
        async function getMedia() {
            const url = `https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${user_id}/${Photo}`;
            setMedia({name: Photo, url: url});   
        }

        getMedia();
    }, [Photo, user_id]); // Add Photo and user_id as dependencies

    const timeAgo = formatDistanceToNow(new Date(created_at)).replace('about ', '') + ' ago';

    

    return (
        <Link to={`/Feed/PostDetail/${id}`}>
            <article className='profile-feed-card-container'>
                <div className='profile-feed-card-pic'>
                    <img src={`https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${user_id}/${Photo}`} alt={Photo} />
                </div>
                <div className='overlay'>
                    <div className='post-interaction'>
                        <IconHeart size={18} fillColor="var(--white)" />
                        <span>{LikeCount}</span>
                    </div>
                    <div className='post-interaction'>
                        <IconComment size={18} fillColor="var(--white)" />
                        <span>{commentsCount}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProfilePostCard;
