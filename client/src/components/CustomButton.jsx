import React from 'react'

const CustomButton = ({ children, handleClick, type, customStyles }) => {
    return (
        <button
            className={`mr-2 h-fit rounded-md px-1 py-1 font-nunito text-xs font-light opacity-90 transition-all ease-in hover:opacity-60 md:px-3  ${
                type === 'filled'
                    ? ' bg-gray-600 text-white'
                    : 'border border-gray-600 bg-white text-gray-600   '
            } ${customStyles}`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default CustomButton
