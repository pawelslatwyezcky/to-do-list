import React, { useEffect, useState } from 'react'
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import decode from 'jwt-decode'

import { logout } from './store/auth.slice'
import {
    AllTodoPage,
    CreateTodoPage,
    HomePage,
    LoginPage,
    TodoDetailsPage,
} from './pages'
import LoginModal from './components/LoginModal'

import LeftSideBar from './components/LeftSideBar'

import Navbar from './components/Navbar/Navbar'
import { useDispatch } from 'react-redux'

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch(logout())
                setUser(null)
                navigate('/')
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <div className="flex h-[100vh] max-h-[100vh] w-full overflow-hidden">
            <LeftSideBar />
            <div className="relative m-5 flex w-full flex-col">
                <Navbar />
                <div className="w-full flex-1">
                    <Routes>
                        {!user && (
                            <>
                                <Route path="/" element={<LoginPage />} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace={true} />}
                                />
                            </>
                        )}
                        {user && (
                            <>
                                <Route
                                    path="/todo"
                                    element={<HomePage />}
                                ></Route>
                                <Route
                                    path="/todo/:todoId"
                                    element={<TodoDetailsPage />}
                                />
                                <Route
                                    path="/todo/create"
                                    element={<CreateTodoPage />}
                                />
                                <Route
                                    path="/todo/all"
                                    element={<AllTodoPage />}
                                />
                                <Route
                                    path="*"
                                    element={
                                        <Navigate to="/todo" replace={true} />
                                    }
                                />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
            <LoginModal />
        </div>
    )
}

export default App
