import {forwardRef, useEffect, useState} from "react";
import { inspectionStageService } from "../../services";
import css from "../СontainerBase/ContainerForm/ContainerForm.module.css";

const StageSelect = forwardRef (({ selectedStage, onChange }, ref) => {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        inspectionStageService.getAll().then(({ data }) => setStages(data));
    }, []);

    return (
        <select className={css.select} onChange={onChange} value={selectedStage} ref={ref}>
            {stages.map((stage) => (
                <option key={stage._id} value={stage._id}>
                    {stage.stage}
                </option>
            ))}
        </select>
    );
});

export { StageSelect };