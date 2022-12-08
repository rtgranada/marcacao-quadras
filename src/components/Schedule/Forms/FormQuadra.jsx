import React, { useState, useEffect } from "react";
import { useForm, FormActions } from "../../../context/ScheduleContext";

const FormQuadra = () => {
  const { state, dispatch } = useForm();
  const handleNextStep = () => {};
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 4,
    });
  }, []);
  const handleSportChange = (e) => {
    dispatch({
      type: FormActions.setQuadra,
      payload: e.target.value,
    });
  };
  return (
    <div className="container">
      <p>Data: {state.date}</p>
      <p>
        Piso: {state.piso} - Esporte: {state.sport}
      </p>
      <p>Horario: {state.horario}</p>
      <label>Qual Quadra ?</label>
      <input type="number" autoFocus onChange={handleSportChange} />
      <button onClick={handleNextStep}>Proximo</button>
    </div>
  );
};

export default FormQuadra;
