import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

export const Navbar = () => {
	const isAuth = useSelector(checkIsAuth)
	const username = useSelector((state) => state.auth.user?.username)
	const dispatch = useDispatch()
	const location = useLocation()
	// console.log(location)

	const activeStyles = {
		color: 'white',
	}

	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast(`${username} вийшов з системи`)
	}

	return (
		<div className='flex py-4 justify-between items-center'>
			<span className='flex justify-center items-center w-12 h-6 bg-yellow-600 text-xs text-white rounded-sm'>
				Logo
			</span>

			{isAuth && (
				<ul className='flex gap-8'>
					<li>
						<NavLink
							to={'/'}
							className='text-xs text-gray-400 hover:text-white'
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Головна
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/user/posts'}
							className='text-xs text-gray-400 hover:text-white'
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Мої пости
						</NavLink>
					</li>
					<li>
						<NavLink
							to={'/new'}
							className='text-xs text-gray-400 hover:text-white'
							style={({ isActive }) => (isActive ? activeStyles : undefined)}
						>
							Додати пост
						</NavLink>
					</li>
				</ul>
			)}
			<div className='flex justify-center items-center text-xs text-white'>
				{isAuth ? (
					<div>
						<span className='mr-4'>Користувач: {username}</span>
						<button
							className=' bg-gray-600 rounded-sm px-4 py-2'
							onClick={logoutHandler}
						>
							Вийти
						</button>
					</div>
				) : (
					location.pathname !== '/login' && (
						<NavLink to={'/login'}> Увійти </NavLink>
					)
				)}
			</div>
		</div>
	)
}
