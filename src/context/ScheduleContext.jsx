import { useState } from "react";
import { createContext, useContext, useReducer } from "react";
//Context -> Caixa que armazena os dados
//Reducer -> Executa ações especificas, agrupamento de ações
//Provider -> Ambiente, acesso aos dados do contexto
//Hook -> Acesso as informações e trocar as informações

const initialData = {
  currentStep: 1,
  date: "",
  piso: "Padel",
  sport: "Padel",
  horario: "",
  quadra: "",
};

//Context
const FormContext = createContext();

//Reducer
export const FormActions = {
  setCurrentStep: 1,
  setDate: 2,
  setPiso: 3,
  setSport: 4,
  setHorario: 5,
  setQuadra: 6,
};
const formReducer = (state, action) => {
  switch (action.type) {
    case FormActions.setCurrentStep:
      return { ...state, currentStep: action.payload };
    case FormActions.setDate:
      return { ...state, date: action.payload };
    case FormActions.setPiso:
      return { ...state, piso: action.payload };
    case FormActions.setSport:
      return { ...state, sport: action.payload };
    case FormActions.setHorario:
      return { ...state, horario: action.payload };
    case FormActions.setQuadra:
      return { ...state, quadra: action.payload };
    default:
      return state;
  }
};

//Provider
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialData);
  const value = { state, dispatch };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

//Context Hook
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("UseForm precisa ser usado dentro do FormProvider");
  }
  return context;
};
