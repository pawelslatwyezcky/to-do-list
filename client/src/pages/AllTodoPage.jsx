import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

import Todo from '../components/Todo'
import CustomButton from '../components/CustomButton'

import { areaCheckbox, importanceCheckbox } from '../utils/constants'
import { checkBoxChecked, checkBoxUnchecked, sad } from '../assets'

const AllTodoPage = () => {
    const [areaList, setAreaList] = useState(areaCheckbox)
    const [importance, setImportance] = useState(importanceCheckbox)
    const [searchQuery, setSearchQuery] = useState('')
    const todoList = useSelector((state) => state.todo.todoList)
    const handleImportance = (id) => {
        const updatedList = importance.map((el) => {
            if (el.id === id) {
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
        setAreaList(updatedList)
    }

    const filteredList = useMemo(() => {
        const currentAreas = areaList
            .filter((area) => area.checked === true)
            .map((area) => area.title)
        const currentImportance = importance.filter((el) => el.checked === true)
        let filterSearchQuery = todoList.filter(
            (todo) =>
                todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                todo.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        )

        if (currentAreas.length)
            filterSearchQuery = filterSearchQuery.filter((todo) =>
                currentAreas.every((el) => todo.area.includes(el))
            )
        if (currentImportance.length)
            filterSearchQuery = filterSearchQuery.filter(
                (todo) => todo.importance === currentImportance[0].title
            )
        return filterSearchQuery
    }, [areaList, importance, searchQuery, todoList])

    useEffect(() => {}, [filteredList])

    return (
        <AnimatePresence>
            <motion.div
                className="absolute  left-0 top-0  mt-16 flex w-full flex-col md:left-16 md:w-[calc(100%-4rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Search by title or description"
                        className="w-full rounded-md border border-gray-600 px-4 py-2 placeholder:font-mont md:w-[calc(100%-4rem)]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex w-full flex-col gap-2 md:flex-row ">
                    <div className="relative mt-4 flex w-full flex-col items-center gap-2 overflow-hidden rounded-xl md:mx-auto md:mt-16 md:w-1/2">
                        <h3 className="font-mont lowercase">Filters</h3>
                        <div className="w-full flex-col  items-center gap-3 lg:w-1/2">
                            <fieldset
                                className={`relative h-max w-full rounded-xl border border-gray-400 p-4`}
                            >
                                <legend className="font-nunito text-sm text-gray-600">
                                    area of to—do
                                </legend>
                                <div className="grid grid-cols-3 grid-rows-2 gap-1 md:grid-cols-2 md:grid-rows-3">
                                    {areaList.map((checkbox) => (
                                        <div
                                            key={checkbox.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={checkbox.title}
                                                name={checkbox.title}
                                                value={checkbox.title}
                                                checked={checkbox.checked}
                                                onChange={() => {
                                                    handleAreaList(checkbox.id)
                                                }}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={checkbox.title}
                                                className="flex items-center justify-center"
                                            >
                                                <img
                                                    src={
                                                        checkbox.checked
                                                            ? checkBoxChecked
                                                            : checkBoxUnchecked
                                                    }
                                                    alt="checkbox"
                                                    className="mr-2 h-5 w-5"
                                                />
                                                <div className=" mr-2 hidden h-5 w-5  items-center justify-center rounded-sm bg-gray-300 sm:flex">
                                                    <img
                                                        src={checkbox.icon}
                                                        alt="icon"
                                                        className="h-3 w-3 "
                                                    />
                                                </div>
                                                <span className="font-nunito text-xs lowercase text-gray-700">
                                                    {checkbox.title}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset
                                className={`relative w-full rounded-xl border border-gray-400 p-4`}
                            >
                                <legend className="font-nunito text-sm text-gray-600">
                                    importance
                                </legend>
                                <div className=" mx-auto flex justify-between md:flex-col">
                                    {importance.map((checkbox) => (
                                        <div
                                            key={checkbox.id}
                                            className="mb-1 flex items-center justify-center"
                                        >
                                            <input
                                                type="radio"
                                                id={checkbox.title}
                                                name="importance"
                                                value={checkbox.title}
                                                checked={checkbox.checked}
                                                onChange={() => {
                                                    handleImportance(
                                                        checkbox.id
                                                    )
                                                }}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={checkbox.title}
                                                className={`group flex items-center justify-center rounded-xl px-2 py-1 transition ${
                                                    checkbox.title === 'high'
                                                        ? 'hover:bg-red-300'
                                                        : checkbox.title ===
                                                            'medium'
                                                          ? 'hover:bg-yellow-300'
                                                          : 'hover:bg-green-400'
                                                } ${
                                                    checkbox.checked
                                                        ? checkbox.title ===
                                                          'high'
                                                            ? 'bg-red-500'
                                                            : checkbox.title ===
                                                                'medium'
                                                              ? 'bg-yellow-500'
                                                              : 'bg-green-500'
                                                        : ''
                                                }`}
                                            >
                                                <span
                                                    className={`font-nunito text-xs uppercase tracking-wider text-gray-700 ${
                                                        checkbox.title ===
                                                        'high'
                                                            ? 'group-hover:text-red-100'
                                                            : checkbox.title ===
                                                                'medium'
                                                              ? 'group-hover:text-yellow-100'
                                                              : 'group-hover:text-green-100'
                                                    } ${
                                                        checkbox.checked
                                                            ? checkbox.title ===
                                                              'high'
                                                                ? 'text-red-100'
                                                                : checkbox.title ===
                                                                    'medium'
                                                                  ? 'text-yellow-100'
                                                                  : 'text-green-100'
                                                            : ''
                                                    }`}
                                                >
                                                    {checkbox.title}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <CustomButton
                            customStyles="mt-1 md:mt-4"
                            handleClick={() => {
                                setAreaList(areaCheckbox)
                                setImportance(importanceCheckbox)
                                setSearchQuery('')
                            }}
                        >
                            clear all filters
                        </CustomButton>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-full overflow-scroll">
                            <div className="h-full w-full p-1 md:p-6">
                                {filteredList.length === 0 && (
                                    <div
                                        className={`mb-5 flex h-28 w-4/5 overflow-hidden rounded-md shadow-xl transition hover:brightness-110`}
                                    >
                                        <div className="flex h-full w-1/3 items-center justify-center bg-gray-600/30">
                                            <img
                                                src={sad}
                                                alt="add to-do icon"
                                                className=" h-10 w-10"
                                            />
                                        </div>
                                        <div className="flex h-full w-2/3 items-center justify-center p-4">
                                            <h3
                                                className={`text-md font-nunito font-bold
                    `}
                                            >
                                                no such to—do
                                            </h3>
                                        </div>
                                    </div>
                                )}
                                {filteredList.map((todo) => (
                                    <Todo key={todo._id} todo={todo} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default AllTodoPage
