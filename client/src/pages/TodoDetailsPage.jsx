import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import { areaCheckbox, importanceCheckbox } from '../utils/constants'
import { updateTodo, deleteTodo } from '../actions/todo.actions'

import ImportanceInput from '../components/Form/ImportanceInput'
import AreaInput from '../components/Form/AreaInput'

const TodoDetailsPage = () => {
    const { todoId } = useParams()
    const [user] = useState(JSON.parse(localStorage.getItem('profile')))
    const { _id, title, description, deadline, area, importance, image } =
        JSON.parse(localStorage.getItem('todoList')).data.filter(
            (el) => el._id === todoId
        )[0] || {
            _id: '',
            title: '',
            description: '',
            deadline: '',
            area: '',
            importance: '',
            image: '',
        }
    const [formData, setFormData] = useState({
        _id,
        title,
        description,
        deadline,
        area,
        importance,
        image,
    })
    const [titleError, setTitleError] = useState(false)
    const [deadlineError, setDeadlineError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [areaError, setAreaError] = useState(false)
    const [importanceError, setImportanceError] = useState(false)

    const [areaList, setAreaList] = useState(
        areaCheckbox.map((el) =>
            area.includes(el.title) ? { ...el, checked: true } : el
        )
    )
    const [importanceList, setImportanceList] = useState(
        importanceCheckbox.map((el) =>
            el.title === importance ? { ...el, checked: true } : el
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dateRef = useRef()

    const today = new Date().toISOString().split('T')[0]

    const handleImportance = (id) => {
        const updatedList = importanceList.map((el) => {
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
        setImportanceList(updatedList)
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
                image: `https://source.unsplash.com/800x600/?${e.target.value
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
        dispatch(updateTodo(user, formData, navigate))
    }

    return (
        <AnimatePresence>
            <motion.div
                className="absolute left-0 top-0 mt-16 flex w-full flex-col items-center justify-center gap-4 md:left-16 md:w-[calc(100%-4rem)] lg:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="relative flex max-h-[150px] min-h-[150px] items-center justify-center overflow-hidden rounded-xl lg:max-h-max lg:w-[384px] lg:max-w-sm">
                    <img
                        src={formData.image}
                        alt={formData.title}
                        loading="lazy"
                        className="h-full w-full bg-gray-600/30 object-cover"
                    />
                </div>
                <div className="relative max-w-xl lg:w-[576px]">
                    <h2 className="mb-7 text-center font-nunito text-4xl font-extrabold text-gray-800">
                        to—do details
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
                                value={formData.title}
                                className={`h-8 w-full rounded-xl border p-1 font-nunito text-sm text-gray-800 placeholder:font-nunito  placeholder:text-sm md:h-12 md:p-3 ${
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
                                value={
                                    new Date(formData.deadline)
                                        .toISOString()
                                        .split('T')[0]
                                }
                                ref={dateRef}
                                onFocus={() => (dateRef.current.type = 'date')}
                                onBlur={() => (dateRef.current.type = 'text')}
                                placeholder="deadline"
                                min={today}
                                className={`peer h-8 w-full rounded-xl border p-1 font-nunito text-sm text-gray-800  placeholder:font-nunito placeholder:text-sm md:h-12 md:p-3 ${
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
                                value={formData.description}
                                placeholder="description"
                                className={`h-24 w-full resize-none rounded-xl border p-1 font-nunito text-sm text-gray-800 placeholder:font-nunito  placeholder:text-sm md:h-36 md:p-3 ${
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
                            importance={importanceList}
                            handleImportance={handleImportance}
                            importanceError={importanceError}
                            setImportanceError={setImportanceError}
                        />

                        <div className="flex w-full gap-2">
                            <button
                                type="submit"
                                onClick={handleFormSubmit}
                                className="h-12 flex-1 rounded-xl border border-gray-600 bg-gray-600 p-3 font-nunito  text-xl font-extrabold text-gray-100 hover:opacity-90"
                            >
                                update to—do
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(deleteTodo(user, formData))
                                    navigate('/todo')
                                }}
                                className="h-12 rounded-xl border border-red-400 bg-red-400 px-7 font-nunito  text-xl font-extrabold text-gray-100 hover:opacity-90"
                            >
                                delete
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default TodoDetailsPage
