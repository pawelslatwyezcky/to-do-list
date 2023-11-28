import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import ImportanceInput from '../components/Form/ImportanceInput'
import AreaInput from '../components/Form/AreaInput'

import { createTodo } from '../actions/todo.actions'
import { areaCheckbox, importanceCheckbox } from '../utils/constants'
import { loader } from '../assets'

const initialFormState = {
    title: '',
    deadline: '',
    description: '',
    area: [],
    importance: '',
    done: false,
    image: '',
}

const CreateTodo = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('profile')))

    const [formData, setFormData] = useState(initialFormState)
    const [areaList, setAreaList] = useState(areaCheckbox)
    const [importance, setImportance] = useState(importanceCheckbox)

    const [titleError, setTitleError] = useState(false)
    const [deadlineError, setDeadlineError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [areaError, setAreaError] = useState(false)
    const [importanceError, setImportanceError] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dateRef = useRef()
    const loading = useSelector((state) => state.todo.loading)

    const today = new Date().toISOString().split('T')[0]

    const handleImportance = (id) => {
        const updatedList = importance.map((el) => {
            if (el.id === id) {
                setFormData({ ...formData, importance: el.title })
                return {
                    ...el,
                    checked: true,
                }
            } else
                return {
                    ...el,
                    checked: false,
                }
        })
        setImportance(updatedList)
    }
    const handleAreaList = (id) => {
        const updatedList = areaList.map((el) => {
            if (el.id === id)
                return {
                    ...el,
                    checked: !el.checked,
                }
            else return el
        })
        setFormData({
            ...formData,
            area: updatedList
                .filter((el) => el.checked === true)
                .map((el) => el.title),
        })
        setAreaList(updatedList)
    }

    const handleInputChange = (e, name) => {
        if (name === 'title') {
            setFormData({
                ...formData,
                title: e.target.value,
                image: `https://source.unsplash.com/600x800/?${e.target.value
                    .split(' ')
                    .join('&')}`,
            })
        } else {
            setFormData({
                ...formData,
                [name]: e.target.value,
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // check required inputs
        if (formData.title === '') setTitleError(true)
        if (formData.description === '') setDescriptionError(true)
        if (formData.deadline === '') setDeadlineError(true)
        if (formData.importance === '') setImportanceError(true)
        if (formData.area.length === 0) setAreaError(true)

        let check =
            formData.title === '' ||
            formData.description === '' ||
            formData.deadline === '' ||
            formData.importance === '' ||
            formData.area.length === 0

        if (check) return
        dispatch(createTodo(user, formData, navigate))
    }
    return (
        <AnimatePresence>
            <motion.div
                className="absolute left-0 top-0 mt-16 w-full md:left-16 md:w-[calc(100%-4rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="relative mx-auto w-full max-w-xl">
                    {loading && (
                        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center rounded-md bg-gray-600/60">
                            <img
                                width={75}
                                height={75}
                                src={loader}
                                alt="loader"
                            />
                        </div>
                    )}

                    <h2 className="mb-7 text-center font-nunito text-4xl font-extrabold text-gray-800">
                        create to—do
                    </h2>

                    <form
                        className="flex w-full flex-wrap gap-2 md:gap-6"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="w-full md:w-[calc(50%-0.75rem)]">
                            <input
                                id="title"
                                placeholder="title"
                                type="text"
                                className={`h-8 w-full rounded-xl border p-3 font-nunito text-sm text-gray-800  placeholder:font-nunito placeholder:text-sm md:h-12 ${
                                    titleError
                                        ? ' border-red-500'
                                        : 'border-gray-400'
                                }`}
                                onChange={(e) => {
                                    handleInputChange(e, 'title')
                                    setTitleError(false)
                                }}
                            />
                        </div>
                        <div className="relative w-full md:w-[calc(50%-0.75rem)]">
                            <input
                                id="deadline"
                                type="text"
                                ref={dateRef}
                                onFocus={() => (dateRef.current.type = 'date')}
                                onBlur={() => (dateRef.current.type = 'text')}
                                placeholder="deadline"
                                min={today}
                                className={`peer h-8 w-full rounded-xl border p-3 font-nunito text-sm  text-gray-800 placeholder:font-nunito placeholder:text-sm md:h-12 ${
                                    deadlineError
                                        ? ' border-red-500'
                                        : 'border-gray-400'
                                }`}
                                onChange={(e) => {
                                    handleInputChange(e, 'deadline')
                                    setDeadlineError(false)
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <textarea
                                id="description"
                                placeholder="description"
                                className={`h-24 w-full resize-none rounded-xl border p-3 font-nunito text-sm text-gray-800  placeholder:font-nunito placeholder:text-sm md:h-36 ${
                                    descriptionError
                                        ? ' border-red-500'
                                        : 'border-gray-400'
                                }`}
                                onChange={(e) => {
                                    handleInputChange(e, 'description')
                                    setDescriptionError(false)
                                }}
                            ></textarea>
                        </div>
                        <AreaInput
                            title="choose area of to—do (at least one)"
                            customStyles="md:w-[calc(50%-0.75rem)] md:p-4"
                            areaList={areaList}
                            handleAreaList={handleAreaList}
                            areaError={areaError}
                            setAreaError={setAreaError}
                        />

                        <ImportanceInput
                            title="define importance"
                            customStyles="md:w-[calc(50%-0.75rem)]"
                            importance={importance}
                            handleImportance={handleImportance}
                            importanceError={importanceError}
                            setImportanceError={setImportanceError}
                        />

                        <button className="h-12 w-full rounded-xl border border-gray-600 bg-gray-600 p-3 font-nunito  text-xl font-extrabold text-gray-100 hover:opacity-90">
                            add to—do
                        </button>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default CreateTodo
