import {userService} from "../../../services";
import css from './User.module.css'

const User = ({user, index, setUserForUpdate, setDeletedUserId}) => {
    const {_id, name, age, email, password} = user;

    const deleteUser = async () => {
        await userService.deleteById(_id);
        setDeletedUserId(_id)
    }


    return (
        <div className={css.User}>

            <p>{index + 1}) name: {name}</p>
            <p>age: {age}</p>
            <p>email: {email}</p>

            <div className={css.Btn}>
                <button onClick={() => deleteUser()}>Delete</button>
                <button onClick={() => setUserForUpdate(user)}>Update</button>
            </div>


        </div>
    );
};

export {User};
