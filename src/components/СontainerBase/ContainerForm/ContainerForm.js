import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {containerService, inspectionStageService} from "../../../services";
import {containerValidator} from "../../../validators";
import css from "./ContainerForm.module.css";


const ContainerForm = ({setNewCont, contForUpdate, setUpdatedCont, setContForUpdate}) => {

    const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm({
        resolver: joiResolver(containerValidator),
        mode: 'onTouched',
    });

    const [stages, setStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState('');
    const [isStageChanged, setIsStageChanged] = useState(false); // флаг для отслеживания изменения значения stage

    useEffect(() => {
        inspectionStageService.getAll().then(({data}) => setStages(data));
    }, []);

    useEffect(() => {

        inspectionStageService.getAll().then(({data}) => setStages(data));
        if (contForUpdate) {
            const {shipper, consignee, forwarder, goods, container, consignment, stage} = contForUpdate;
            setValue('shipper', shipper)
            setValue('consignee', consignee)
            setValue('forwarder', forwarder)
            setValue('goods', goods)
            setValue('container', container)
            setValue('consignment', consignment)
            setValue('stage', stage._id.toString(), {shouldValidate: true})
        }
    }, [contForUpdate]);

    const handleStageChange = (event) => {
        const selectedValue = event.target.value;
        if (contForUpdate && contForUpdate.stage && contForUpdate.stage._id) {
            setIsStageChanged(selectedValue !== contForUpdate.stage._id.toString());
        }
        setSelectedStage(selectedValue);
    }

    const submit = async (container) => {
        try {
            if (contForUpdate) {
                const {data} = await containerService.updateById(contForUpdate._id, {
                    shipper: container.shipper,
                    consignee: container.consignee,
                    forwarder: container.forwarder,
                    goods: container.goods,
                    container: container.container,
                    consignment: container.consignment,
                    // stage: container.stage,
                    stage: isStageChanged ? selectedStage : container.stage, // используем измененное значение stage, если оно было изменено
                });

                setUpdatedCont(data);
                setContForUpdate(false);
            } else {
                const {data} = await containerService.create(container);
                setNewCont(data)

            }
            reset()
            setIsStageChanged(false); // сбрасываем флаг изменения значения stage после отправки формы
        } catch (e) {
            // setFormError(e.response.data)
        }
    };

    const clearForm = () => {
        setContForUpdate(false);
        reset();
    }


    return (
        <div className={css.FormWrap}>

            <form onSubmit={handleSubmit(submit)}>

                <input type="text" placeholder={'shipper'} {...register('shipper')} className={css.input}/>
                <input type="text" placeholder={'consignee'} {...register('consignee')} className={css.input}/>
                <input type="text" placeholder={'forwarder'} {...register('forwarder')} className={css.input}/>
                <input type="text" placeholder={'goods'} {...register('goods')} className={css.input}/>
                <input type="text" placeholder={'container'} {...register('container')} className={css.input}/>
                <input type="text" placeholder={'consignment'} {...register('consignment')} className={css.input}/>

                <select className={css.select} onChange={handleStageChange}
                        defaultValue={selectedStage}

                        {...register('stage')}>
                    {stages.map((stage) => (
                        <option key={stage._id} value={stage._id}>{stage.stage}</option>
                    ))}
                </select>

                {Object.keys(errors).length === 0 && (
                    <button
                        disabled={!isValid}
                        className={css.Btn}>{contForUpdate ? 'Update changes' : 'Create'}</button>
                )}

                {
                    !!contForUpdate && <button onClick={clearForm}>clear form</button>
                }


                <div className={css.errorForm}>

                    {errors.shipper && <span>{errors.shipper.message}</span>}
                    {errors.consignee && <span>{errors.consignee.message}</span>}
                    {errors.forwarder && <span>{errors.forwarder.message}</span>}
                    {errors.goods && <span>{errors.goods.message}</span>}
                    {errors.container && <span>{errors.container.message}</span>}
                    {errors.consignment && <span>{errors.consignment.message}</span>}
                    {errors.stage && <span>{errors.stage.message}</span>}

                </div>

            </form>

        </div>
    );
};

export {ContainerForm};