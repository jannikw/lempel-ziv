import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import {
  availableCompressors,
  CompressorType,
} from "../compression/compressors";
import { Settings } from "../visualization/common";

interface CompressorSettingsEditorProps {
  type: CompressorType;
  settings: Settings;
  onChange?: (settings: Settings) => void;
  remove?: () => void;
}

export function CompressorSettingEditor(
  props: CompressorSettingsEditorProps
): JSX.Element {
  const { type, settings } = props;

  function update(settings: Settings) {
    if (props.onChange) {
      props.onChange(settings);
    }
  }

  const compressor = availableCompressors[type];

  return (
    <Card className="h-100">
      <Card.Header>
        <Row className="d-flex align-items-center">
          <Col>
            <h6>{compressor.title}</h6>
          </Col>
          <Col>
            <Button
              variant="outline-danger"
              className="float-right"
              size="sm"
              onClick={() => props.remove && props.remove()}
            >
              Remove <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {type === "lz77" && "no settings"}
        <Form>
          {compressor.needsWindowSize && (
            <Form.Group as={Row}>
              <Form.Label column xs="4">
                Window Size
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  type="number"
                  value={settings.windowSize}
                  min={0}
                  onChange={(e) =>
                    update({
                      ...settings,
                      windowSize: parseInt(e.target.value),
                    })
                  }
                />
              </Col>
            </Form.Group>
          )}
          {compressor.needsPrefixSize && (
            <Form.Group as={Row}>
              <Form.Label column xs="4">
                Prefix Length
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  type="number"
                  value={settings.prefixSize}
                  min={0}
                  onChange={(e) =>
                    update({
                      ...settings,
                      prefixSize: parseInt(e.target.value),
                    })
                  }
                />
              </Col>
            </Form.Group>
          )}
          {compressor.needsRecursionLimit && (
            <Form.Group as={Row}>
              <Form.Label column xs="4">
                Recursion Limit
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  type="number"
                  value={settings.recursionLimit}
                  min={0}
                  onChange={(e) =>
                    update({
                      ...settings,
                      recursionLimit: parseInt(e.target.value),
                    })
                  }
                />
              </Col>
            </Form.Group>
          )}
          {compressor.needsReference && (
            <Form.Group as={Row}>
              <Form.Label column xs="4">
                Reference String
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  type="text"
                  value={settings.reference}
                  onChange={(e) =>
                    update({
                      ...settings,
                      reference: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}
