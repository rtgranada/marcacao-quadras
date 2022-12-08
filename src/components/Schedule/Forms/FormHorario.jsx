import React, { useState, useEffect } from "react";
import { useForm, FormActions } from "../../../context/ScheduleContext";

const FormHorario = () => {
  const { state, dispatch } = useForm();
  const handleNextStep = () => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 4,
    });
  };
  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 3,
    });
  }, []);
  const handleSportChange = (e) => {
    dispatch({
      type: FormActions.setHorario,
      payload: e.target.value,
    });
  };
  return (
    <div className="container">
      <p>Data: {state.date}</p>
      <p>
        Piso: {state.piso} - Esporte: {state.sport}
      </p>
      <p>Horario: {state.horario} </p>
      <label>Qual Horario ?</label>
      <input type="text" autoFocus onChange={handleSportChange} />
      <button onClick={handleNextStep}>Proximo</button>
    </div>
  );
};

export default FormHorario;
