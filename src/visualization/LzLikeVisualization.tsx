import { take } from "lodash";
import React from "react";
import { LzLikeVisualizationData } from "./common";
import {
  Arrow,
  ArrowProps,
  Character,
  CharacterProps,
  PhraseDisplay,
  PhraseDisplayProps,
  SharedDefinitions,
} from "./drawing";

export interface LzLikeVisualizationProps {
  data: LzLikeVisualizationData;
  step: number;
}

export function LzLikeVisualization(props: LzLikeVisualizationProps) {
  const { data, step } = props;
  const currentStep = data.steps[Math.min(step, data.steps.length - 1)];

  const characters: CharacterProps[] = data.input.split("").map((c, i) => ({
    text: c,
    x: i * 30 + 30,
    y: 30,
  }));
  const phrases: PhraseDisplayProps[] = [];
  let referenceArrow: ArrowProps | undefined = undefined;

  const phraseCount =
    currentStep.type === "compress"
      ? currentStep.phrase + 1
      : currentStep.type === "result"
      ? data.phrases.length
      : 0;
  take(data.phrases, phraseCount).forEach((p) => {
    const pos = p.pos;
    if (p.type === "literal") {
      const text = `(${String.fromCodePoint(p.symbol)},0)`;
      phrases.push({
        x: pos * 30 + 30,
        y: 65,
        l: 1,
        text,
      });
    } else {
      const text = `(${p.p},${p.l})`;
      phrases.push({
        x: pos * 30 + 30,
        y: 65,
        l: p.l,
        text,
      });
    }
  });

  if (currentStep.type === "compress") {
    const phrase = data.phrases[currentStep.phrase];
    if (phrase.type === "copy") {
      referenceArrow = {
        x1: phrase.pos * 30 + 45,
        x2: phrase.p * 30 + 45,
        y: 30,
      };
    }
    for (let i = 0; i < phrase.l; i++) {
      characters[phrase.pos + i].color = "target";
      if (phrase.type === "copy") {
        if (characters[phrase.p + i].color === "target") {
          characters[phrase.p + i].color = "source-target";
        } else {
          characters[phrase.p + i].color = "source";
        }
      }
    }
  }

  return (
    <svg height="160" width={data.input.length * 30 + 40}>
      <SharedDefinitions></SharedDefinitions>

      {characters.map((props, i) => (
        <Character key={i} {...props} />
      ))}

      {phrases.map((props, i) => (
        <PhraseDisplay key={i} {...props} />
      ))}

      {referenceArrow && <Arrow {...referenceArrow} />}
    </svg>
  );
}
