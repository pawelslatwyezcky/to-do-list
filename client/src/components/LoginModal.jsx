import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import { AnimatePresence, motion } from 'framer-motion'

import { closeModal, signInModal, signUpModal } from '../store/page.slice'
import { closeError } from '../store/auth.slice'
import { googleSignIn, signin, signup } from '../actions/auth.actions'

import CustomButton from './CustomButton'

import { google, loader, closeIcon } from '../assets'

const initialState = {
    email: '',
    name: '',
    password: '',
}

const LoginModal = () => {
    const isSignUp = useSelector((state) => state.page.isSignUp)
    const isSignIn = useSelector((state) => state.page.isSignIn)
    const loading = useSelector((state) => state.auth.loading)
    const error = useSelector((state) => state.auth.error)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async ({ code }) => {
            dispatch(googleSignIn(code, navigate))
        },

        flow: 'auth-code',
    })

    return (
        <AnimatePresence>
            {(isSignUp || isSignIn) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-600/50"
                    onClick={() => dispatch(closeModal())}
                >
                    <div
                        className="relative flex w-[400px] flex-col items-center rounded-xl border bg-white p-7 text-gray-600 shadow-xl"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-xl bg-gray-600/80 p-3 text-center transition ease-in"
                            >
                                <div className="font-mont text-xl uppercase tracking-wide text-white">
                                    {error}
                                </div>
                                <div
                                    className="absolute right-5 top-5 text-3xl text-white "
                                    onClick={() => dispatch(closeError())}
                                >
                                    <img
                                        src={closeIcon}
                                        alt="close button"
                                        width={25}
                                        height={25}
                                    />
                                </div>
                            </motion.div>
                        )}
                        <h2 className="mb-2 text-center font-mont font-black uppercase">
                            {isSignIn
                                ? 'enter your account'
                                : 'create an account'}
                        </h2>
                        <CustomButton
                            customStyles="flex w-full justify-center"
                            handleClick={() => loginWithGoogle()}
                        >
                            <img
                                src={google}
                                alt="google icon"
                                width={15}
                                className="mr-2"
                            />
                            Google
                        </CustomButton>
                        <div className="my-3 flex items-center">
                            <div className="mx-2 h-[1px] w-7 bg-gradient-to-r from-white/5 to-gray-600/60 text-xs"></div>
                            <div className="text-xs">OR</div>
                            <div className="mx-2 h-[1px] w-7 bg-gradient-to-l from-white/5 to-gray-600/60 text-xs"></div>
                        </div>
                        <div className="flex w-full">
                            <form
                                className="w-full text-sm"
                                onSubmit={handleSubmit}
                            >
                                <fieldset className="mb-2 flex flex-col">
                                    <label
                                        htmlFor="email"
                                        className="font-mont text-xs"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="rounded-md border border-gray-300 px-2 py-1 outline-none focus:border-gray-600"
                                        placeholder="your@email.com"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </fieldset>
                                {isSignUp && (
                                    <fieldset className="mb-2 flex flex-col">
                                        <label
                                            htmlFor="name"
                                            className="font-mont text-xs"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="rounded-md border border-gray-300 px-2 py-1 outline-none focus:border-gray-600"
                                            placeholder="your name"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </fieldset>
                                )}
                                <fieldset className="mb-2 flex flex-col">
                                    <label
                                        htmlFor="password"
                                        className="font-mont text-xs"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        autoComplete="current-password"
                                        id="password"
                                        required
                                        className="rounded-md border border-gray-300 px-2 py-1 outline-none focus:border-gray-600"
                                        placeholder="don't tell me anybody"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </fieldset>
                                {isSignIn ? (
                                    <CustomButton
                                        customStyles="w-full mt-3"
                                        type="filled"
                                        handleClick={() => {}}
                                    >
                                        Sign In
                                    </CustomButton>
                                ) : (
                                    <CustomButton
                                        customStyles="w-full mt-3"
                                        type="filled"
                                        handleClick={() => {}}
                                    >
                                        Sign Up
                                    </CustomButton>
                                )}
                            </form>
                        </div>
                        {isSignUp && (
                            <div className="mt-2 text-xs">
                                Already have an account?{' '}
                                <span
                                    className="cursor-pointer underline hover:text-gray-700/50"
                                    onClick={() => {
                                        setFormData(initialState)
                                        dispatch(signInModal())
                                    }}
                                >
                                    Sign In
                                </span>
                            </div>
                        )}
                        {isSignIn && (
                            <div className="mt-2 text-xs">
                                Don&apos;t have an account?{' '}
                                <span
                                    className="cursor-pointer underline hover:text-gray-700/50"
                                    onClick={() => {
                                        setFormData(initialState)
                                        dispatch(signUpModal())
                                    }}
                                >
                                    Sign Up
                                </span>
                            </div>
                        )}
                        {loading && (
                            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-xl bg-gray-100/90">
                                <img
                                    width={75}
                                    height={75}
                                    src={loader}
                                    alt="loader"
                                />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoginModal
