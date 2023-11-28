import { checkBoxChecked, checkBoxUnchecked } from '../../assets'

const AreaInput = ({
    areaList,
    areaError,
    handleAreaList,
    setAreaError,
    customStyles,
    title,
}) => {
    return (
        <fieldset
            className={`relative w-full rounded-xl border p-4  ${customStyles} ${
                areaError ? ' border-red-500' : 'border-gray-400'
            }`}
        >
            <legend className="font-nunito text-sm text-gray-600">
                {title}
            </legend>
            <div className="grid grid-cols-3 grid-rows-2 gap-1 md:grid-cols-2 md:grid-rows-3">
                {areaList.map((checkbox) => (
                    <div key={checkbox.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={checkbox.title}
                            name={checkbox.title}
                            value={checkbox.title}
                            checked={checkbox.checked}
                            onChange={() => {
                                handleAreaList(checkbox.id)
                                setAreaError(false)
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
    )
}

export default AreaInput
