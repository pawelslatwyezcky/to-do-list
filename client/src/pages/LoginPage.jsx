import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { background } from '../assets'

const LoginPage = () => {
    return (
        <AnimatePresence>
            <motion.div
                className="mx-auto flex h-full w-full max-w-[1000px] flex-col items-center justify-center lg:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="absolute top-16 flex max-h-full w-full max-w-sm items-center justify-center opacity-20 md:static md:w-2/3 md:opacity-100 lg:w-1/2">
                    <img
                        src={background}
                        alt="papercut autumn"
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="flex w-full max-w-lg flex-col items-center justify-center p-2 text-gray-600 lg:w-1/2 lg:p-5">
                    <div className="m-1 md:m-5">
                        <h2 className="mb-4 text-center font-mont text-2xl font-black uppercase tracking-wide lg:text-5xl">
                            Manage your{' '}
                            <span className="break-keep font-sans text-[#ff943b]">
                                to—do's
                            </span>{' '}
                            another way!
                        </h2>
                        <div className="font-nunito text-xs">
                            Get ready to supercharge your productivity.&nbsp;
                            <strong className="font-sans text-[#ff943b]">
                                to—do list
                            </strong>{' '}
                            is your new favorite app, designed for simplicity
                            and efficiency.
                            <div className="my-4">
                                <ol>
                                    <li>
                                        <strong>Quick Setup: </strong>Create
                                        your first list in seconds. Add tasks,
                                        set priorities, and hit the ground
                                        running.
                                    </li>
                                    <li>
                                        <strong>Intuitive Interface: </strong>No
                                        learning curve here. Our clean and
                                        simple design makes managing tasks a
                                        pleasure.
                                    </li>
                                    <li>
                                        <strong>Deadline Reminders: </strong>
                                        Stay on top of your game with timely
                                        alerts. Never miss a deadline again.
                                    </li>
                                    <li>
                                        <strong>Share with Ease: </strong>
                                        Collaborate seamlessly with colleagues
                                        or friends. Achieve more together.
                                    </li>
                                </ol>
                            </div>
                            <div>
                                <h3 className="mb-2 text-center font-mont font-black uppercase">
                                    Ready to Get Started?
                                </h3>
                                <p>
                                    <strong>Sign up</strong> now and take
                                    control of your tasks. Let's make every day
                                    a productive day with{' '}
                                    <strong className="font-sans text-[#ff943b]">
                                        to—do list
                                    </strong>
                                    !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 mx-auto font-nunito text-[0.5rem] text-gray-600">
                    design inspired by{' '}
                    <a
                        href="https://dribbble.com/ikerfernandez"
                        target="_blank"
                        className="hover:opacity-60"
                    >
                        Iker Fernandez
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default LoginPage
