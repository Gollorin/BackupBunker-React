import { Link } from "react-router-dom";

function NotFound() {
    return(
        <>
            <h1>Něco je špatně</h1>
            <Link to="/home">Home</Link>
        </>
    );
}

export default NotFound;
