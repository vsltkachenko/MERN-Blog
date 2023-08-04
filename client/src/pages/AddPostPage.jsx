import React from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../redux/features/post/postSlice'
import { useNavigate } from 'react-router-dom'

export const AddPostPage = () => {
	const [title, setTitle] = React.useState('')
	const [text, setText] = React.useState('')
	const [image, setImage] = React.useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submitHandler = () => {
		try {
			const formElem = document.getElementById('formElem') // альтернативний варіант
			const formData = new FormData(formElem) // одержання даних з форми
			// formData.append('title', title)
			// formData.append('text', text)
			// formData.append('image', image)
			// console.log('FormData --image: ', formData.get('image'))

			dispatch(createPost(formData))
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	const clearFormHandler = () => {
		setTitle('')
		setText('')
	}

	return (
		<form
			id='formElem'
			className='w-1/3 mx-auto py-10'
			onSubmit={(e) => e.preventDefault()}
		>
			<label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
				Прикріпити зображення:
				<input
					name='image'
					type='file'
					className='hidden'
					onChange={(e) => {
						// console.dir(e.target)
						setImage(e.target.files[0])
					}}
				/>
			</label>
			<div className='flex object-cover py-2'>
				{image && <img src={URL.createObjectURL(image)} alt={image.name} />}
			</div>

			<label className='text-xs text-white opacity-70'>
				Заголовок поста:
				<input
					name='title'
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Заголовок'
					className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
				/>
			</label>

			<label className='text-xs text-white opacity-70'>
				Текст поста:
				<textarea
					name='text'
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder='Текст поста'
					className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
				/>
			</label>

			<div className='flex gap-8 items-center justify-center mt-4'>
				<button
					onClick={submitHandler}
					className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
				>
					Додати
				</button>

				<button
					onClick={clearFormHandler}
					className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
				>
					Відмінити
				</button>
			</div>
		</form>
	)
}
