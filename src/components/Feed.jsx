import React, {useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import './Feed.css';
import IconSearch from '../assets/IconSearch';
import Post from './Post';
import { supabase} from "../../supabaseClient.js";

const Feed = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        setPosts(props.data);
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })

            // set state of posts
            setPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, [props]);

    return (

        
        <div className='feed-container'>
            <div className='feed-header'>
            <div className="input-wrapper">
                <IconSearch/>
                <input type="text" placeholder="Search" className="search-input"></input>
                </div>
            <Link to="/NewPost">
            <button className='new-post-button'>
                <span>Create a Post</span> 
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 14V25.5C18 25.8283 17.9515 26.1534 17.8573 26.4567C17.763 26.76 17.6249 27.0356 17.4508 27.2678C17.2767 27.4999 17.07 27.6841 16.8425 27.8097C16.615 27.9353 16.3712 28 16.125 28H4.875C4.37772 28 3.90081 27.7366 3.54917 27.2678C3.19754 26.7989 3 26.163 3 25.5V10.5C3 9.83696 3.19754 9.20107 3.54917 8.73223C3.90081 8.26339 4.37772 8 4.875 8H12.7256" stroke="#FAF4F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.5597 3.32811C21.4912 3.22776 21.4082 3.14697 21.3156 3.09062C21.2231 3.03427 21.1229 3.00353 21.0211 3.00026C20.9194 2.99699 20.8182 3.02125 20.7237 3.07159C20.6292 3.12192 20.5434 3.19728 20.4713 3.29311L19.8915 4.06249C19.8212 4.15625 19.7817 4.28337 19.7817 4.41593C19.7817 4.54848 19.8212 4.6756 19.8915 4.76936L20.423 5.47686C20.4579 5.52354 20.4993 5.56058 20.5449 5.58585C20.5905 5.61112 20.6394 5.62413 20.6888 5.62413C20.7382 5.62413 20.7871 5.61112 20.8327 5.58585C20.8783 5.56058 20.9197 5.52354 20.9546 5.47686L21.5199 4.72686C21.8058 4.34624 21.8326 3.72624 21.5597 3.32811ZM18.7191 5.62499L10.2572 16.8875C10.2059 16.9556 10.1686 17.0402 10.149 17.1331L9.75756 18.6875C9.74818 18.7297 9.74752 18.7744 9.75564 18.8171C9.76375 18.8597 9.78035 18.8986 9.80368 18.9297C9.82701 18.9608 9.85621 18.983 9.88818 18.9938C9.92016 19.0046 9.95374 19.0037 9.98537 18.9912L11.1502 18.4694C11.2199 18.4431 11.2833 18.3934 11.3344 18.325L19.7813 7.04124C19.8595 6.93593 19.9033 6.79376 19.9033 6.64561C19.9033 6.49747 19.8595 6.3553 19.7813 6.24999L19.3149 5.62499C19.2358 5.51984 19.1287 5.46079 19.017 5.46079C18.9053 5.46079 18.7982 5.51984 18.7191 5.62499Z" fill="#FAF4F3"/>
                </svg>
            </button>
            </Link>
            </div>
            <div className='feed-heading'>
                <h1>Feed</h1>
                <button className='sort-button'>Sort</button>
            </div>
            <div className='feed-card-grid'>
                {posts && posts.map(post => (
                    <Post className='post-card' key={post.id} id={post.id} created_at={post.created_at} Title={post.Title}
                          Description={post.Description} Photo={post.Photo} user_id={post.user_id} CurrentLikeCount={post.LikeCount}/>
                ))}
            </div>


            <Outlet/>
        </div>
    );
};
export default Feed;