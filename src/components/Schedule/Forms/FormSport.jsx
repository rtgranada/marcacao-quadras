import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useForm, FormActions } from "../../../context/ScheduleContext";
import { areia_sports } from "../../Constants/constants";
const FormSport = () => {
  const { state, dispatch } = useForm();

  const handleNextStep = () => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3,
    });
  };
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2,
    });
  }, []);

  const handleSportChange = (data) => {
    dispatch({
      type: FormActions.setSport,
      payload: data,
    });
    handleNextStep();
  };
  return (
    <div className="container">
      <p>Piso: {state.piso}</p>
      {areia_sports.map((item) => (
        <Card
          onClick={() => {
            handleSportChange(item.value);
          }}
        >
          <Card.Title>{item.name}</Card.Title>
        </Card>
      ))}
      {/* <button onClick={handleNextStep}>Proximo</button> */}
    </div>
  );
};

export default FormSport;
