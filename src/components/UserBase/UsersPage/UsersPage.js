import React, {useState} from 'react';
import {UserForm} from "../UserForm/UserForm";
import {Users} from "../Users/Users";
import css from "./UsersPage.module.css";




const UsersPage = () => {
    const [newUser, setNewUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [userForUpdate, setUserForUpdate] = useState(null);
    return (
        <div className={css.UsersPage }>
            <UserForm setNewUser={setNewUser} userForUpdate={userForUpdate}
                      setUpdatedUser={setUpdatedUser} setUserForUpdate={setUserForUpdate}/>

            <Users newUser={newUser} setUserForUpdate={setUserForUpdate} updatedUser={updatedUser}/>

        </div>
    );
};

export {UsersPage};
