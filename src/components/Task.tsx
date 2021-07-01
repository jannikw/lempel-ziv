import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { some } from "lodash";
import React from "react";
import { ReactNode } from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";

export type TaskInput = (
  | {
      type: "number";
      initialValue: number;
      min?: number;
      max?: number;
      validate?: (value: number) => boolean;
    }
  | {
      type: "text";
      initialValue: string;
      validate?: (value: string) => boolean;
    }
) & { text: string };

export interface TaskDescription {
  text: string;
  inputs: TaskInput[];
  check: (input: any[]) => boolean;
  render: (input: any[]) => ReactNode;
}

export function validateTaskInputs(
  description: TaskDescription,
  inputs: any[]
) {
  const invalidValues = description.inputs.map((input, i) => {
    if (input.validate) {
      if (input.type === "number") {
        return !input.validate(inputs[i]);
      }
      if (input.type === "text") {
        return !input.validate(inputs[i]);
      }
    }

    return false;
  });

  return invalidValues;
}

export function checkTask(
  description: TaskDescription,
  inputs: any[]
): boolean {
  return (
    !some(validateTaskInputs(description, inputs)) && description.check(inputs)
  );
}

export interface TaskState {
  currentInputs: any[];
  done: boolean;
}

export interface TaskProps {
  description: TaskDescription;
  number: number;
  state: TaskState;
  onStateChanged: (state: TaskState) => void;
}

export function getInitialState(description: TaskDescription): TaskState {
  return {
    currentInputs: description.inputs.map((i) => i.initialValue),
    done: false,
  };
}

export function restoreStates(
  descriptions: TaskDescription[],
  data: any
): TaskState[] {
  const states: TaskState[] = [];

  for (let i = 0; i < descriptions.length; i++) {
    if (Array.isArray(data) && i < data.length) {
      if (data) {
      }
    }
  }
  return states;
}

export function Task(props: TaskProps) {
  const { description, number, state, onStateChanged } = props;
  const invalidValues = validateTaskInputs(description, state.currentInputs);

  function updateInput(inputIdx: number, input: any) {
    const newInputs = state.currentInputs.map((v, i) =>
      i === inputIdx ? input : v
    );
    const done = checkTask(description, newInputs);
    onStateChanged({
      currentInputs: newInputs,
      done,
    });
  }

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>Task {number}</Col>
          <Col className="d-flex justify-content-end">
            {state.done ? (
              <span className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} /> Correct
              </span>
            ) : (
              <span className="text-danger">
                <FontAwesomeIcon icon={faExclamationCircle} /> Wrong
              </span>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <p>{description.text}</p>
        <Form>
          {description.inputs.map((input, i) => (
            <Form.Group key={i} as={Row}>
              <Form.Label column xs="4">
                {input.text}
              </Form.Label>
              <Col xs="8">
                {input.type === "number" && (
                  <Form.Control
                    type="number"
                    min={input.min}
                    max={input.max}
                    value={state.currentInputs[i]}
                    onChange={(e) => updateInput(i, parseInt(e.target.value))}
                    isInvalid={invalidValues[i]}
                  />
                )}
                {input.type === "text" && (
                  <Form.Control
                    type="text"
                    value={state.currentInputs[i]}
                    onChange={(e) => updateInput(i, e.target.value)}
                    isInvalid={invalidValues[i]}
                  />
                )}
              </Col>
            </Form.Group>
          ))}
          {description.render(state.currentInputs)}
        </Form>
      </Card.Body>
    </Card>
  );
}
