'use client'

import {useState, useEffect} from 'react'
// import {useSession} from 'next-auth/react'
import {useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const OtherProfile = ({params}) => {
    const router = useRouter()
    // const {data: session} = useSession()
    const searchParams = useSearchParams();
    const { id: userId } = params;
    const userName = searchParams.get('name');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            console.log('fetching');
            const res = await fetch(`/api/users/${userId}/posts`)
            const data = await res.json()

    
            setPosts(data)
        }
    
        if(userId) fetchPosts()
    }, [userId])
    

  return (
    <Profile 
        name={userName}
        desc={`Welcome to ${userName}'s profile. Here you can find all the prompts created by ${userName}.`}
        data={posts}
    />
  )
}

export default OtherProfile
