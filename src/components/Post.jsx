import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Post.css';
import IconCircle from '../assets/IconCircle';
import IconHeart from '../assets/IconHeart';
import { supabase } from "../../supabaseClient.js";
import { formatDistanceToNow } from 'date-fns';

const Post = ({ id, created_at, Title, Description, Photo, user_id, CurrentLikeCount }) => {
    console.log(id, created_at, Title, Description, Photo, user_id, CurrentLikeCount);
    const [media, setMedia] = useState([]);
    const [LikeCount, setLikeCount] = useState(CurrentLikeCount);

    useEffect(() => {
        async function getMedia() {
            const url = `https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${user_id}/${Photo}`;
            setMedia({ name: Photo, url: url });
        }
        getMedia();
    }, [Photo, user_id]);

    const timeAgo = formatDistanceToNow(new Date(created_at)).replace('about ', '') + ' ago';

    const updateLikeCount = async (event) => {
        event.preventDefault();
        setLikeCount(LikeCount + 1);
        await supabase
            .from('Posts')
            .update({ LikeCount: LikeCount + 1 })
            .eq('id', id);
    }

    return (
        <div className='link-container'>
            
                <article className='feed-card-container'>
                <Link to={`/Feed/PostDetail/${id}`}>
                    <div className='feed-card-pic'>
                        <img src={media.url} alt={Photo} />
                        <div className='overlay2'></div>
                    </div>
                    <time className='feed-post-time' dateTime={created_at}>{timeAgo}</time>
                    <h3 className='feed-post-title'>{Title}</h3>
                    </Link>
                    <div className='feed-post-info'>
                        <Link to={'/Profile/Posts/' + user_id}>
                        <span className='feed-user-info'>
                            <IconCircle size={40} aria-label="User profile" />{"@" + user_id}
                        </span>
                        </Link>
                        <button className='like-button' onClick={updateLikeCount} aria-label="200 likes, press to like">
                            <IconHeart />{LikeCount} Likes
                        </button>
                    </div>
                </article>
            
        </div>
    );
};

export default Post;
