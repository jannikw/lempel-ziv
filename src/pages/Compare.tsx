import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  availableCompressors,
  CompressorType,
} from "../compression/compressors";
import { CompressorSettingEditor } from "../components/CompressorSettingsEditor";
import { CompressorOutput } from "../components/CompressorOutput";
import FormControl from "react-bootstrap/esm/FormControl";
import { entries, keys } from "lodash";
import { Settings } from "../visualization/common";
import { useEmbedState, useQuery } from "../hooks";

export function Compare() {
  const [input, setInput] = useState("AAABBBCCCC");
  const [compressorType, setCompressorType] = useState<CompressorType>("lz77");
  const isEmebed = useEmbedState();
  const query = useQuery();
  const queryInput = query.get("input");
  useEffect(() => {
    if (queryInput !== null) {
      setInput(queryInput);
    }
  }, [queryInput]);

  const [compressorSettings, setCompressorSettings] = useState<
    [CompressorType, Settings][]
  >(
    keys(availableCompressors).map((type) => [
      type as CompressorType,
      { windowSize: 5, reference: "", prefixSize: 5, recursionLimit: 5 },
    ])
  );

  function addCompressor() {
    setCompressorSettings([
      ...compressorSettings,
      [
        compressorType,
        { windowSize: 5, reference: "", prefixSize: 5, recursionLimit: 5 },
      ],
    ]);
  }

  return (
    <Container className="my-5" fluid={isEmebed}>
      <Row>
        <Col>
          <Card>
            <Card.Header>Input</Card.Header>
            <Card.Body>
              <FormControl
                type="text"
                placeholder="Input Text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></FormControl>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg="4">
          <h2>Compressors</h2>
        </Col>
        <Col lg="8" className="d-none d-lg-block">
          <h2>Outputs</h2>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="4" lg="3">
          <Dropdown as={ButtonGroup} className="w-100">
            <Button onClick={addCompressor} className="w-75">
              {"Add " + availableCompressors[compressorType].title}
            </Button>

            <Dropdown.Toggle split />

            <Dropdown.Menu>
              {entries(availableCompressors).map(([type, { title }]) => (
                <Dropdown.Item
                  key={type}
                  onClick={() => setCompressorType(type as CompressorType)}
                >
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {compressorSettings.map(([type, settings], idx) => (
        <Row key={idx} className="mt-4">
          <Col xs="12" lg="4">
            <CompressorSettingEditor
              type={type}
              settings={settings}
              onChange={(newSettings) =>
                setCompressorSettings(
                  compressorSettings.map(([type, settings], i) =>
                    idx === i ? [type, newSettings] : [type, settings]
                  )
                )
              }
              remove={() =>
                setCompressorSettings(
                  compressorSettings.filter((v, i) => i !== idx)
                )
              }
            ></CompressorSettingEditor>
          </Col>
          <Col xs="12" lg="8" className="mt-1 mt-lg-0">
            <CompressorOutput
              type={type}
              settings={settings}
              input={input}
            ></CompressorOutput>
          </Col>
        </Row>
      ))}
      {compressorSettings.length === 0 && (
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <h4>No compressors added yet...</h4>
          </Col>
        </Row>
      )}
    </Container>
  );
}
