import React from "react";
import Container from "react-bootstrap/esm/Container";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Container className="mt-5">
      <Jumbotron>
        <h1>Lempel-Ziv Playground</h1>
        <p>
          This page lets you play around with the original Lempel-Ziv algorithm
          from 1977 and other variants of the algorithm. You can compare
          different Lempel-Ziv variants with each other{" "}
          <Link to="/compare">here</Link> and find out what parameters work well
          on different inputs. You can go through the compression process step
          by step for each algorithm and see how an input is processed{" "}
          <Link to="/slides">here</Link>. Finally, you can take a quiz on the
          algorithms and think about some properties of the algorithms{" "}
          <Link to="/quiz">here</Link>.
        </p>
      </Jumbotron>
    </Container>
  );
}
