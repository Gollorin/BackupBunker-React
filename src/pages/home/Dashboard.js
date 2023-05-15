import { useEffect, useState } from "react";
import Navbar from "../../models/navbar/Navbar";
import './Dashboard.css';

function Dashboard() {

    const [info, setInfo] = useState(null);

    const getMeData = () => {

    };

    useEffect(() => {
        getMeData();
    }, []);

    return(
        <Navbar>
            <section className="home">

                <div>
                    <h2>Total backups:</h2>
                </div>

                <div>
                    <h2>Total users:</h2>
                </div>
                
                <div>
                    x
                </div>
                
                <div>
                    x
                </div>

                <div>
                    x
                </div>
                
                <div>
                    x
                </div>
                
            </section>
        </Navbar>
    );
}

export default Dashboard;