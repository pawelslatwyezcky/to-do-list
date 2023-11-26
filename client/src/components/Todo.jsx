import { countDiffInDays } from '../utils/converter'
import checkedBox from '../assets/checkBoxChecked.svg'
import uncheckedBox from '../assets/checkBoxUnchecked.svg'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import sport from '../assets/sport.svg'
import hobby from '../assets/hobby.svg'
import home from '../assets/home.svg'
import money from '../assets/money.svg'
import work from '../assets/work.svg'
import family from '../assets/family.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../actions/todo.actions'

const areaIcons = {
    Home: home,
    Hobby: hobby,
    Sport: sport,
    Money: money,
    Work: work,
    Family: family,
}

const Todo = ({
    todo: { _id, title, image, deadline, importance, area, done },
}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )
    const [status, setStatus] = useState(done)
    const [remove, setRemove] = useState(false)
    const today = new Date()
    const diffInDays = countDiffInDays(deadline, today)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRemove = () => {
        setStatus(true)
        setTimeout(() => setRemove(true), 500)
        setTimeout(() => dispatch(deleteTodo(user, { _id })), 2000)
    }

    return (
        <AnimatePresence>
            {!remove && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className={`mb-5 flex h-28 w-full overflow-hidden rounded-md shadow-xl transition lg:w-4/5 ${
                        status ? 'grayscale' : 'hover:brightness-110'
                    } ${diffInDays.includes('violate') && 'bg-red-400/40'}`}
                >
                    <div className="h-full w-1/3">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full bg-gray-200 object-cover"
                        />
                    </div>
                    <div className="flex h-full w-2/3 justify-between p-4">
                        <div className="flex flex-col justify-between">
                            <div>
                                <h3
                                    className={`text-md font-mont font-bold lowercase ${
                                        status ? 'line-through' : ''
                                    }`}
                                >
                                    {title}
                                </h3>
                                <div className="flex">
                                    <div
                                        className={`${
                                            importance === 'high'
                                                ? 'text-red-700'
                                                : importance === 'medium'
                                                  ? 'text-yellow-600'
                                                  : 'text-green-700'
                                        } mr-2 text-[10px] uppercase`}
                                    >
                                        {importance}
                                    </div>
                                    <div className="text-[10px] uppercase">
                                        {status ? 'completed' : diffInDays}
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                {area.map((ar, idx) => (
                                    <div
                                        key={idx}
                                        className=" mr-1 flex h-5 w-5 items-center justify-center rounded-sm bg-gray-300"
                                    >
                                        <img
                                            src={areaIcons[ar]}
                                            alt="icon"
                                            className="h-3 w-3"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <div
                                className="text-bold cursor-pointer text-2xl hover:opacity-80"
                                onClick={() => navigate(`/todo/${_id}`)}
                            >
                                &#10230;
                            </div>
                            <div>
                                <img
                                    src={status ? checkedBox : uncheckedBox}
                                    alt="checkbox"
                                    className="h-6 w-6 cursor-pointer opacity-70 hover:opacity-40"
                                    onClick={handleRemove}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Todo
