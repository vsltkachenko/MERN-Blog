import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
	try {
		const { postId, comment, author } = req.body

		if (!comment) return res.json({ message: 'Коментар не може бути порожнім' })

		const newComment = new Comment({ comment, author })
		console.log('newComment:', newComment)
		await newComment.save()

		try {
			await Post.findByIdAndUpdate(postId, {
				$push: { comments: newComment._id },
			})
		} catch (error) {
			console.log(error)
		}

		res.json(newComment)
	} catch (error) {
		res.json({ message: 'Щось пішло не так.' })
	}
}
