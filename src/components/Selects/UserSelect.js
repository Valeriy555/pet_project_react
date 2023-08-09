import {forwardRef, useEffect, useState} from "react";
import {userService} from "../../services";
import css from "../СontainerBase/ContainerForm/ContainerForm.module.css";

const UserSelect = forwardRef (({ selectedUser, onChange }, ref) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll().then(({ data }) => setUsers(data));
    }, []);

    return (
        <select className={css.select} onChange={onChange} value={selectedUser} ref={ref}>
            {users.map((user) => (
                <option key={user._id} value={user._id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
});

export { UserSelect };