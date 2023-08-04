import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
	const dispatch = useDispatch()
	const { posts, popularPosts, loading } = useSelector((state) => state.post)
	const firstRender = React.useRef(true)
	// console.log(popularPosts)

	useEffect(() => {
		dispatch(getAllPosts())
		firstRender.current = false
	}, [dispatch])

	if (loading) {
		return (
			<div className='text-xl text-center text-white py-10'>Loading...</div>
		)
	} else if (!posts.length && !firstRender.current) {
		return (
			<div className='text-xl text-center text-white py-10'>Постів немає (</div>
		)
	}

	return (
		<div className='max-w-[900px] mx-auto py-10'>
			<div className='flex justify-between gap-8'>
				<div className='flex flex-col gap-10 basis-4/5'>
					{posts?.map((post, idx) => (
						<PostItem key={idx} post={post} />
					))}
				</div>
				<div className='basis-1/5'>
					<div className='text-xs mb-4 uppercase text-white'>Популярні:</div>

					{popularPosts?.map((post, idx) => (
						<PopularPosts key={idx} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
