import React, { useEffect } from 'react';
import {Alert} from "react-bootstrap";

const CustomeAlert = ({alertContent,closeAlert,variant}) => {
    useEffect(()=>{
        setTimeout(()=>{
            closeAlert();
        },3000);
    });
    return (
        <>
        <Alert variant={variant}>
            {alertContent}
        </Alert>
        </>
    );
};
export default CustomeAlert;
