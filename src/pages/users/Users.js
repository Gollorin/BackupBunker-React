import { useEffect, useState } from "react";
import Navbar from "../../models/navbar/Navbar";
import './Users.css';
import { useNavigate } from "react-router-dom";
import ApiCallManager from "../../models/ApiCallManager";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../models/loading/Loading";

function Users() {

    const navigate = useNavigate();
    const apiCallManager = new ApiCallManager();

    const [allUsers, setUsers] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const callForAllUsers = async () => {
        const response = await apiCallManager.callApi('get-all-users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
        {
            console.log(response);
            setUsers(response);
        }
    }

    useEffect(() => {
        callForAllUsers();
    }, []);

    const IsInputValid = () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(emailRegex.test(email)) {
          return true
        } else {
          return false;
        }
    }
    
    const AddUser = async (event) => {
        event.preventDefault();
  
        if(!IsInputValid()) {
            toast.error('Invalid email!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
            return;
        }

        const response = await apiCallManager.callApi('create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        });
  
        if(response != null) {
            const { Email } = response
            toast.success('User ' + Email + ' was successfully added!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
        } else {
            toast.error("Something wrong happend!")
        }
    };


    const InfoUser = (Id) => {
        navigate('/users/' + Id)
    };


    const DeleteUser = async (Id) => {
        const response = await apiCallManager.callApi('delete-user/' + Id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) {
            toast.success('User was successfully deleted!', 
            {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
            }})
        }
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
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
            <section className="body">

                <h2 className="subtitle">New User</h2>

                <form className="new-user" method="post" onSubmit={AddUser}>
                    <label>
                        <h3>Email:</h3>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." required/>
                    </label>

                    <label>
                        <h3>Password:</h3>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." required/>
                    </label>

                    <button type="submit" className="btn bl">Add</button>
                </form>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Creation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.Email}</td>
                                <td>{user.CreateAt}</td>
                                <td>
                                    <div className="last-cell">
                                        <button className="btn bl" onClick={() => InfoUser(user.Id)}>Info</button>
                                        <button className="btn rd" onClick={() => DeleteUser(user.Id)}>Delete</button>
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

export default Users;