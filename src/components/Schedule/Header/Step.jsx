import React from "react";
import { Card } from "react-bootstrap";
import { useForm, FormActions } from "../../../context/ScheduleContext";
const Step = ({ index, active }) => {
  const { state, dispatch } = useForm();
  const handleAlert = (data) => {
    if (data >= state.currentStep) {
      return;
    } else {
      dispatch({
        type: FormActions.setCurrentStep,
        payload: data,
      });
    }
  };
  return (
    <Card
      borderRadius={2}
      style={{ scale: active ? "1.2" : "none" }}
      className={`stepBtn ${active ? "SetpActivated" : "SetpInactivated"}`}
      onClick={() => {
        handleAlert(index);
      }}
    >
      <Card.Title>{index}</Card.Title>
    </Card>
  );
};

export default Step;
