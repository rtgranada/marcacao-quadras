import React, { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { Container, Row, Col, Card } from "react-bootstrap";
import Step from "./Header/Step";
import FormData from "./Forms/FormData";
import FormSport from "./Forms/FormSport";
import FormHorario from "./Forms/FormHorario";
import FormQuadra from "./Forms/FormQuadra";
import { useForm, FormActions } from "../../context/ScheduleContext";
import FormPiso from "./Forms/FormPiso";

export const Schedule = () => {
  const { state, dispatch } = useForm();

  const handleNextStep = () => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: state.currentStep + 1,
    });
  };

  const handlePreviousStep = () => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: state.currentStep - 1,
    });
  };

  const sendInformation = () => {
    alert(
      `Deseja marcar a Quadra: ${state.quadra} ${state.piso} para jogar ${state.sport} no dia ${state.date} no horário: ${state.horario} ? `
    );
  };

  useEffect(() => {}, []);

  const getCompStep = () => {
    switch (state.currentStep) {
      case 1:
        return <FormData />;
      case 2:
        return <FormPiso />;
      case 3:
        return <FormHorario />;
      case 4:
        return <FormQuadra />;
    }
  };

  const Steps = [1, 2, 3, 4];

  return (
    <Container>
      <Row className="mt-3">
        {Steps.map((item) => (
          <Col className="displaySteps">
            <Step key={item} index={item} active={state.currentStep === item} />
          </Col>
        ))}
      </Row>

      <hr />
      <Card className="agendaBody">{getCompStep()}</Card>
    </Container>
  );
};
