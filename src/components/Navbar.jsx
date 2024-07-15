import React, {useEffect, useState} from 'react';
import IconCircle from '../assets/IconCircle';
import VerticalLine from '../assets/VerticalLine';
import IconFeed from '../assets/IconFeed';
import HorizontalLine from '../assets/HorizontalLine';
import IconLogout from '../assets/IconLogout';
import { Outlet, Link } from "react-router-dom";
import './Navbar.css';
import { supabase } from '../../supabaseClient';
import logo from '../assets/IMG_5079.png'; 
import GenerateIcon from '../assets/GenerateIcon';


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
                <img className="logo" src={logo} width='300px' alt="Travel Ease Logo"/>
                </Link>
            <div className='user-info'>
                <div className='user-handle'>@{userId}</div>
            </div>  
           {/* 
            <ul className='user-stats'>
                <li className='user-stats-item'>
                    <span>~</span> <span >Posts</span>
                </li>
                <li><VerticalLine height={50} stroke="var(--dark-gray)"/></li>

                <li className='user-stats-item'>
                    <span>~</span><span>Followers</span>
                   
                </li>

                <li><VerticalLine height={50} stroke="var(--dark-gray)"/></li>

                <li className='user-stats-item'>
                    <span>~</span> <span>Following</span>
                </li>
            </ul>
            */}
            
          <ul className='menu-guide'>
          <li className="menu-item" >
                <Link to="/GenerateItinerary">
                    <GenerateIcon size={20}/>
                    <span>Generate an Itinerary</span>
                </Link>
            </li>
            <li className="menu-item" key="home-button">
                <Link to="/Feed">
                    <IconFeed size={26}/>
                    <span>Feed</span>
                </Link>
            </li>
            {/* <li className="menu-item" >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 17.5L14 14L17.5 6.5L10 10L6.5 17.5ZM12 13C11.7167 13 11.4793 12.904 11.288 12.712C11.0967 12.52 11.0007 12.2827 11 12C10.9993 11.7173 11.0953 11.48 11.288 11.288C11.4807 11.096 11.718 11 12 11C12.282 11 12.5197 11.096 12.713 11.288C12.9063 11.48 13.002 11.7173 13 12C12.998 12.2827 12.902 12.5203 12.712 12.713C12.522 12.9057 12.2847 13.0013 12 13ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#213547"/>
                </svg>
                <span>Explore</span> 
            </li>
            */}
            <li className="menu-item" >
                <Link to={`/Profile/Posts/${userId}`}>
                    <IconCircle size={25}/>
                    <span>Profile</span> 
                </Link>
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

export default Navbar;