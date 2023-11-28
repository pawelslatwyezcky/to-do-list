import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/auth.slice'

const MenuItem = ({ menuRef, title, path }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <span
            className="block w-full cursor-pointer rounded-md p-2 text-center text-gray-600 transition ease-in hover:bg-gray-600/10 hover:text-black"
            onClick={() => {
                if (title === 'Logout') dispatch(logout())
                navigate(path)
                menuRef.current.blur()
            }}
        >
            {title}
        </span>
    )
}

export default MenuItem
