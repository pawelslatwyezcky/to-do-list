const ImportanceInput = ({
    importance,
    handleImportance,
    importanceError,
    setImportanceError,
    title,
    customStyles,
}) => {
    return (
        <fieldset
            className={`relative w-full rounded-xl border p-4 ${customStyles} ${
                importanceError ? ' border-red-500' : 'border-gray-400'
            }`}
        >
            <legend className="font-nunito text-sm text-gray-600">
                {title}
            </legend>
            <div className="mx-auto flex justify-around md:flex-col">
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
                                handleImportance(checkbox.id)
                                setImportanceError(false)
                            }}
                            className="hidden"
                        />
                        <label
                            htmlFor={checkbox.title}
                            className={`group flex items-center justify-center rounded-xl px-2 py-1 transition ${
                                checkbox.title === 'high'
                                    ? 'hover:bg-red-300'
                                    : checkbox.title === 'medium'
                                      ? 'hover:bg-yellow-300'
                                      : 'hover:bg-green-400'
                            } ${
                                checkbox.checked
                                    ? checkbox.title === 'high'
                                        ? 'bg-red-500'
                                        : checkbox.title === 'medium'
                                          ? 'bg-yellow-500'
                                          : 'bg-green-500'
                                    : ''
                            }`}
                        >
                            <span
                                className={`font-nunito text-xs uppercase tracking-wider text-gray-700 ${
                                    checkbox.title === 'high'
                                        ? 'group-hover:text-red-100'
                                        : checkbox.title === 'medium'
                                          ? 'group-hover:text-yellow-100'
                                          : 'group-hover:text-green-100'
                                } ${
                                    checkbox.checked
                                        ? checkbox.title === 'high'
                                            ? 'text-red-100'
                                            : checkbox.title === 'medium'
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
    )
}

export default ImportanceInput
