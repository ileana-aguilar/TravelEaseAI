import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './NewPost.css';
import HorizontalLine from '../assets/HorizontalLine';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const[currentPost, setCurrentPost] = useState({id: null, created_at: "", Title:"", Description:"", Photo:"", user_id:"", LikeCount:""});
    const [media, setMedia] = useState([]);
    const randFileName = uuidv4();

    const[post, setPost] = useState({Photo: "", Title:"", Description:"", user_id: ""});
    
    
    // Fetch post info from Posts table for Photo
    useEffect(() => {
        const fetchCurrentPost = async () => {
            const { data:currentPost, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setCurrentPost(currentPost);
                if (currentPost.Photo) {
                    console.log("Data inserted successfully: ", currentPost.Photo);
                    getCurrentMedia(currentPost.user_id, currentPost.Photo);
                }
            }
        };
        fetchCurrentPost();
    }, [id]);

    async function getCurrentMedia(user, photo) {
        const url = `https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${user}/${photo}` ;
        setMedia({name: photo, url: url});
    }

    console.log(currentPost.user_id);
    console.log(currentPost.Photo);
    console.log(media.url);

    async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await supabase
            .storage
            .from('ImageUpload')
            .upload(currentPost.user_id + "/" + randFileName, file);

        if (error) {
            console.error("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", data);
            console.log(data.path);
            const photo = data.path.split('/').pop(); // Extract the file name from the path
            setCurrentPost(prev => ({ ...prev, Photo: photo }));
            getNewMedia(data.path);
        }
    }

    console.log(currentPost.user_id);
    console.log(currentPost.Photo);
    console.log(media.name);
    console.log(media.url);
    
    async function getNewMedia(path) {
        const photo = path.split('/').pop(); // Extract the file name from the path
        const url = `https://jqjcbpvjwgmwszxiljrv.supabase.co/storage/v1/object/public/ImageUpload/${path}`;
        setMedia({name: photo, url: url});
    }
    
    const handleChange = event => {
        const {name, value} = event.target;
        setCurrentPost(prev => ({
            ...prev,
            [name]: value,
            user_id: currentPost.user_id,
            Photo: name === 'Photo' ? media.name : prev.Photo
        }));
    };

    async function updateSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const { data, error } = await supabase
            .from('Posts')
            .update({
                Title: currentPost.Title,
                Description: currentPost.Description,
                Photo: currentPost.Photo
            })
            .match({ id: id });  // Make sure `id` is correctly sourced from your component's state or props

        if (error) {
            console.error('Error updating post:', error);
        } else {
            console.log('Post updated:', data);
            window.location = "/Feed"; // Redirect after successful update
        }
    }

    const deletePhoto = async (event) => {
        event.preventDefault();
        const path = `${currentPost.user_id}/${currentPost.Photo}`;
        const { data, error } = await supabase.storage
            .from('ImageUpload')
            .remove([path]);

        if (error) {
            console.error('Error deleting photo:', error);
        } else {
            console.log('Photo deleted:', data);
            setMedia([]);
            setCurrentPost(prev => ({ ...prev, Photo: '' }));
        }
    };

    return(
        <div className='new-post-container'>
            <form  className='form-container' onSubmit={updateSubmit}>
                <div className='new-post-photo-input'>
                    {media.url ? (
                        <div className='new-post-photo-preview'>
                            <button type="button" onClick={deletePhoto}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.615 20C7.16833 20 6.78733 19.8427 6.472 19.528C6.15733 19.2133 6 18.8323 6 18.385V6.00001H5V5.00001H9V4.23001H15V5.00001H19V6.00001H18V18.385C18 18.845 17.846 19.229 17.538 19.537C17.23 19.845 16.8457 19.9993 16.385 20H7.615ZM17 6.00001H7V18.385C7 18.5643 7.05767 18.7117 7.173 18.827C7.28833 18.9423 7.43567 19 7.615 19H16.385C16.5383 19 16.6793 18.936 16.808 18.808C16.9367 18.68 17.0007 18.539 17 18.385V6.00001ZM9.808 17H10.808V8.00001H9.808V17ZM13.192 17H14.192V8.00001H13.192V17Z"
                                        fill="#939393"/>
                                </svg>
                            </button>
                            <img className="uploaded-photo" src={media.url} alt={media.name}/>
                        </div>
                    ) : (
                        <div className='new-post-photo'>
                            <label htmlFor="photo-upload">
                                <svg width="44" height="48" viewBox="0 0 44 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <title>Upload Photo</title>
                                    <path
                                        d="M34.8334 25.996H23.8334V37.996H20.1667V25.996H9.16675V21.996H20.1667V9.996H23.8334V21.996H34.8334V25.996Z"
                                        fill="#575656"/>
                                    <path
                                        d="M34.8334 25.996H23.8334V37.996H20.1667V25.996H9.16675V21.996H20.1667V9.996H23.8334V21.996H34.8334V25.996Z"
                                        strokeWidth="#575656"/>
                                </svg>
                            </label>
                            <input id="photo-upload" type='file' name='Photo' onChange={uploadImage} style={{display: 'none'}}/>
                        </div>
                    )}
                </div>

                <input
                    className='new-post-title'
                    type='text'
                    name='Title'
                    value={currentPost.Title || ''}
                    onChange={handleChange}
                    id="Title"
                    placeholder='Add a catchy descriptive headline'
                />


                <div className='new-post-textarea'>
                    <textarea
                        className='new-post-description'
                        type='text'
                        name='Description'
                        value={currentPost.Description || ''}
                        onChange={handleChange}
                        id="Description"
                        placeholder='Add a detailed itinerary about your trip'
                    />
                </div >
                <button className='post-button' type="submit">Update Post</button>
            </form>
        </div>
    )
}

export default UpdatePost;
