import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import { signInModal, signUpModal } from '../../store/page.slice'

import CustomButton from '../CustomButton'
import Tab from './Tab'
import MenuItem from './MenuItem'

import { menu, menuClose } from '../../assets'

const Navbar = () => {
    const activeTab = useSelector((state) => state.page.tab)
    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const menuRef = useRef()

    return (
        <div className="relative m-1 flex w-full justify-between md:m-5">
            <div className="flex w-2/5 items-center md:w-1/3">
                <h1
                    className="cursor-pointer font-sans text-lg font-black tracking-wide text-gray-600 transition-all ease-in hover:opacity-70 md:ml-14 md:text-2xl"
                    onClick={() => navigate('/')}
                >
                    to—do list
                </h1>
            </div>

            {location.pathname.includes('/todo') && (
                <div className="mx-2 flex w-3/5 items-center justify-between md:w-1/3">
                    <div>
                        {location.pathname === '/todo' && (
                            <>
                                <Tab activeTab={activeTab} title="DAY" />
                                <Tab
                                    activeTab={activeTab}
                                    customStyles="mx-2 md:mx-6"
                                    title="WEEK"
                                />
                                <Tab activeTab={activeTab} title="MONTH" />
                            </>
                        )}
                    </div>

                    <div
                        tabIndex={0}
                        className="relative md:mr-10"
                        ref={menuRef}
                        onFocus={() => setShowMenu(true)}
                        onBlur={() => setShowMenu(false)}
                    >
                        {showMenu ? (
                            <img
                                src={menuClose}
                                alt="menu"
                                width="20"
                                height="20"
                                className="cursor-pointer hover:opacity-70"
                            />
                        ) : (
                            <img
                                src={menu}
                                alt="menu"
                                width="20"
                                height="20"
                                className="cursor-pointer text-black hover:opacity-70"
                            />
                        )}

                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    className="absolute right-0 top-6 z-50 w-28 rounded-md border bg-white p-1 font-mont text-xs font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <MenuItem
                                        setShowMenu={setShowMenu}
                                        menuRef={menuRef}
                                        title="Home"
                                        path="/todo"
                                    />
                                    <hr className="my-1" />
                                    <MenuItem
                                        setShowMenu={setShowMenu}
                                        menuRef={menuRef}
                                        title="Add to—do"
                                        path="/todo/create"
                                    />
                                    <hr className="my-1" />
                                    <MenuItem
                                        setShowMenu={setShowMenu}
                                        menuRef={menuRef}
                                        title="All to—do"
                                        path="/todo/all"
                                    />
                                    <hr className="my-1" />
                                    <MenuItem
                                        setShowMenu={setShowMenu}
                                        menuRef={menuRef}
                                        title="Logout"
                                        path="/"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {location.pathname === '/' && (
                <div className="mr-1 flex w-1/2 justify-end md:mr-10 md:w-1/3">
                    <CustomButton
                        type="outlined"
                        handleClick={() => {
                            dispatch(signUpModal())
                        }}
                    >
                        Sign Up
                    </CustomButton>
                    <CustomButton
                        type="filled"
                        handleClick={() => {
                            dispatch(signInModal())
                        }}
                    >
                        Sign In
                    </CustomButton>
                </div>
            )}
        </div>
    )
}

export default Navbar
