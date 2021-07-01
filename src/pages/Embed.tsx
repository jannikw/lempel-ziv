import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { StepControls } from "../components/StepControls";
import { useSettingsFromQuery } from "../hooks";
import { computeData } from "../visualization/common";
import { LzLikeVisualization } from "../visualization/LzLikeVisualization";
import { RelzRecVisualization } from "../visualization/RelzRecVisualization";
import { RelzVisualization } from "../visualization/RelzVisualization";
import { RlzVisualization } from "../visualization/RlzVisualization";

export function Embed() {
  const { type, input, step: initialStep, settings } = useSettingsFromQuery();
  const data = computeData(type, input, settings);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center overflow-auto">
        <Col xs="auto">
          {data?.type === "lz-like" && (
            <LzLikeVisualization data={data} step={step}></LzLikeVisualization>
          )}
          {data?.type === "rlz" && (
            <RlzVisualization data={data} step={step}></RlzVisualization>
          )}
          {data.type === "relz" && (
            <RelzVisualization data={data} step={step}></RelzVisualization>
          )}
          {data.type === "relz-rec" && (
            <RelzRecVisualization
              data={data}
              step={step}
            ></RelzRecVisualization>
          )}
        </Col>
      </Row>
      <Row
        className="mb-3 justify-content-center"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <Col lg="8" md="12">
          <StepControls
            step={step}
            stepsTotal={data.steps.length}
            stepChanged={setStep}
          ></StepControls>
        </Col>
      </Row>
    </Container>
  );
}
