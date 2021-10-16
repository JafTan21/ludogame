
import useRequireAuth from 'hooks/auth/useRequireAuth'
import Logo from 'components/inc/Logo'
import { Link } from 'react-router-dom'

export default function Home() {

    return <>
        {
            useRequireAuth(
                <>
                    <Logo />
                    <div className="container">
                        <div className="card bg-warning mt-5">
                            <div className="card-body">
                                <Link to="/create-room" className="w-100 btn btn-success">
                                    Create a room
                                </Link>
                                <Link to="/join-room" className="mt-2 w-100 btn btn-success">
                                    Join a room
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    </>
}
