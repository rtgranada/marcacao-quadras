import React, { useState, useEffect } from "react";
import { useForm, FormActions } from "../../../context/ScheduleContext";
const FormData = () => {
  const { state, dispatch } = useForm();
  const handleNextStep = () => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2,
    });
  };
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1,
    });
  }, []);
  const handleSportChange = (e) => {
    dispatch({
      type: FormActions.setDate,
      payload: e.target.value,
    });
    handleNextStep();
  };
  return (
    <div className="container">
      <label>Qual Data ?</label>
      <input type="date" autoFocus onChange={handleSportChange} />
      {/* <button onClick={handleNextStep}>Proximo</button> */}
    </div>
  );
};

export default FormData;
