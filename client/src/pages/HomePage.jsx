import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import Todo from '../components/Todo'

import { getAllTodo } from '../actions/todo.actions'
import { convertNumberToString, dateToString } from '../utils/converter'

import { loader, plus } from '../assets'

const HomePage = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )
    const activeTab = useSelector((state) => state.page.tab)
    const loading = useSelector((state) => state.todo.loading)
    const todoList = useSelector((state) => state.todo.todoList)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTodo(user))
    }, [])

    let todoListByTab = useMemo(() => {
        let today = new Date()
        let dayOfWeek = today.getDay()
        let month = today.getMonth()

        return todoList
            .filter((todo) => {
                if (activeTab === 'DAY') {
                    return (
                        new Date(todo.deadline).toISOString().split('T')[0] ===
                        today.toISOString().split('T')[0]
                    )
                }

                if (activeTab === 'WEEK') {
                    let differenceInDays = Math.floor(
                        (new Date(todo.deadline) - today) / 1000 / 60 / 60 / 24
                    )
                    return (
                        differenceInDays + dayOfWeek <= 6 &&
                        new Date(todo.deadline).getDate() >= today.getDate()
                    )
                }
                if (activeTab === 'MONTH')
                    return (
                        new Date(todo.deadline).getMonth() === month &&
                        new Date(todo.deadline).getDate() >= today.getDate()
                    )
                return false
            })
            .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline))
    }, [activeTab, todoList])

    const todoAmountString = useMemo(
        () => convertNumberToString(todoListByTab.length),
        [todoListByTab]
    )

    const todayString = dateToString()

    return (
        <AnimatePresence>
            <motion.div
                className="absolute left-2 top-0 mt-10 flex w-full flex-col-reverse md:mt-16 md:w-[calc(100%-4rem)] md:flex-row lg:left-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="relative my-8 flex w-full flex-col items-center font-mont text-xl font-bold md:my-auto md:h-[calc(100vh-4rem)] md:w-1/2 md:flex-row md:text-5xl lg:pl-24">
                    <div>
                        Hello, {user.result.name},&nbsp;
                        <br className="hidden md:block" />
                        welcome back.&nbsp;
                        <br />
                        You have&nbsp;
                        <span className=" text-yellow-300 underline">
                            {todoAmountString}&nbsp;
                        </span>
                        <br className="hidden md:block" />
                        remaining task
                        <br className="hidden md:block" /> to complete
                        <br className="hidden md:block" /> this{' '}
                        {activeTab.toLowerCase()}.
                    </div>
                    <div className="bottom-0 right-0 block font-nunito text-[10px] font-bold uppercase tracking-wider text-gray-400 md:absolute md:bottom-8 md:left-24 md:right-auto">
                        {todayString}
                    </div>
                </div>

                <div
                    className="relative h-[70vh] max-h-[calc(100vh-4rem)] min-h-[7rem] w-full overflow-scroll md:h-full md:w-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="h-full w-full p-0 md:p-6">
                        {loading ? (
                            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                                <img
                                    width={75}
                                    height={75}
                                    src={loader}
                                    alt="loader"
                                />
                            </div>
                        ) : todoListByTab.length === 0 ? (
                            <div
                                className={`mb-5 flex h-28 w-full cursor-pointer overflow-hidden rounded-md shadow-xl transition hover:brightness-110 md:w-4/5`}
                                onClick={() => navigate('/todo/create')}
                            >
                                <div className="flex h-full w-1/3 items-center justify-center bg-gray-600/60">
                                    <img
                                        src={plus}
                                        alt="add to-do icon"
                                        className=" h-10 w-10"
                                    />
                                </div>
                                <div className="flex h-full w-2/3 items-center justify-center p-4">
                                    <h3
                                        className={`text-md font-nunito font-bold
                    `}
                                    >
                                        Add a to—do
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <>
                                {todoListByTab.map((todo) => (
                                    <Todo key={todo._id} todo={todo} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default HomePage
