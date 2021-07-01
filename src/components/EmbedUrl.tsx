import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import {
  availableCompressors,
  CompressorType,
} from "../compression/compressors";
import { Settings } from "../visualization/common";

interface EmbedUrlProps {
  type: CompressorType;
  input: string;
  settings: Settings;
  step: number;
}

export function EmbedUrl(props: EmbedUrlProps) {
  const { type, input, settings, step } = props;

  const [includeStep, setIncludeStep] = useState(true);
  const [embedVisualization, setEmbedVisualization] = useState(false);

  const currentQuery = new URLSearchParams();
  currentQuery.set("type", type);
  currentQuery.set("input", input);
  if (availableCompressors[type].needsPrefixSize) {
    currentQuery.set("prefix", String(settings.prefixSize));
  }
  if (availableCompressors[type].needsWindowSize) {
    currentQuery.set("window", String(settings.windowSize));
  }
  if (availableCompressors[type].needsRecursionLimit) {
    currentQuery.set("recursion", String(settings.recursionLimit));
  }
  if (availableCompressors[type].needsReference) {
    currentQuery.set("reference", settings.reference);
  }
  if (includeStep) {
    currentQuery.set("step", String(step));
  }

  const pathname = embedVisualization ? "/embed" : "/steps";
  const url = `${window.location.origin}${
    window.location.pathname
  }/#${pathname}?${currentQuery.toString()}`;

  return (
    <Card>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3">
            <FormControl value={url} readOnly />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => navigator.clipboard.writeText(url)}
              >
                Copy
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Check
            custom
            type="checkbox"
            label="Include current step"
            id="includeStep"
            onChange={(e) => setIncludeStep(e.target.checked)}
            checked={includeStep}
          />
          <Form.Check
            custom
            type="checkbox"
            label="Embed visualization"
            id="embed"
            onChange={(e) => setEmbedVisualization(e.target.checked)}
            checked={embedVisualization}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}
