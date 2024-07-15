import { useEffect, useState } from 'react';
import './App.css';
import FeedView from './routes/FeedView.jsx';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user != null) {
                setIsLoggedIn(true);
                setUserId(user.id);
            } else {
                setIsLoggedIn(false);
                setUserId('');
            }
        } catch (e) {
            console.error('Error fetching user:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();

        // Set up authentication state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setIsLoggedIn(true);
                setUserId(session.user.id);
            } else if (event === 'SIGNED_OUT') {
                setIsLoggedIn(false);
                setUserId('');
            }
        });

        // Clean up the listener on unmount
        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    console.log(isLoggedIn);
    console.log(loading);
    console.log(userId);

    return (
        <>
            {isLoggedIn && !loading ? (
                <FeedView userid={userId} />
            ) : (
                <div className="app-container">
                    <div className="sidebar">
                        <img className="logo" src='src/assets/IMG_5079.png' width='300px' alt="Travel Ease Logo" />
                    </div>
                    <div className="authentication-main-content">
                        <div className='authentication'>
                            <Auth
                                supabaseClient={supabase}
                                providers={[]}
                                appearance={{
                                    theme: ThemeSupa,
                                    variables: {
                                        default: {
                                            colors: {
                                                brand: 'var(--dark-purple)',
                                                brandAccent: 'var(--dark-purple)',
                                            },
                                            radii: {
                                                borderRadiusButton: '15px',
                                                inputBorderRadius: '15px'
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
