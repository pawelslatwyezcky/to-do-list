import { useDispatch } from 'react-redux'
import { setTab } from '../../store/page.slice'
import { Link } from 'react-router-dom'

const Tab = ({ customStyles, activeTab, title }) => {
    const dispatch = useDispatch()

    return (
        <Link
            className={`font-nunito text-xs font-bold uppercase transition ${customStyles} ${
                activeTab === title
                    ? 'border-b-2 border-gray-900 text-gray-900'
                    : 'text-gray-400'
            }`}
            onClick={() => dispatch(setTab(title))}
        >
            {title}
        </Link>
    )
}

export default Tab
