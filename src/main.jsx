import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.jsx'
import NewPostView from './routes/NewPostView.jsx';
import FeedView from './routes/FeedView.jsx';
import './index.css'
import PostDetailView from './routes/PostDetailView.jsx';
import UpdatePostView from './routes/UpdatePostView.jsx';
import ProfilePostView from './routes/ProfilePostView.jsx';
import GenerateItineraryView from './routes/GenerateItineraryView.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
        <Route path="/Feed" element={<FeedView />} />
        <Route path="/NewPost" element={<NewPostView />} />
        <Route path="/Feed/PostDetail/:id" element={<PostDetailView />} />
        <Route path={"/Feed/PostDetail/:id/Update"} element={<UpdatePostView />} />
        <Route path={"/Profile/Posts/:userId"} element={<ProfilePostView />} />
        <Route path="/Profile/GeneratedTrips/:userId" element={<ProfilePostView />} />
        <Route path="/Profile/Tagged/:userId" element={<ProfilePostView />} />
        <Route path="/GenerateItinerary" element={<GenerateItineraryView />} />
    </Routes>

    </BrowserRouter>
  </React.StrictMode>
)
