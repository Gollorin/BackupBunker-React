import { Link, useLocation } from "react-router-dom";
import Header from "../header/Header";
import './Navbar.css'

function Navbar({ children }) {

    const location = useLocation();

    function getTitle() {
        const pathArray = location.pathname.split('/');
        return pathArray[1];
    }

    return(
        <main>
            <nav>
                <div className="logo">
                    <h1 className="no-comp">Backup-Bunker</h1>
                    <h1 className="for-mob">B-B</h1>
                </div>

                <ul>
                    <li>
                        <Link to="/home" className={getTitle() === 'home' ? "active" : ""}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.25V20C3 20.5523 3.44771 21 4 21H8.42857C8.98086 21 9.42857 20.5523 9.42857 20V13.2857H14.5714V20C14.5714 20.5523 15.0191 21 15.5714 21H20C20.5523 21 21 20.5523 21 20V10.25C21 9.93524 20.8518 9.63885 20.6 9.45L12 3L3.4 9.45C3.14819 9.63885 3 9.93524 3 10.25Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <h3 className="no-comp">Dashboard</h3>
                        </Link>
                    </li>

                    <li>
                        <Link to="/users" className={getTitle() === 'users' ? "active" : ""}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75988 19.8248C6.9173 17.5547 9.27709 16 12 16C14.7019 16 17.0462 17.5308 18.2131 19.7723M14.3333 10.4444C14.3333 11.7945 13.2389 12.8889 11.8889 12.8889C10.5389 12.8889 9.44444 11.7945 9.44444 10.4444C9.44444 9.09442 10.5389 8 11.8889 8C13.2389 8 14.3333 9.09442 14.3333 10.4444ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <h3 className="no-comp">Users</h3>
                        </Link>
                    </li>

                    <li>
                        <Link to="/backups" className={getTitle() === 'backups' ? "active" : ""}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 21H20C21.1046 21 22 20.1046 22 19V8C22 6.89543 21.1046 6 20 6H11L9.29687 3.4453C9.1114 3.1671 8.79917 3 8.46482 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <h3 className="no-comp">Backups</h3>
                        </Link>
                    </li>

                    <li>
                        <Link to="/schedule" className={getTitle() === 'schedule' ? "active" : ""}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M12 6V12L16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <h3 className="no-comp">Schedule</h3>
                        </Link>
                    </li>

                    <li>
                        <Link to="/log" className={getTitle() === 'log' ? "active" : ""}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M12 6V12L16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <h3 className="no-comp">Log</h3>
                        </Link>
                    </li>
                </ul>
            </nav>

            <section className="content">

                <Header title={getTitle()} />

                {children}

            </section>

        </main>
    );
}

export default Navbar;