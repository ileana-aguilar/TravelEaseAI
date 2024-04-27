import React, {useState, useEffect} from 'react';
import {  Link } from "react-router-dom";
import './Post.css';
import IconCircle from '../assets/IconCircle';
import IconHeart from '../assets/IconHeart';
import {supabase} from "../../supabaseClient.js";
import { formatDistanceToNow } from 'date-fns';
const Post = ({id, created_at, Title, Description, Photo, user_id, CurrentLikeCount}) => {
    console.log(id, created_at, Title, Description, Photo, user_id);
    const [media, setMedia] = useState([]);
    // Initialize LikeCount with CurrentLikeCount
    const [LikeCount, setLikeCount] = useState(CurrentLikeCount);

    useEffect(() => {
        async function getMedia() {
            const { data, error } = await supabase
                .storage
                .from('ImageUpload')
                .download(user_id + "/" + Photo);

            if (error) {
                console.error('Error downloading image: ', error);
            } else {
                const url = URL.createObjectURL(data);
                setMedia({name: Photo, url: url});
            }
        }

        getMedia();
    }, [Photo, user_id]); // dependencies updated

    const timeAgo = formatDistanceToNow(new Date(created_at)).replace('about ', '') + ' ago';

    const updateLikeCount = async (event) => {
        event.preventDefault();

        // Increment LikeCount in the component's state
        setLikeCount(LikeCount + 1);

        // Update LikeCount in the database
        await supabase
            .from('Posts')
            .update({ LikeCount: LikeCount + 1})
            .eq('id', id);
    }

    return (
        <Link to={`/Feed/PostDetail/${id}`}>
            <article className='feed-card-container'>
                <div className='feed-card-pic'>
                    <img src={media.url} alt={Photo}/>
                </div>
                <time className='feed-post-time' dateTime={created_at}>{timeAgo}</time>
                <h3 className='feed-post-title'>{Title}</h3>
                <div className='feed-post-info'>
                    <span className='feed-user-info'><IconCircle size={40} aria-label="User profile"/>{"@" + user_id}</span>
                    <button className='like-button' onClick={updateLikeCount} aria-label="200 likes, press to like">
                        <IconHeart/>{LikeCount} Likes
                    </button>
                </div>

            </article>
        </Link>
    );
};

export default Post;