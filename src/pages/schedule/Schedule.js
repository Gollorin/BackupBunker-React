import { useEffect, useState } from "react";
import Navbar from "../../models/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import ApiCallManager from "../../models/ApiCallManager";
import Loading from "../../models/loading/Loading";

function Schedule() {

    const navigate = useNavigate();
    const apiCallManager = new ApiCallManager();

    const [allUsers, setUsers] = useState(null);
    const [filtredUsers, setFiltredUsers] = useState([]);
    const [search, setSearch] = useState("");
    
    const callForAllUsers = async () => {
        const response = await apiCallManager.callApi('get-all-users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
        {
            setUsers(response);
            setFiltredUsers(response);
        }
    }

    useEffect(() => {
        callForAllUsers();
    }, []);

    
    const InfoUser = (Id) => {
        navigate('/schedule/' + Id)
    };


    const FilterUsers = (event) => {
        event.preventDefault();

        const search_array = allUsers.filter(user => user.Email.includes(search))
        setFiltredUsers(search_array);
    };

    if(allUsers == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <section className="body">

                <h2 className="subtitle">Schedules for Users</h2>
                <hr />

                <form className="new-user" method="post" onSubmit={FilterUsers}>
                    <label>
                        <h3>Search:</h3>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Email..."/>
                    </label>

                    <button type="submit" className="btn bl">Search</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Creation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.Email}</td>
                                <td>{user.CreateAt}</td>
                                <td>
                                    <button className="btn bl" onClick={() => InfoUser(user.Id)}>Show</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Navbar>
    );
}

export default Schedule;