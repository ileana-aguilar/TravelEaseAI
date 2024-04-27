import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './NewPost.css';
import HorizontalLine from '../assets/HorizontalLine';
import { v4 as uuidv4 } from 'uuid';


const NewPost = () => {
    const [userId, setUserId] = useState(null);
    const [media, setMedia] = useState([]);
    const randFileName = uuidv4();


    const[post, setPost] = useState({Photo: "", Title:"", Description:"", user_id: ""});

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

    async function uploadImage(e) {
        let file = e.target.files[0];

//I can grab uuidv4() and inset it into post.Photo column
        const { data, error } = await supabase
            .storage
            .from('ImageUpload')
            .upload(userId + "/" + randFileName, file)

        if (error) {
            console.error("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", data);
            getMedia(data);
        }
    }

    async function getMedia() {
        const { data, error } = await supabase
            .storage
            .from('ImageUpload')
            .download(userId + "/" + randFileName);

        if (error) {
            console.error('Error downloading image: ', error);
        } else {
            const url = URL.createObjectURL(data);
            setMedia({name: randFileName, url: url});
        }
    }
    const handleChange = event => {
        const {name, value} = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value,
            user_id: userId,
            Photo: media.name
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Posts')
            .insert([post]);

        if (error) {
            console.error("Error inserting data: ", error);
        } else {
            console.log("Data inserted successfully: ", data);
            window.location = "/Feed"; // Redirect on success
        }
    };

    useEffect(() => {
        getUser();
        getMedia();
    }, [userId]);

    console.log(media.url);
    console.log(media.name);
    console.log(userId);

    const deletePhoto = async (event) => {
        event.preventDefault();
        await supabase.storage
            .from('ImageUpload')
            .remove(media.url);
        window.reload();
    };

    return(
        <div className='new-post-container'>
            <form onSubmit={handleSubmit}>
                <div className='new-post-photo-input'>
                    {media.url ? (
                     <div className='new-post-photo-preview'>
                        <button onChange={deletePhoto}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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



                <input className='new-post-title'
                       type='text'
                       name='Title'
                       value={post.Title}
                       onChange={handleChange}
                       id="Title"
                       placeholder='Add a catchy descriptive headline'/>

                <HorizontalLine width={610}/>
                <textarea className='new-post-description'
                          type='text'
                          name='Description'
                          value={post.Description}
                          onChange={handleChange}
                          id="Description"
                          placeholder='Add a detailed itinerary about your trip'/>


                <button className='post-button' type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewPost;