import { useEffect, useState } from "react";
import Navbar from "../../models/navbar/Navbar";
import ApiCallManager from "../../models/ApiCallManager";
import Loading from "../../models/loading/Loading";

function Log() {

    const apiCallManager = new ApiCallManager();
    const [logMsg, setMsg] = useState(null);

    const getLogMessages = async () => {
        const response = await apiCallManager.callApi('get-log', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
            setMsg(response);
    }

    useEffect(() => {
        getLogMessages();
    }, [])

    if(logMsg == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <section className="body">
                <div className="console">
                    {logMsg.map((mess, index) => (
                        <h5 key={index} className="msg">{mess}</h5>
                    ))}
                </div>
            </section>
        </Navbar>
    );
}

export default Log;