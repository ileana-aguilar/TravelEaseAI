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
import IconComment from "../assets/IconComment.jsx";


const PostDetail = ({data}) => {
    const { id } = useParams();
    console.log(id);
    const[post, setPost] = useState({id: null, created_at: "", Title:"", Description:"", Photo:"", user_id:"", LikeCount:""});
    const [media, setMedia] = useState([]);
    const [LikeCount, setLikeCount] = useState(0);
    const [newComment, setNewComment] = useState({comment_text: "", user_id: "", post_id: ""});
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(null);
    const commentCount = comments.length;

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
            
            const url = `https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${post.user_id}/${post.Photo}`;
            console.log(post.Photo);
            setMedia({ name: post.Photo, url: url});
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
        <div className="post-detail-div">
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
                <img src={`https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${post.user_id}/${post.Photo}`} alt={post.Photo}/>
            </div>
            <div className='post-detail-counts'>
                <button className='like-button' onClick={updateLikeCount} aria-label="200 likes, press to like">
                    <IconHeart/>{post.LikeCount}
                </button>
                <button className='new-comment-button'>
                <IconComment/>
                    <span className="comment-count">{commentCount}</span>
                </button>
            </div>
            <div className='post-detail-info'>
                <h1>{post.Title}</h1>
                <p style={{ whiteSpace: 'pre-wrap' }} >{post.Description}</p>
                <time dateTime={post.created_at}>{timeAgo}</time>

            </div>
            <div className='post-detail-comments'>
                <h2>{commentCount} comments</h2>
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
        </div>

    );
};
export default PostDetail;