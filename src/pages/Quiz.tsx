import { faCheckDouble, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sumBy } from "lodash";
import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import {
  getInitialState,
  Task,
  TaskDescription,
  TaskState,
} from "../components/Task";
import { computeData } from "../visualization/common";
import { PhrasesVisualization } from "../visualization/PhrasesVisualization";

const tasks: TaskDescription[] = [
  {
    text: "Find a string that is at least 15 characters long and compresses to the same number of phrases using LZ77 and ReLZ. ReLZ must use prefix size between 3 and 6.",
    inputs: [
      {
        type: "text",
        text: "Input",
        initialValue: "ABC",
        validate(value: string) {
          return value.length >= 15;
        },
      },
      {
        type: "number",
        text: "Prefix Length",
        initialValue: 5,
        min: 3,
        max: 6,
        validate(value) {
          return value >= 3 && value <= 6;
        },
      },
    ],
    check([input, prefixSize]) {
      const lz77Data = computeData("lz77", input, {});
      const relzData = computeData("relz", input, {
        prefixSize,
      });
      return lz77Data.phrases.length === relzData.phrases.length;
    },
    render([input, prefixSize]) {
      const lz77Data = computeData("lz77", input, {});
      const relzData = computeData("relz", input, {
        prefixSize,
      });
      return (
        <>
          <Row>
            <Col xs="12" lg="2">
              LZ77 phrases:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={lz77Data} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="2">
              ReLZ phrases:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={relzData} />
            </Col>
          </Row>
        </>
      );
    },
  },
  {
    text: "Find a string that is at least 15 characters long and compresses better using ReLZ than with RLZ (using prefix as reference). The prefix size is set to 5 for both compressors.",
    inputs: [
      {
        type: "text",
        text: "Input",
        initialValue: "ABC",
        validate(value: string) {
          return value.length >= 15;
        },
      },
    ],
    check([input]) {
      const prefixSize = 5;
      const rlzPrefData = computeData("rlz-pref", input, { prefixSize });
      const relzData = computeData("relz", input, {
        prefixSize,
      });
      return rlzPrefData.phrases.length > relzData.phrases.length;
    },
    render([input]) {
      const prefixSize = 5;
      const rlzPrefData = computeData("rlz-pref", input, { prefixSize });
      const relzData = computeData("relz", input, {
        prefixSize,
      });
      return (
        <>
          <Row>
            <Col xs="12" lg="2">
              RLZ using prefix:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={rlzPrefData} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="2">
              ReLZ phrases:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={relzData} />
            </Col>
          </Row>
        </>
      );
    },
  },
  {
    text: "Find a string that is at least 15 characters long and LZ is able to compress to fewer than 8 phrases.",
    inputs: [
      {
        type: "text",
        text: "Input",
        initialValue: "ABC",
        validate(value: string) {
          return value.length >= 15;
        },
      },
    ],
    check([input]) {
      const data = computeData("lz77", input, {});
      return data.phrases.length < 8;
    },
    render([input]) {
      const data = computeData("lz77", input, {});
      return (
        <>
          <Row>
            <Col xs="12" lg="2">
              LZ phrases:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={data} />
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="2">
              Number of phrases:
            </Col>
            <Col className="overflow-auto">z = {data.phrases.length}</Col>
          </Row>
        </>
      );
    },
  },
  {
    text: "Find a reference string that allows the input to be compressed to fewer than 8 phrases.",
    inputs: [
      {
        type: "text",
        text: "Reference",
        initialValue: "ABC",
      },
    ],
    check([reference]) {
      const data = computeData("rlz", "AABBCDDEEDBBBF", { reference });
      return data.phrases.length < 8;
    },
    render([reference]) {
      const data = computeData("rlz", "AABBCDDEEDBBBF", { reference });
      return (
        <>
          <Row>
            <Col xs="12" lg="2">
              RLZ phrases:
            </Col>
            <Col className="overflow-auto">
              <PhrasesVisualization data={data} />
            </Col>
          </Row>
        </>
      );
    },
  },
];

export function Quiz() {
  const [states, setStates] = useState(tasks.map(getInitialState));
  const finishedTaskCount = sumBy(states, (s) => (s.done ? 1 : 0));
  const allTasksDone = tasks.length === finishedTaskCount;

  function updateState(taskIdx: number, state: TaskState) {
    setStates(states.map((v, i) => (i === taskIdx ? state : v)));
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faTasks} /> Tasks
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  {allTasksDone
                    ? "All tasks done! 🥳"
                    : "There are still tasks left to complete:"}
                </Col>
                <Col className="d-flex justify-content-end">
                  <span>
                    {finishedTaskCount} / {tasks.length} Completed
                    <FontAwesomeIcon icon={faCheckDouble} className="ml-2" />
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul>
                    {states.map(({ done }, i) =>
                      done ? (
                        <Fragment key={i}></Fragment>
                      ) : (
                        <li key={i}>Task {i + 1}</li>
                      )
                    )}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {tasks.map((task, i) => (
        <Row key={i} className="mt-3">
          <Col>
            <Task
              description={task}
              number={i + 1}
              state={states[i]}
              onStateChanged={(state) => updateState(i, state)}
            ></Task>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
