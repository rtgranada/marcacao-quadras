import React, { useState, useEffect } from "react";
import { useForm, FormActions } from "../../../context/ScheduleContext";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import FormSport from "./FormSport";
import { const_pisos } from "../../Constants/constants";
const FormPiso = () => {
  const { state, dispatch } = useForm();
  const [typeSport, setTypeSport] = useState(true);
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
  const handlePisoChange = (data) => {
    if (data === "Padel") {
      dispatch({
        type: FormActions.setPiso,
        payload: data,
      });
      dispatch({
        type: FormActions.setSport,
        payload: data,
      });
      handleNextStep();
    } else {
      dispatch({
        type: FormActions.setPiso,
        payload: data,
      });
    }
  };

  return (
    <div className="container">
      <p>Data: {state.date}</p>
      <Row>
        {const_pisos.map((pisos) => (
          <Col>
            <Card
              onClick={() => {
                handlePisoChange(pisos.name);
              }}
              className="cardPisos"
            >
              <Card.Title>{pisos.name}</Card.Title>
              <Card.Img src={pisos.img.default} className="imgCard" />
            </Card>
          </Col>
        ))}
        {state.piso === "Areia" ? <FormSport /> : null}
      </Row>
    </div>
  );
};

export default FormPiso;
