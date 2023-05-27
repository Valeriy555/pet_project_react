import React from 'react';

const Stage = ({stage}) => {
    console.log(stage);
    return (
        <div>
            {stage.stage}
        </div>
    );
};

export {Stage};