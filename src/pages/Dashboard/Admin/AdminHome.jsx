import { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import AdminStats from "./AdminStats";
import { useAuth } from "../../../hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosFetch = useAxiosFetch();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axiosFetch('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <Fade delay={1e3} cascade damping={1e-1}>
                <h1 className='mt-10 mb-24 text-base font-bold text-center lg:text-4xl my-7'>Welcome Back, <span className='text-secondary'>{user?.displayName}</span></h1>
                <AdminStats users={users} />
            </Fade>
        </div>
    );
}

export default AdminHome;
