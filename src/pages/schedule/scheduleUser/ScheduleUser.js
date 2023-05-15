import { useEffect, useState } from "react";
import Navbar from "../../../models/navbar/Navbar";
import ApiCallManager from "../../../models/ApiCallManager";
import { useNavigate, useParams } from "react-router-dom";
import './ScheduleUser.css';
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../../models/loading/Loading";

function ScheduleUser() {

    let { ID } = useParams();
    const apiCallManager = new ApiCallManager();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [allBackups, setAllBackups] = useState(null);
    const [userBackups, setUserBackups] = useState(null);

    const [filtredBackups, setFiltredBackups] = useState([{}]);
    const [search, setSearch] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const callForUserInfo = async () => {
        const response = await apiCallManager.callApi('find-by-id/' + ID, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
            setUserInfo(response);
    }

    const callForBackups= async () => {
        const response = await apiCallManager.callApi('get-all-backups', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
        {
            setAllBackups(response);
            setFiltredBackups(response)
        }
    }

    const callForUserBackups = async () => {
        const response = await apiCallManager.callApi('find-backups-ids-by-id/' + ID, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
            setUserBackups(response);
    }

    useEffect(() => {
        callForUserInfo();
        callForUserBackups();
        callForBackups();
    }, [ID]);


    const handleCheckChange = (inp_id, value) => {
        if(value && !userBackups.includes(inp_id)) {
            const array = [...userBackups, inp_id]
            setUserBackups(array)
        } else {
            if(userBackups.includes(inp_id))
            {
                const array = userBackups.filter((bac) => bac !== inp_id);
                setUserBackups(array);
            }
        }
    };


    const FilterBackups = (event) => {
        event.preventDefault();

        const search_array = allBackups.filter(backup => backup.Name.includes(search))
        setFiltredBackups(search_array);
    };


    const NewSchedule = async () => {

        if(isClicked)
            return

        setIsClicked(true);

        const response = await apiCallManager.callApi('create-schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Id: ID, 
                Backups: userBackups,
            }),
        });

        if(response != null) 
        {
            toast.success('Schedule for ' + userInfo.Email + ' was created!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})

            setTimeout(() => {
                setIsClicked(false);
                navigate('/schedule');
            }, 1000);
        }
    }


    if(userInfo == null || allBackups == null || userBackups == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <section className="body">

                <Toaster
                position="top-center"
                reverseOrder={false}
                />

                <div className="menu-sch">
                    <h2 className="subtitle">Email: <span>{userInfo.Email}</span></h2>

                    <div>
                        <button type="button" className="btn rd" onClick={() => navigate('/schedule')}>Cancel</button>
                        <button type="button" className="btn bl" onClick={() => NewSchedule()}>Create</button>
                    </div>
                </div>
                <hr />

                <form className="new-user" method="post" onSubmit={FilterBackups}>
                    <label>
                        <h3>Search:</h3>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Name..."/>
                    </label>

                    <button type="submit" className="btn bl">Search</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtredBackups.map((backup, index) => (
                            <tr key={index}>
                                <td>{backup.Name}</td>
                                <td>{backup.Type}</td>
                                <td>
                                    <input type="checkbox" checked={userBackups.includes(backup.Id)} onChange={(e) => handleCheckChange(backup.Id, e.target.checked)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Navbar>
    );
}

export default ScheduleUser;