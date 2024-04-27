import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {supabase} from "../../supabaseClient.js";
import IconCircle from "../assets/IconCircle.jsx";
import IconHeart from "../assets/IconHeart.jsx";
import './Post.css';
import './PostDetail.css';
import { formatDistanceToNow } from 'date-fns';
import Post from "./Post.jsx";
import Comment from "./Comment.jsx";
import {Link} from "react-router-dom";


const PostDetail = ({data}) => {
    const { id } = useParams();
    console.log(id);
    const[post, setPost] = useState({id: null, created_at: "", Title:"", Description:"", Photo:"", user_id:"", LikeCount:""});
    const [media, setMedia] = useState([]);
    const [LikeCount, setLikeCount] = useState(0);
    const [newComment, setNewComment] = useState({comment_text: "", user_id: "", post_id: ""});
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(null);

    //get user id currently logged in
    const getUser = async () => {

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user !== null) {
                setUserId(user.id);
            } else {
                setUserId('');
            }
        } catch (e) {
        }
    }

    //fetch post info from Posts table
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
        };

        fetchPost();
    }, [id]);

    //display post image
    useEffect(() => {
        async function getMedia() {
            const { data, error } = await supabase
                .storage
                .from('ImageUpload')
                .download(post.user_id + "/" + post.Photo);

            if (error) {
                console.error('Error downloading image: ', error);
            } else {
                const url = URL.createObjectURL(data);
                setMedia({name: post.Photo, url: url});
            }
        }

        getMedia();
    }, [post.Photo, post.user_id]); // dependencies updated


    //fetch comments from Comments table
    useEffect(() => {
        const fetchComments = async () => {
            if (post.id) { // Check if post.id is not null
                let { data: comments, error } = await supabase
                    .from('Comments')
                    .select('*')
                    .eq('post_id', post.id);

                if (error) console.log('Error fetching comments: ', error);
                else setComments(comments);
            }
        };

        fetchComments();
    }, [post.id]); // re-run the effect when 'post.id' changes
    // ...



    //update LikeCount in Posts table
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

    //display time since post was created
    let timeAgo = '';
    if (post.created_at) {
        const date = new Date(post.created_at);
        if (!isNaN(date)) {
            timeAgo = 'posted ' + formatDistanceToNow(date).replace('about ', '') + ' ago';
        }
    }

    //insert newComment info into Comments table

    useEffect(() => {
        getUser();
    }, [userId]);

    const handleChange = event => {
        const {name, value} = event.target;
        setNewComment(prev => ({
            ...prev,
            [name]: value,
            user_id: userId,
            post_id: id
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Comments')
            .insert([newComment]);

        if (error) {
            console.error("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", data);
            setNewComment(prev => ({...prev, comment_text: ""})); // Clear the input field
            window.location.reload() // Redirect on success
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase.storage
            .from('ImageUpload')
            .remove(media.url);

        await supabase
            .from('Comments')
            .delete()
            .eq('post_id', post.id);

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = "/Feed";
    };






    return (
        <article className="post-detail-container">
            <div className="post-detail-header">
                <span className='feed-user-info'><IconCircle size={40}
                                                             aria-label="User profile"/>{"@" + post.user_id}</span>
                {userId === post.user_id && (
                <div className="mange-post-buttons">
                    <Link to={`/Feed/PostDetail/${post.id}/Update`}>
                        <button className='edit-button' > Edit </button>
                    </Link>
                    <button className='delete-button' onClick={deletePost} > Delete </button>
                </div>
                )}
            </div>
            <div className='post-detail-pic'>
                <img src={media.url} alt={post.Photo}/>
            </div>
            <div className='post-detail-counts'>
                <button className='like-button' onClick={updateLikeCount} aria-label="200 likes, press to like">
                    <IconHeart/>{post.LikeCount}
                </button>
                <button className='new-comment-button'>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.0282 7H5.02819C4.76297 7 4.50862 7.10536 4.32108 7.29289C4.13354 7.48043 4.02819 7.73478 4.02819 8C4.02819 8.26522 4.13354 8.51957 4.32108 8.70711C4.50862 8.89464 4.76297 9 5.02819 9H15.0282C15.2934 9 15.5478 8.89464 15.7353 8.70711C15.9228 8.51957 16.0282 8.26522 16.0282 8C16.0282 7.73478 15.9228 7.48043 15.7353 7.29289C15.5478 7.10536 15.2934 7 15.0282 7ZM11.0282 11H5.02819C4.76297 11 4.50862 11.1054 4.32108 11.2929C4.13354 11.4804 4.02819 11.7348 4.02819 12C4.02819 12.2652 4.13354 12.5196 4.32108 12.7071C4.50862 12.8946 4.76297 13 5.02819 13H11.0282C11.2934 13 11.5478 12.8946 11.7353 12.7071C11.9228 12.5196 12.0282 12.2652 12.0282 12C12.0282 11.7348 11.9228 11.4804 11.7353 11.2929C11.5478 11.1054 11.2934 11 11.0282 11ZM10.0282 0C8.71497 0 7.41461 0.258658 6.20135 0.761205C4.9881 1.26375 3.8857 2.00035 2.95712 2.92893C1.08175 4.8043 0.0281864 7.34784 0.0281864 10C0.0194442 12.3091 0.818979 14.5485 2.28819 16.33L0.288186 18.33C0.149429 18.4706 0.0554325 18.6492 0.0180584 18.8432C-0.0193158 19.0372 0.0016069 19.2379 0.0781863 19.42C0.161244 19.5999 0.29589 19.7511 0.465033 19.8544C0.634176 19.9577 0.830187 20.0083 1.02819 20H10.0282C12.6804 20 15.2239 18.9464 17.0993 17.0711C18.9746 15.1957 20.0282 12.6522 20.0282 10C20.0282 7.34784 18.9746 4.8043 17.0993 2.92893C15.2239 1.05357 12.6804 0 10.0282 0ZM10.0282 18H3.43819L4.36819 17.07C4.55444 16.8826 4.65898 16.6292 4.65898 16.365C4.65898 16.1008 4.55444 15.8474 4.36819 15.66C3.05877 14.352 2.24336 12.6305 2.06088 10.7888C1.87839 8.94705 2.34013 7.09901 3.36741 5.55952C4.3947 4.02004 5.92398 2.88436 7.6947 2.34597C9.46543 1.80759 11.368 1.8998 13.0784 2.60691C14.7888 3.31402 16.201 4.59227 17.0746 6.22389C17.9482 7.85551 18.2291 9.73954 17.8693 11.555C17.5096 13.3705 16.5315 15.005 15.1017 16.1802C13.672 17.3554 11.8789 17.9985 10.0282 18Z"
                            fill="black"/>
                    </svg>
                </button>
            </div>
            <div className='post-detail-info'>
                <h1>{post.Title}</h1>
                <p>{post.Description}</p>
                <time dateTime={post.created_at}>{timeAgo}</time>

            </div>
            <div className='post-detail-comments'>
                <h2>comments</h2>
                <form className="comment-form" onSubmit={handleSubmit}>
                    <input className="comment-input" type='text' name='comment_text' placeholder='Add a comment' value={newComment.comment_text} onChange={handleChange} id="comment_text"/>
                    <button className='post-comment-button' type="submit"> <svg width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.6849 9.98324L8.91807 2.76244C8.88471 2.74342 8.84462 2.7316 8.8024 2.72834C8.76018 2.72508 8.71755 2.7305 8.6794 2.744C8.64124 2.75749 8.60912 2.7785 8.58672 2.80462C8.56431 2.83073 8.55254 2.86089 8.55274 2.89164V4.47689C8.55274 4.57738 8.61787 4.67377 8.72549 4.73529L18.9208 10.5L8.72549 16.2648C8.61504 16.3263 8.55274 16.4227 8.55274 16.5232V18.1084C8.55274 18.2458 8.7708 18.3217 8.91807 18.2376L21.6849 11.0168C21.7934 10.9555 21.8812 10.8771 21.9415 10.7876C22.0019 10.698 22.0333 10.5997 22.0333 10.5C22.0333 10.4004 22.0019 10.302 21.9415 10.2125C21.8812 10.1229 21.7934 10.0445 21.6849 9.98324Z" fill="#213547"/>
</svg>
 </button>
                </form>
                {comments && comments.map(comment => (
                    <Comment key={comment.id} comment_id={comment.id} comment_text={comment.comment_text} created_at={comment.created_at} user_id={comment.user_id} post_id={comment.post_id}/>
                ))}
            </div>


        </article>

    );
};
export default PostDetail;