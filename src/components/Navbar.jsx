import React, {useEffect, useState} from 'react';
import IconCircle from '../assets/IconCircle';
import VerticalLine from '../assets/VerticalLine';
import IconFeed from '../assets/IconFeed';
import IconSearch from '../assets/IconSearch';
import IconSettings from '../assets/IconSettings';
import HorizontalLine from '../assets/HorizontalLine';
import IconLogout from '../assets/IconLogout';
import { Outlet, Link } from "react-router-dom";
import './Navbar.css';
import { supabase } from '../../supabaseClient';
import PropTypes from 'prop-types';

const Navbar = () => {
    const [userId, setUserId] = useState('');
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
    const signout = async () => {

        await supabase.auth.signOut();
        window.location = "/";
    }

    useEffect(() => {
        getUser();
    }, [userId]);

    return (

        
        <div className='navbar-menu'>
                <Link to="/Feed">
                <img className="logo" src='src/assets/IMG_5079.png' width='300px'alt="Travel Ease Logo"/>
                </Link>
            <div className='user-info'>
                <IconCircle size={100}/>
                <div>User</div>
                <div className='user-handle'>@{userId}</div>
            </div>    
            <ul className='user-stats'>
                <li className='user-stats-item'>
                    <span>~</span> <span >Posts</span>
                </li>
                <li><VerticalLine height={60} stroke="var(--dark-gray)"/></li>

                <li className='user-stats-item'>
                    <span>~</span><span>Followers</span>
                   
                </li>

                <li><VerticalLine height={60} stroke="var(--dark-gray)"/></li>

                <li className='user-stats-item'>
                    <span>~</span> <span>Following</span>
                </li>
            </ul>
            
          <ul className='menu-guide'>
            <li className="menu-item" key="home-button">
                <Link to="/Feed">
                    <IconFeed/>
                    <span>Feed</span>
                </Link>
            </li>
            <li className="menu-item" >
                <IconSearch/>
                <span>Explore</span>
                
            </li>
            <li className="menu-item" >
                <IconSettings/>
                <span>Settings</span>
            </li>
            <li className="menu-item">
                <div className="horizontal-line-container">
                    <HorizontalLine width={250}/>
                </div>
            </li>
            <li className="menu-item" onClick={signout}>
                <IconLogout/>
                <span>Logout</span>
            </li>
          </ul>
        <Outlet/>
      </div>
    );
  };
Navbar.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default Navbar;