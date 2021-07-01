import { take } from "lodash";
import React from "react";
import { RlzVisualizationData } from "./common";
import {
  Character,
  SharedDefinitions,
  Arrow2,
  PhraseDisplayProps,
  CharacterProps,
  ArrowProps2,
  PhraseDisplay,
} from "./drawing";

export interface RlzVisualizationProps {
  data: RlzVisualizationData;
  step: number;
}

export function RlzVisualization(props: RlzVisualizationProps) {
  const { data, step } = props;
  const currentStep = data.steps[Math.min(step, data.steps.length - 1)];

  const refCharacters: CharacterProps[] = data.reference
    .split("")
    .map((c, i) => ({
      text: c,
      x: i * 30 + 30,
      y: 10,
    }));
  const characters: CharacterProps[] = data.input.split("").map((c, i) => ({
    text: c,
    x: i * 30 + 30,
    y: 90,
  }));
  const phrases: PhraseDisplayProps[] = [];
  let referenceArrow: ArrowProps2 | undefined = undefined;

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
        y: 125,
        l: 1,
        text,
      });
    } else {
      const text = `(${p.p},${p.l})`;
      phrases.push({
        x: pos * 30 + 30,
        y: 125,
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
        y1: 90,
        x2: phrase.p * 30 + 45,
        y2: 41,
      };
    }
    for (let i = 0; i < phrase.l; i++) {
      characters[phrase.pos + i].color = "target";
      if (phrase.type === "copy") {
        refCharacters[phrase.p + i].color = "source";
      }
    }
  }

  return (
    <svg
      height="200"
      width={Math.max(data.input.length, data.reference.length) * 30 + 60}
    >
      <SharedDefinitions></SharedDefinitions>

      {refCharacters.map((props, i) => (
        <Character key={i} {...props} />
      ))}

      {characters.map((props, i) => (
        <Character key={i} {...props} />
      ))}

      {referenceArrow && <Arrow2 {...referenceArrow} />}

      {phrases.map((props, i) => (
        <PhraseDisplay key={i} {...props} />
      ))}
    </svg>
  );
}
