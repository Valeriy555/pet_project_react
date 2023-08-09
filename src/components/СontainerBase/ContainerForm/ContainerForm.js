import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {containerService} from "../../../services";
import {containerValidator} from "../../../validators";
import {UserSelect, StageSelect} from "../../Selects";
import css from "./ContainerForm.module.css";


const ContainerForm = ({setNewCont, contForUpdate, setUpdatedCont, setContForUpdate}) => {

    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm({
        resolver: joiResolver(containerValidator),
        // mode: 'onTouched',
        mode: 'onChange', // Обновленный режим для реагирования на изменения
    });

    const [selectedStage, setSelectedStage] = useState('');
    const stageSelectRef = useRef(null);
    const [isStageChanged, setIsStageChanged] = useState(false); // флаг для отслеживания изменения значения stage

    const [selectedUser, setSelectedUser] = useState('');
    const userSelectRef = useRef(null);
    const [isUserChanged, setIsUserChanged] = useState(false);

    useEffect(() => {

        if (contForUpdate) {
            const {shipper, consignee, forwarder, goods, container, consignment, stage, user} = contForUpdate;
            setValue('shipper', shipper)
            setValue('consignee', consignee)
            setValue('forwarder', forwarder)
            setValue('goods', goods)
            setValue('container', container)
            setValue('consignment', consignment)
            setValue('stage', stage._id.toString(), {shouldValidate: true})
            setValue('user', user._id.toString(), {shouldValidate: true})
        }
    }, [contForUpdate, setValue]);

    const handleStageChange = (event) => {
        const selectedValue = event.target.value;
        if (contForUpdate && contForUpdate.stage && contForUpdate.stage._id) {
            setIsStageChanged(selectedValue !== contForUpdate.stage._id.toString());
        }
        setSelectedStage(selectedValue);
    }

    const handleInspectorChange = (event) => {
        const selectedValue = event.target.value;
        if (contForUpdate && contForUpdate.user && contForUpdate.user._id) {
            setIsUserChanged(selectedValue !== contForUpdate.user._id.toString());
        }
        setSelectedUser(selectedValue);
    }

    const submit = async (container) => {
        try {
            if (contForUpdate) {
                const updatedContainer = {
                    shipper: container.shipper,
                    consignee: container.consignee,
                    forwarder: container.forwarder,
                    goods: container.goods,
                    container: container.container,
                    consignment: container.consignment,
                    stage: isStageChanged ? selectedStage : container.stage, // используем измененное значение stage, если оно было изменено
                    user: isUserChanged ? selectedUser : container.user, // используем измененное значение stage, если оно было изменено
                };

                const {data} = await containerService.updateById(contForUpdate._id, updatedContainer);
                setUpdatedCont(data);
                setContForUpdate(false);
            } else {
                const newContainer = {
                    ...container,
                    stage: selectedStage,
                    user: selectedUser,
                };
                const {data} = await containerService.create(newContainer);
                setNewCont(data)

            }
            reset()
            setIsStageChanged(false); // сбрасываем флаг изменения значения stage после отправки формы
            setIsUserChanged(false); // сбрасываем флаг изменения значения stage после отправки формы
        } catch (e) {
            // Обработка ошибки
        }
    };

    const clearForm = () => {
        setContForUpdate(false);
        reset();
        setSelectedStage(''); // Сбрасываем значение selectedStage
        setSelectedUser(''); // Сбрасываем значение selectedUser
    }
    console.log('isValid:', isValid);

    return (
        <div className={css.FormWrap}>

            <form onSubmit={handleSubmit(submit)}>

                <input type="text" placeholder={'shipper'} {...register('shipper')} className={css.input}/>
                <input type="text" placeholder={'consignee'} {...register('consignee')} className={css.input}/>
                <input type="text" placeholder={'forwarder'} {...register('forwarder')} className={css.input}/>
                <input type="text" placeholder={'goods'} {...register('goods')} className={css.input}/>
                <input type="text" placeholder={'container'} {...register('container')} className={css.input}/>
                <input type="text" placeholder={'consignment'} {...register('consignment')} className={css.input}/>

                <StageSelect selectedStage={selectedStage} onChange={handleStageChange} ref={stageSelectRef}/>
                <UserSelect selectedUser={selectedUser} onChange={handleInspectorChange} ref={userSelectRef}/>


                {Object.keys(errors).length === 0 && (
                    <button disabled={!isValid} className={css.Btn}>
                        {contForUpdate ? 'Update changes' : 'Create'}
                    </button>
                )}

                {contForUpdate && <button onClick={clearForm}>clear form</button>}


                <div className={css.errorForm}>

                    {errors.shipper && <span>{errors.shipper.message}</span>}
                    {errors.consignee && <span>{errors.consignee.message}</span>}
                    {errors.forwarder && <span>{errors.forwarder.message}</span>}
                    {errors.goods && <span>{errors.goods.message}</span>}
                    {errors.container && <span>{errors.container.message}</span>}
                    {errors.consignment && <span>{errors.consignment.message}</span>}
                    {errors.stage && <span>{errors.stage.message}</span>}
                    {errors.user && <span>{errors.user.message}</span>}

                </div>

            </form>

        </div>
    );
};

export {ContainerForm};