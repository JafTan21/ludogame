import { Link } from 'react-router-dom'
import Logo from 'components/inc/Logo'

export default function Header({ back }) {
    return (
        <>

            <Link to="/home" className="btn btn-sm btn-danger mt-3 text-white">
                <i className="fas fa-chevron-left"></i>
                <span style={{ marginLeft: "5px" }}>
                    {
                        back ? back : "Go Back"
                    }
                </span>
            </Link>
            <Logo />
        </>
    )
}
