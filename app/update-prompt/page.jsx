'use client'

import {useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {useSession} from 'next-auth/react'

import Form from '@/components/Form'

const EditPrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
      const getPromptDetails = async () => {

        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag.replace('#', '')
        })
      }

      if(promptId) getPromptDetails();
    }, [promptId])
    

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found');

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: `#${post.tag.replace('#', '')}`,
                })
            })

            if(res.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form 
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt
