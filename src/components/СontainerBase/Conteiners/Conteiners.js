import {useEffect, useState} from "react";

import {containerService} from "../../../services";
import {Container} from "./Conteiner";
import css from "./Conteiners.module.css";

const Containers = ({newCont, setContForUpdate, updatedCont}) => {

    const [containers, setContainers] = useState([]);
    const [deletedContainerId, setDeletedContainerId] = useState(null)

    useEffect(() => {
        containerService.getAll().then(({data}) => setContainers(data));

    }, [newCont, updatedCont, deletedContainerId]);

    // useEffect(() => {
    //     if (newUser) {
    //         setUsers(prevState => [...prevState, newUser])
    //     }
    //
    //     if (deletedUserId) {
    //         setUsers(users.filter(user => user._id !== deletedUserId))
    //     }
    // }, [newUser, deletedUserId]);
    //
    // useEffect(() => {
    //     if (updatedUser){
    //         const user = users.find(user => user._id === updatedUser._id);
    //         Object.assign(user, updatedUser)
    //         setUsers([...users])
    //     }
    // },[updatedUser])


    return (
        <div>

            <div className={css.ContainersWrap}>

                <div className={css.Header}>

                        <p> shipper</p>
                        <p> consignee</p>
                        <p> forwarder</p>
                        <p> goods</p>
                        <p> container</p>
                        <p> consignment</p>
                        <p> inspection stage</p>
                        <p> inspection inspector</p>

                    </div>


                <div className={css.Containers}>
                    {containers.map((cont) => <Container key={cont._id} cont={cont}
                                                         setContForUpdate={setContForUpdate}
                                                         setDeletedContainerId={setDeletedContainerId}/>)}
                </div>


            </div>

        </div>
    );
};

export {Containers};


