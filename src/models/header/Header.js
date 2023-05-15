import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ title }) {

    const navigate = useNavigate();

    const Logout = () => {
        sessionStorage.removeItem("HAS-LOGIN");
        navigate('/');
    };

    return(
        <header>

            <h1 className='title'>{title}</h1>

            <button onClick={Logout} className='btn rd'>Logout</button>

        </header>
    );
}

export default Header;