import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiCallManager from "../../../models/ApiCallManager";
import Navbar from "../../../models/navbar/Navbar";
import Loading from "../../../models/loading/Loading";

function Backup() {

    let { ID } = useParams();
    const [backupInfo, setInfo] = useState(null);
    const apiCallManager = new ApiCallManager();

    const callForUserInfo = async () => {
        const response = await apiCallManager.callApi('find-backup-by-id/' + ID, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if(response != null) 
        {
            console.log(response);
            setInfo(response);
        }
    }

    useEffect(() => {
        callForUserInfo();
    }, []);

    if(backupInfo == null) {
        return(
            <Navbar>
                <Loading />
            </Navbar>
        );
    }

    return(
        <Navbar>
            <section className="body">
                {backupInfo.id}
                <br />

                {backupInfo.name}
                <br />

                {backupInfo.type}
                <br />

                {backupInfo.createAt}
                <br />

                <h3>Paths from:</h3>
                {backupInfo.paths_From.map((path, index) => {
                    return(
                        <>
                            <h4 key={index}>{path}</h4>
                        </>
                )})}
                <br />

                <h3>Paths to:</h3>
                {backupInfo.paths_To.map((path, index) => {
                    return(
                        <>
                            <h4 key={index}>{path}</h4>
                        </>
                )})}
                <br />

                <h3>Which day:</h3>
                {backupInfo.onDaysOfWeek.map((day, index) => {
                    return(
                        <>
                            <h4 key={index}>{day ? "ano" : "ne"}</h4>
                        </>
                )})}
                <br />

                <h3>Which day:</h3>
                {backupInfo.atTimes.map((time, index) => {
                    return(
                        <>
                            <h4 key={index}>{time}</h4>
                        </>
                )})}
                <br />
            </section>
        </Navbar>
    );
}

export default Backup;