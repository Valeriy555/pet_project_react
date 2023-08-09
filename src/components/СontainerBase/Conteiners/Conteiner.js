import {containerService} from "../../../services";
import css from './Conteiner.module.css'

const Container = ({cont, setContForUpdate, setDeletedContainerId}) => {
    const {_id, shipper, consignee, forwarder, goods, container, consignment, stage, user} = cont;

    const deleteContainer = async () => {
        await containerService.deleteById(_id);
        setDeletedContainerId(_id)
    }


    return (
        <div className={css.Container}>

            <div className={css.Content}>
                <p> {shipper}</p>
                <p> {consignee}</p>
                <p> {forwarder}</p>
                <p> {goods}</p>
                <p> {container}</p>
                <p> {consignment}</p>
                <p> {stage && stage.stage}</p>
                <p> {user && user.name}</p>

            </div>


            <div className={css.Btn}>
                <button onClick={() => deleteContainer()}>Delete</button>

                <button onClick={() => setContForUpdate(cont)}>Update</button>

            </div>
            <hr/>

        </div>
    );
};

export {Container};
