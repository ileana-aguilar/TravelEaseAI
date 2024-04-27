import { supabase } from '../../supabaseClient';
import { Auth } from '@supabase/auth-ui-react'
import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'
import { useState } from 'react';




function SignupForm(){
    return(
        <Auth
            supabaseClient={supabase}
            providers={[]}
            fields={{ displayName: true }}
            appearance={{ theme: ThemeSupa,
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
    )
}

export default SignupForm