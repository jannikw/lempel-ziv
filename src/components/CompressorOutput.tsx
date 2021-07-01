import React from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { CompressorType } from "../compression/compressors";
import { computeData, Settings } from "../visualization/common";
import { PhrasesVisualization } from "../visualization/PhrasesVisualization";

interface CompressorOutputProps {
  input: string;
  type: CompressorType;
  settings: Settings;
}

export function CompressorOutput(props: CompressorOutputProps): JSX.Element {
  const { type, settings, input } = props;
  const data = computeData(type, input, settings);

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Row className="overflow-auto">
          <Col>
            <PhrasesVisualization data={data} />
          </Col>
        </Row>
        <Row>
          <Col>
            z = {data.phrases.length}
            {type === "rlz" ? ` (+ ${settings.reference.length})` : ""}
          </Col>
          <Col>l/z = {(input.length / data.phrases.length).toFixed(2)}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
