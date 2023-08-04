import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
	comments: [],
	loading: false,
}

export const createComment = createAsyncThunk(
	'comment/createComment',
	async ({ postId, comment, author }) => {
		try {
			const { data } = await axios.post(`/comments/${postId}`, {
				postId,
				comment,
				author,
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const getPostComments = createAsyncThunk(
	'comment/getPostComments',
	async (postId) => {
		try {
			const { data } = await axios.get(`/posts/comments/${postId}`)
			return data
		} catch (error) {
			console.log(error)
		}
	}
)

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: {
		// Створення коментаря
		[createComment.pending]: (state) => {
			state.loading = true
		},
		[createComment.fulfilled]: (state, action) => {
			state.loading = false
			action.payload.hasOwnProperty('comment') &&
				state.comments.push(action.payload)
		},
		[createComment.rejected]: (state) => {
			state.loading = false
		},
		// Отримання коментарів
		[getPostComments.pending]: (state) => {
			state.loading = true
		},
		[getPostComments.fulfilled]: (state, action) => {
			state.loading = false
			state.comments = action.payload
		},
		[getPostComments.rejected]: (state) => {
			state.loading = false
		},
	},
})

export default commentSlice.reducer
