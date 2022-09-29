import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import MainContext from "../../context/MainContext"
import axios from "axios"


const Header = () => {
    const { userInfo,  setUserInfo, setAlert } = useContext(MainContext)

    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get('/api/users/logout')
        .then(resp => {
            setUserInfo({})
            setAlert({
                message: resp.data,
                status: 'success'
            })

            navigate('/stories')
        })

    }

    return (
        <header className="bg">
        <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                <h1>Fund_Me_App</h1>
            </a>

            <div className="navbar">
           
            <div>
                <li>
                    <Link to="/stories" className="nav-link px-2 text-dark">Istorijos</Link>
                </li>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Pasirinkimai 
                <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                {userInfo.role === 1 && 
                <>
                <div>
                    <li>
                        <Link to="/admin" className="nav-link px-2 text-dark">Administratorius</Link>
                    </li>
                </div>
                <div>
                    <li>
                        <Link to="/admin/stories/new" className="nav-link px-2 text-dark">Nauja Istorija</Link>
                    </li>
                </div>
            
             
                <div>
                    <li>
                        <Link to="/admin/users" className="nav-link px-2 text-dark">Vartotojų Redagavimas</Link>
                    </li>
                </div>

                <div>
                    <li>
                        <Link to="/admin/users/new" className="nav-link px-2 text-dark">Naujas Darbuotojas</Link>
                    </li>
                </div>
                <div>
                    <li>
                        <Link to="/admin/story" className="nav-link px-2 text-dark">Visos istorijos</Link>
                    </li>
                </div>
                <div>
                    <li>
                        <Link to="/admin/story/new" className="nav-link px-2 text-dark">Naujas Istorija</Link>
                    </li>
                </div>
                <div>
                    <li>
                        <Link to="/story/" className="nav-link px-2 text-dark">Jūsų Istorijos</Link>
                    </li>
                </div>
                </>
                }

                <div>
                    <li>
                        <Link to="/users/" className="nav-link px-2 text-dark">vartotojai</Link>
                    </li>
                </div>
                
                </div>
            </div> 
            <div className="text-end">
                {userInfo.id ? 
                <button onClick={handleLogout} className="button">Atsijungti</button> 
                    :
                    <>
                        <Link to="/login"className="header">prisijungimas</Link>
                        <Link to="/register" className="header">registracija</Link>
                    </>
                    }

                            
            </div>
            </div>
            </div>
        </div>
 
    </header>
    )
}



export default Header