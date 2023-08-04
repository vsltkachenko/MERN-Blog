import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//  Register
export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        // console.log(username, password)
        const isUsed = await User.findOne({ username })
        if (isUsed) {
            return res.json({
                message: 'Даний username вже зайнятий',
            })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )
        await newUser.save()

        res.json({
            user: newUser,
            token,
            message: 'Реєстрація пройшла успішно'
        })

    } catch (error) {
        res.json({ message: 'Помилка при реєстрації користувача' })
    }
}

//Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                message: "Користувача з таким ім'ям немає",
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({
                message: "Невірний пароль",
            })
        }
        //-------- jsonwebtoken -----
        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            { expiresIn: '30d' })

        res.json({ token, user, message:"Ви увійшли в систему" })

    } catch (error) {
        res.json({ message: 'Помилка при авторизації' })
    }
}

//Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: "Користувача з таким ім'ям немає",
            })
        }
        // Знову створюємо token
        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            { expiresIn: '30d' })

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({ message: 'Немає доступу' })
    }
}