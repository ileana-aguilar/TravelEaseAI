import React, {useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";

import IconSearch from '../assets/IconSearch';
import ProfilePostCard from './ProfilePostCard.jsx';
import { supabase} from "../../supabaseClient.js";
import IconEllipse from '../assets/IconCircle.jsx';
import './Profile.css';
import IconFeed from '../assets/IconFeed.jsx';
import GenerateIcon from '../assets/GenerateIcon.jsx';
import TaggedIcon from '../assets/TaggedIcon.jsx';


const ProfilePosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [postCount, setPostCount] = useState(0);
    const { userId } = useParams(); // Get the userId from the URL
    const [loggedInUserId, setLoggedInUserId] = useState('');

    const getUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user !== null) {
                setLoggedInUserId(user.id);
            } else {
                setLoggedInUserId('');
            }
        } catch (e) {
            console.error('Error fetching user:', e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {
        const fetchPosts = async () => {
          if (!userId) return;
    
          const { data } = await supabase
            .from('Posts')
            .select()
            .eq('user_id', userId) // Filter posts by user_id
            .order('created_at', { ascending: isAscending });
    
          setPosts(data);
          setPostCount(data.length);
          console.log(data);
        };
        fetchPosts();
      }, [userId, isAscending]);

    // Filter posts based on search term
    const filteredPosts = posts ? posts.filter(post =>
        post.Title.toLowerCase().includes(searchTitle.toLowerCase())
    ) : [];

    return(
        <section>
            <div className="profile-header">
                <IconEllipse alt="User icon" className="user-icon"/>
                <div className="profile-user-info">
                    <div className="user-details">
                        <span id="username">@{userId}</span>
                        {loggedInUserId === userId && (
                            <button aria-labelledby="username">Edit profile</button>
                        )}
                    </div>
                    <div className="user-stats">
                        <span>{postCount} Posts</span>
                        <span>~ Followers</span>
                        <span>~ Following</span>
                    </div>
                </div>
            </div>
            
            <nav className="tabs-container ">
                <ul>
                    <li className="tab-link active-tab">
                        <Link to={`/Profile/Posts/${userId}`}>
                            <IconFeed size={17} stroke="black" fillColor="black" />
                            <span> Posts</span>
                        </Link>
                    </li>
                    <li className="tab-link ">
                        {/* <Link to={`/Profile/GeneratedTrips/`}> */}
                        {loggedInUserId === userId && (
                        <Link to={`/Profile/GeneratedTrips/${userId}`}> 
                            <GenerateIcon size={17} fillColor="var(--light-mid-gray)" />
                            <span>Generated Trips</span>
                        </Link>
                        )}
                    </li>
                    <li className="tab-link">
                        {/* <Link to={`/Profile/Tagged/`}> */}
                        <Link to={`/Profile/Tagged/${userId}`}>
                            <TaggedIcon size={17} fillColor="var(--light-mid-gray)" />
                            <span>Tagged</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
            {/* code to show all the posts a user has created */}
            <div className='profile-feed-card-grid'>
                {filteredPosts && filteredPosts.map(post => (
                    <ProfilePostCard className='profile-post-card' key={post.id} id={post.id} created_at={post.created_at}
                          Title={post.Title}
                          Description={post.Description} Photo={post.Photo} user_id={post.user_id}
                          CurrentLikeCount={post.LikeCount}/>
                ))}
            </div>
            </div>
            </section>
    )
}
export default ProfilePosts;