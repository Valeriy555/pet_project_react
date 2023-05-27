import { useEffect, useState } from "react";
import { containerService, inspectionStageService } from "../../services";
import css from "../СontainerBase/Conteiners/Conteiner.module.css";

const StagePage = ({ cont, setContForUpdate }) => {
    const [stages, setStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState("");

    useEffect(() => {
        inspectionStageService.getAll().then(({ data }) => setStages(data));
    }, []);

    const handleStageChange = (event) => {
        setSelectedStage(event.target.value);
    };

    const handleUpdate = async () => {
        const stageObj = stages.find((stage) => stage.stage === selectedStage);
        if (stageObj) {
            await containerService.updateStageById(cont._id, stageObj._id);
            const updatedContainer = {
                ...cont,
                stage: { _id: stageObj._id, stage: selectedStage },
            };
            setContForUpdate(updatedContainer);
        }
    };

    return (
        <div>
            <select
                className={css.select}
                onChange={handleStageChange}
                value={selectedStage}
            >
                {stages.map((stage) => (
                    <option key={stage._id} value={stage.stage}>
                        {stage.stage}
                    </option>
                ))}
            </select>
            <button onClick={handleUpdate}>Update stage</button>
        </div>
    );
};

export { StagePage };