import { useLocation, useNavigate } from 'react-router-dom'

import { search, leftarrow, plus } from '../assets'

const LeftSideBar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="sticky left-0 top-0 flex min-h-full w-[3rem] flex-col items-center bg-gray-100 md:w-[5rem]">
            {location.pathname === '/todo' && (
                <>
                    <img
                        src={search}
                        width="25"
                        height="25"
                        alt="search"
                        className="my-7 cursor-pointer hover:opacity-70 md:my-10"
                        onClick={() => navigate('/todo/all')}
                    />
                    <div
                        className="flex flex-1 cursor-pointer items-center justify-center hover:opacity-70"
                        onClick={() => {
                            navigate('/todo/create')
                        }}
                    >
                        <img src={plus} width="25" height="25" alt="add" />
                    </div>
                </>
            )}
            {location.pathname.includes('/todo/') && (
                <img
                    src={leftarrow}
                    width="25"
                    height="25"
                    alt="return"
                    className="my-7 cursor-pointer hover:opacity-70 md:my-10"
                    onClick={() => {
                        navigate('/todo')
                    }}
                />
            )}
        </div>
    )
}

export default LeftSideBar
