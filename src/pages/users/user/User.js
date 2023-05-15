import { useEffect, useState } from "react";
import Navbar from "../../../models/navbar/Navbar";
import ApiCallManager from "../../../models/ApiCallManager";
import { useParams } from "react-router-dom";
import Loading from "../../../models/loading/Loading";

function User() {

    let { ID } = useParams();
    const [userInfo, setInfo] = useState(null);
    const apiCallManager = new ApiCallManager();

    const callForUserInfo = async () => {
        const response = await apiCallManager.callApi('find-by-id/' + ID, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
        {
            setInfo(response);
        }
    }

    useEffect(() => {
        callForUserInfo();
    }, []);

    if(userInfo == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <section className="body">
                {userInfo.Email}
                <br />
                {userInfo.Id}
                <br />
                {userInfo.CreateAt} 
            </section>
        </Navbar>
    );
}

export default User;