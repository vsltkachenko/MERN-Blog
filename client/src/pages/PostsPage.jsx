import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'

export const PostsPage = () => {
	const [posts, setPosts] = useState([])
	const firstRender = React.useRef(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchMyPosts = async () => {
			try {
				const { data } = await axios.get('/posts/user/myposts')
				setPosts(data)
				firstRender.current = false
				if (!data.length) {
					setTimeout(() => {
						navigate('/login')
					}, 3000)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchMyPosts()
	}, [navigate])

	return (
		<div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
			{posts.length
				? posts.map((post, idx) => post && <PostItem post={post} key={idx} />)
				: !firstRender.current && (
						<p className='text-xs text-white'>
							Для перегляду постів необхідно авторизуватись
						</p>
				  )}
		</div>
	)
}
