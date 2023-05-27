import React, {useState} from 'react';
import {ContainerForm} from "../ContainerForm/ContainerForm";
import {Containers} from "../Conteiners/Conteiners";
import css from "./ContainersPage.module.css";

const ContainersPage = () => {
    const [newCont, setNewCont] = useState(null);
    const [updatedCont, setUpdatedCont] = useState(null); // обновленный конт
    const [contForUpdate, setContForUpdate] = useState(null); //конт для обновления
    console.log('-----newCont-----');
    console.log(newCont);
    console.log('-----updatedCont----');
    console.log(updatedCont);
    console.log('-----contForUpdate----');
    console.log(contForUpdate);
    return (
        <div className={css.ContainersPage }>

            <ContainerForm setNewCont={setNewCont}
                           contForUpdate={contForUpdate}
                           setUpdatedCont={setUpdatedCont}
                           setContForUpdate={setContForUpdate}/>

            <Containers newCont={newCont}
                        setContForUpdate={setContForUpdate}
                        updatedCont={updatedCont}/>
        </div>

    );
};

export {ContainersPage};
