import React, {useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import './Feed.css';
import IconSearch from '../assets/IconSearch';
import Post from './Post.jsx';
import { supabase} from "../../supabaseClient.js";

const Feed = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [isAscending, setIsAscending] = useState(true);

    useEffect(() => {
        
        setPosts(props.data);
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: isAscending })

            // set state of posts
            setPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, [props, isAscending]);

    // Filter posts based on search term
    const filteredPosts = posts ? posts.filter(post =>
        post.Title.toLowerCase().includes(searchTitle.toLowerCase())
    ) : [];

    return (

        
        <div className='feed-container'>
            <div className='feed-header'>
                <div className="input-wrapper">
                    <IconSearch/>
                    <input type="text" placeholder="Search" className="search-input"
                        onChange={event => setSearchTitle(event.target.value)}
                    />
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
                <button className='sort-button' onClick={() => setIsAscending(!isAscending)}>Sort
                    {isAscending ? (
                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.754 14.4766L10.8477 21.5078C10.7555 21.6175 10.6304 21.6792 10.4999 21.6792C10.3695 21.6792 10.2444 21.6175 10.1521 21.5078L4.24587 14.4766C4.15893 14.3655 4.1116 14.2186 4.11385 14.0668C4.1161 13.915 4.16775 13.7701 4.25793 13.6628C4.34811 13.5554 4.46976 13.4939 4.59727 13.4913C4.72478 13.4886 4.84819 13.5449 4.94149 13.6484L10.0077 19.6787V3.90625C10.0077 3.75085 10.0596 3.60181 10.1519 3.49193C10.2442 3.38204 10.3694 3.32031 10.4999 3.32031C10.6305 3.32031 10.7557 3.38204 10.848 3.49193C10.9403 3.60181 10.9921 3.75085 10.9921 3.90625V19.6787L16.0584 13.6484C16.1517 13.5449 16.2751 13.4886 16.4026 13.4913C16.5301 13.4939 16.6518 13.5554 16.7419 13.6628C16.8321 13.7701 16.8838 13.915 16.886 14.0668C16.8883 14.2186 16.8409 14.3655 16.754 14.4766Z"
                            fill="#213547"/>
                    </svg>
                    ) : (
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.3497 9.98941C18.2486 10.086 18.1116 10.1402 17.9687 10.1402C17.8259 10.1402 17.6889 10.086 17.5878 9.98941L12.039 4.68277V18.5625C12.039 18.6993 11.9823 18.8304 11.8812 18.9271C11.7801 19.0238 11.6429 19.0782 11.5 19.0782C11.357 19.0782 11.2199 19.0238 11.1188 18.9271C11.0177 18.8304 10.9609 18.6993 10.9609 18.5625V4.68277L5.41217 9.98941C5.30998 10.0805 5.17482 10.1301 5.03517 10.1277C4.89551 10.1254 4.76227 10.0712 4.6635 9.97677C4.56474 9.8823 4.50816 9.75485 4.5057 9.62127C4.50324 9.48769 4.55507 9.35841 4.65029 9.26066L11.119 3.07316C11.2201 2.9766 11.3571 2.92236 11.5 2.92236C11.6428 2.92236 11.7798 2.9766 11.8809 3.07316L18.3497 9.26066C18.4506 9.35734 18.5073 9.48839 18.5073 9.62503C18.5073 9.76168 18.4506 9.89273 18.3497 9.98941Z"
                            fill="#213547"/>
                    </svg>
                    )}
                </button>
            </div>
            <div className='feed-card-grid'>
                {filteredPosts && filteredPosts.map(post => (
                    <Post className='post-card' key={post.id} id={post.id} created_at={post.created_at}
                          Title={post.Title}
                          Description={post.Description} Photo={post.Photo} user_id={post.user_id}
                          CurrentLikeCount={post.LikeCount}/>
                ))}
            </div>


            <Outlet/>
        </div>
    );
};
export default Feed;