import { useState } from "react";
import Navbar from "../../../models/navbar/Navbar";
import './NewBackup.css';
import { useNavigate } from "react-router-dom";
import ApiCallManager from "../../../models/ApiCallManager";
import { Toaster, toast } from "react-hot-toast";

function NewBackup() {

    const navigate = useNavigate();
    const apiCallManager = new ApiCallManager();
    const [isClicked, setClicked] = useState(false); 

    const [bcName, setName] = useState("");
    const [bcType, setType] = useState("");
    const [bcDays, setDays] = useState([false, false, false, false, false, false, false]);
    const [bcTimes, setTimes] = useState([ "00:00" ]);
    const [bcPathTo, setPathTo] = useState([ "" ]);
    const [bcPathFrom, setPathFrom] = useState([ "" ]);


    const IsInputValid = () => {
        const regex = new RegExp("^(FULL|INCR|DIFF)$");
        
        if(!regex.test(bcType)) {
            toast.error("Wrong backup type!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
            return false;
        } 

        if(bcName.trim() === '' || bcName.length < 1) {
            toast.error("Wrong Name!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
            return false;
        }

        const path_regex = /^[A-Za-z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]+$/;

        for (let i = 0; i < bcPathFrom.length; i++) {

            if (!path_regex.test(bcPathFrom[i])) {
                let index = i + 1;
                toast.error('Path from ' + index + ' is in wrong format!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                }})
                return false;
            }
        }

        for (let i = 0; i < bcPathTo.length; i++) {

            if (!path_regex.test(bcPathTo[i])) {

                let index = i + 1;
                toast.error('Path to ' + index + ' is in wrong format!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                }})
                return false;
            }
        }

        return true;
    };

    const CreateNewBackup = async (event) => {
        event.preventDefault();
        
        if(isClicked)
            return;
        
        if(!IsInputValid()){
            return;
        }

        setClicked(true)

        const response = await apiCallManager.callApi('create-backup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Name: bcName, 
                Type: bcType,
                Paths_From: bcPathFrom,
                Paths_To: bcPathTo,
                OnDaysOfWeek: bcDays,
                AtTimes: bcTimes,
            }),
        });

        if(response != null) {
            const { Name } = response;
            toast.success('Backup ' + Name + ' was successfully created!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})

            setTimeout(() => {
                setClicked(false);
                navigate('/backups');
            }, 1000);
        } else {
            setClicked(false);
        }
    };


    const Cancel = () => {
        navigate('/backups');
    };

    // DAYS OF WEEK
    const handleDayChange = (value, index) => {
        const newDays = [...bcDays];
        newDays[index] = value;
        setDays(newDays);
    };


    // METHODS FOR TIME
    const HandleTimeChange = (e, index) => {
        const value = e.target.value;
        const array = [...bcTimes];
        array[index] = value;
        setTimes(array); 
    }

    const AddOneTime = () => {
        setTimes([...bcTimes, "00:00" ]);
    }

    const DeleteTime = (index) => {
        console.log(bcType);
        const array = [...bcTimes];
        array.splice(index, 1);
        setTimes(array);
    }

    // METHODS FOR PATHS
    const HandlePathChange = (list, e, index) => {
        if(list) {
            const value = e.target.value;
            const array = [...bcPathFrom];
            array[index] = value;
            setPathFrom(array); 
        } else {
            const value = e.target.value;
            const array = [...bcPathTo];
            array[index] = value;
            setPathTo(array); 
        }
    }

    const AddOnePath = (list) => {
        if(list)
            setPathFrom([...bcPathFrom, "" ]);
        else
            setPathTo([...bcPathTo, { Path: "" }]);
    }

    const DeletePath = (list, index) => {
        if(list)
        {
            const array = [...bcPathFrom];
            array.splice(index, 1);
            setPathFrom(array);
        } else {
            const array = [...bcPathTo];
            array.splice(index, 1);
            setPathTo(array);
        }
    }


    return(
        <Navbar>
            <section className="body">

                <Toaster
                position="top-center"
                reverseOrder={false}
                />

                <h2 className="subtitle">New Backup</h2>
                <hr />

                <form method="post" className="new-backup" onSubmit={CreateNewBackup}>

                    <div className="container">
                        <div>
                            <label>
                                <h3>Name:</h3>
                                <input type="text" name="name" onChange={(e) => setName(e.target.value)} placeholder="Enter name..." required />
                            </label>
                        </div>

                        <div>
                            <label>
                                <h3>Type:</h3>
                                <select name="type" onChange={(e) => setType(e.target.value)}>
                                    <option value={null}>Select type...</option>
                                    <option value={'FULL'}>Full</option>
                                    <option value={'INCR'}>Incremental</option>
                                    <option value={'DIFF'}>Diferencial</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <hr />

                    <div className="container">
                        <div>
                            <label className="day">
                                <h3>Monday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 0)} />
                            </label>
                            <label className="day">
                                <h3>Thuesday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 1)} />
                            </label>
                            <label className="day">
                                <h3>Wensday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 2)} />
                            </label>
                            <label className="day">
                                <h3>Monday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 3)} />
                            </label>
                            <label className="day">
                                <h3>Friday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 4)} />
                            </label>
                            <label className="day">
                                <h3>Sutarday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 5)} />
                            </label>
                            <label className="day">
                                <h3>Sunday:</h3>
                                <input type="checkbox" onChange={(e) => handleDayChange(e.target.checked, 6)} />
                            </label>
                        </div>

                        <div className="times">
                            <label>
                                <h3>At times:</h3>
                                {bcTimes.map((x, i) => {
                                    return(
                                        <div key={i}>
                                            <input name="Time" type="time" onChange={(e) => HandleTimeChange(e, i)} required/>
                                            {bcTimes.length - 1 === i &&
                                                <div className="action-row">
                                                    {bcTimes.length > 1 &&
                                                        <button type="button" className="sqr bl" onClick={() => DeleteTime(true, i)}>-</button>
                                                    }
                                                    <button type="button" className="sqr bl" onClick={() => AddOneTime(true)}>+</button>
                                                </div>
                                            }
                                        </div>
                                )})}
                            </label>
                        </div>
                    </div>

                    <hr />

                    <div className="container">
                        <div>
                            <label>
                                <h3>Path from:</h3>
                            </label>
                            {bcPathFrom.map((x, i) => {
                                return(
                                    <div className="path-row" key={i}>
                                        <input type="text" name="Path" onChange={(e) => HandlePathChange(true, e, i)} placeholder="C:\porn" required/>
                                        { bcPathFrom.length - 1 === i &&
                                            <div className="action-row">
                                                {bcPathFrom.length > 1 &&
                                                    <button type="button" className="sqr bl" onClick={() => DeletePath(true, i)}>-</button>
                                                }
                                                <button type="button" className="sqr bl" onClick={() => AddOnePath(true)}>+</button>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <label>
                                <h3>Path to:</h3>
                                {bcPathTo.map((x, i) => {
                                return(
                                    <div className="path-row" key={i}>
                                        <input type="text" name="Path" onChange={(e) => HandlePathChange(false, e, i)} placeholder="C:\backup" required/>
                                        { bcPathTo.length - 1 === i &&
                                            <div className="action-row">
                                                {bcPathTo.length > 1 &&
                                                    <button type="button" className="sqr bl" onClick={() => DeletePath(false, i)}>-</button>
                                                }
                                                <button type="button" className="sqr bl" onClick={() => AddOnePath(false)}>+</button>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                            </label>
                        </div>
                    </div>

                    <div className="action">
                        <button type="button" className="btn rd" onClick={() => Cancel()}>Cancel</button>
                        <button type="submit" className="btn bl">Create</button>
                    </div>

                </form>
            </section>
        </Navbar>
    );
}

export default NewBackup;