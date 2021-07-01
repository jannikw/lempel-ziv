import {
  faFastBackward,
  faBackward,
  faForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

interface StepControlsProps {
  step: number;
  stepsTotal: number;
  stepChanged?: (step: number) => void;
}

export function StepControls(props: StepControlsProps) {
  const { step, stepsTotal, stepChanged } = props;
  function updateStep(newStep: number) {
    if (stepChanged) {
      stepChanged(Math.max(0, Math.min(stepsTotal - 1, newStep)));
    }
  }
  return (
    <Container fluid>
      <Row className="no-gutters">
        <Col xs="6" md="2">
          <Button
            className="w-100"
            disabled={step === 0}
            onClick={() => updateStep(0)}
          >
            <FontAwesomeIcon icon={faFastBackward} /> First
          </Button>
        </Col>
        <Col xs="6" md="2">
          <Button
            className="ml-2 w-100"
            disabled={step === 0}
            onClick={() => updateStep(step - 1)}
          >
            <FontAwesomeIcon icon={faBackward} /> Prev.
          </Button>
        </Col>
        <Col xs="12" md="4" className="text-center my-md-auto my-xs-4">
          <h5>{`${step + 1} / ${stepsTotal}`}</h5>
        </Col>
        <Col xs="6" md="2">
          <Button
            className="w-100"
            disabled={step >= stepsTotal - 1}
            onClick={() => updateStep(step + 1)}
          >
            Next <FontAwesomeIcon icon={faForward} />
          </Button>
        </Col>

        <Col xs="6" md="2">
          <Button
            className="ml-2 w-100"
            disabled={step >= stepsTotal - 1}
            onClick={() => updateStep(stepsTotal - 1)}
          >
            Last <FontAwesomeIcon icon={faFastForward} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
