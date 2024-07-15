import React, {useEffect, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import './Feed.css';
import IconSearch from '../assets/IconSearch';
import Post from './Post';
import { supabase} from "../../supabaseClient.js";
import IconEllipse from '../assets/IconCircle.jsx';
import HorizontalLine from '../assets/HorizontalLine.jsx';
import DarkHorizontalLine from '../assets/DarkHorizontalLine.jsx';
import './Profile.css';
import IconFeed from '../assets/IconFeed.jsx';
import GenerateIcon from '../assets/GenerateIcon.jsx';
import TaggedIcon from '../assets/TaggedIcon.jsx';

const ProfileGeneratedTrips = (props) => {
    const [posts, setPosts] = useState([]);

    return(
        <section>
            <div className="profile-header">
                <IconEllipse alt="User icon" className="user-icon"/>
                <div className="user-info">
                    <div className="user-details">
                        <span id="username">User</span>
                        <button aria-labelledby="username">Edit profile</button>
                    </div>
                    <div className="user-stats">
                        <span>~ Posts</span>
                        <span>~ Followers</span>
                        <span>~ Following</span>
                    </div>
                </div>
            </div>
            
            <nav className="tabs-container ">
                <ul>
                    <li className="tab-link active-tab">
                        <Link to={`/Profile/Posts/`}>
                            <IconFeed size={17} />
                            <span>Posts</span>
                        </Link>
                    </li>
                    <li className="tab-link ">
                        <Link to={`/Profile/GeneratedTrips/`}>  
                            <GenerateIcon size={17}/>
                            <span>Generated Trips</span>
                        </Link>
                    </li>
                    <li className="tab-link">
                        <Link to={`/Profile/Tagged/`}> 
                            <TaggedIcon size={17}/>
                            <span>Tagged</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            </section>
    )
}
export default ProfileGeneratedTrips;