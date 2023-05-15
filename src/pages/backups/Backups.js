import { useEffect, useState } from "react";
import Navbar from "../../models/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import ApiCallManager from "../../models/ApiCallManager";
import { Toaster, toast } from "react-hot-toast";
import './Backups.css';
import Loading from "../../models/loading/Loading";

function Backups() {

    const navigate = useNavigate();
    const apiCallManager = new ApiCallManager();

    const [allBackups, setBackups] = useState(null);
    
    const callForAllBackups = async () => {
        const response = await apiCallManager.callApi('get-all-backups', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);
        if(response != null) 
            setBackups(response);
    }

    useEffect(() => {
        callForAllBackups();
    }, []);


    const NewBackup = () => {
        navigate('/backups/new')
    }


    const InfoBackup = (Id) => {
        navigate('/backups/' + Id)
    };


    const DeleteBackup = async (Id) => {
        const response = await apiCallManager.callApi('delete-backup/' + Id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) {
            toast.success('Backup was successfully deleted!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
        }
    };

    if(allBackups == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <section className="body">

                <div className="action-menu">
                    <h2 className="subtitle">Create new backup</h2>

                    <button className="btn bl" onClick={() => NewBackup()}>Create</button>
                </div>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creation</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBackups.map((backup, index) => (
                            <tr key={index}>
                                <td>{backup.Name}</td>
                                <td>{backup.CreateAt}</td>
                                <td>{backup.Type}</td>
                                <td>
                                    <div className="last-cell">
                                        <button className="btn bl" onClick={() => InfoBackup(backup.Id)}>Info</button>
                                        <button className="btn rd" onClick={() => DeleteBackup(backup.Id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Navbar>
    );
}

export default Backups;