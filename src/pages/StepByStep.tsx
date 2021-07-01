import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  availableCompressors,
  CompressorType,
} from "../compression/compressors";
import { values } from "lodash";
import { LzLikeVisualization } from "../visualization/LzLikeVisualization";
import { computeData } from "../visualization/common";
import { RlzVisualization } from "../visualization/RlzVisualization";
import { RelzVisualization } from "../visualization/RelzVisualization";
import { RelzRecVisualization } from "../visualization/RelzRecVisualization";
import { EmbedUrl } from "../components/EmbedUrl";
import Container from "react-bootstrap/esm/Container";
import { StepControls } from "../components/StepControls";
import { useEmbedState, useSettingsFromQuery } from "../hooks";

export default function StepByStep() {
  const [input, setInput] = useState("ABCCDBCCABDD");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedCompressor, setSelectedCompressor] =
    useState<CompressorType>("lz77");
  const currentCompressor = availableCompressors[selectedCompressor];
  const [referenceString, setReferenceString] = useState("");
  const [windowSize, setWindowSize] = useState(5);
  const [prefixSize, setPrefixSize] = useState(5);
  const [recursionLimit, setRecursionLimit] = useState(5);
  const query = useSettingsFromQuery();
  useEffect(() => {
    console.log(query);
    setSelectedCompressor(query.type);
    setInput(query.input);
    setReferenceString(query.settings.reference);
    setWindowSize(query.settings.windowSize);
    setPrefixSize(query.settings.prefixSize);
    setRecursionLimit(query.settings.recursionLimit);
    setCurrentStep(query.step);
  }, [query]);

  const data = computeData(selectedCompressor, input, {
    reference: referenceString,
    windowSize,
    prefixSize,
    recursionLimit,
  });
  const isEmbeded = useEmbedState();
  useEffect(() => {
    setCurrentStep(Math.min(data.steps.length - 1, currentStep));
  }, [data, data.steps.length, currentStep]);

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header>Settings</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Input String</Form.Label>
                    <Form.Control
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col xs="12" md="6">
                      <Form.Group>
                        <Form.Label>Compression Algorithm</Form.Label>
                        {values(availableCompressors).map((c) => (
                          <Form.Check
                            key={c.type}
                            label={c.title}
                            name="compressor-group"
                            type="radio"
                            checked={selectedCompressor === c.type}
                            onChange={() => setSelectedCompressor(c.type)}
                          />
                        ))}
                      </Form.Group>
                    </Col>
                    <Col xs="12" md="6">
                      {currentCompressor.needsReference && (
                        <Form.Group key="reference-string">
                          <Form.Label>Reference</Form.Label>
                          <Form.Control
                            placeholder="Reference String"
                            value={referenceString}
                            onChange={(e) => setReferenceString(e.target.value)}
                          />
                        </Form.Group>
                      )}
                      {currentCompressor.needsPrefixSize && (
                        <Form.Group>
                          <Form.Label>Prefix Size</Form.Label>
                          <Form.Control
                            type="number"
                            value={prefixSize}
                            min={0}
                            onChange={(e) =>
                              setPrefixSize(parseInt(e.target.value))
                            }
                          />
                        </Form.Group>
                      )}
                      {currentCompressor.needsWindowSize && (
                        <Form.Group>
                          <Form.Label>Window Size</Form.Label>
                          <Form.Control
                            type="number"
                            value={windowSize}
                            min={0}
                            onChange={(e) =>
                              setWindowSize(parseInt(e.target.value))
                            }
                          />
                        </Form.Group>
                      )}
                      {currentCompressor.needsRecursionLimit && (
                        <Form.Group>
                          <Form.Label>Recursion Limit</Form.Label>
                          <Form.Control
                            type="number"
                            value={recursionLimit}
                            min={0}
                            onChange={(e) =>
                              setRecursionLimit(parseInt(e.target.value))
                            }
                          />
                        </Form.Group>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <Container>
                  <Row className="justify-content-center overflow-auto">
                    <Col xs="auto">
                      {data.type === "lz-like" && (
                        <LzLikeVisualization
                          data={data}
                          step={currentStep}
                        ></LzLikeVisualization>
                      )}

                      {data.type === "rlz" && (
                        <RlzVisualization
                          data={data}
                          step={currentStep}
                        ></RlzVisualization>
                      )}
                      {data.type === "relz" && (
                        <RelzVisualization
                          data={data}
                          step={currentStep}
                        ></RelzVisualization>
                      )}
                      {data.type === "relz-rec" && (
                        <RelzRecVisualization
                          data={data}
                          step={currentStep}
                        ></RelzRecVisualization>
                      )}
                    </Col>
                  </Row>
                  <Row className="justify-content-center no-gutters">
                    <Col xs="12" lg="8">
                      <StepControls
                        step={currentStep}
                        stepsTotal={data.steps.length}
                        stepChanged={setCurrentStep}
                      ></StepControls>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {!isEmbeded && (
          <Row className="mt-3 mb-5">
            <Col>
              <EmbedUrl
                type={selectedCompressor}
                input={input}
                settings={{
                  prefixSize,
                  recursionLimit,
                  reference: referenceString,
                  windowSize,
                }}
                step={currentStep}
              ></EmbedUrl>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
