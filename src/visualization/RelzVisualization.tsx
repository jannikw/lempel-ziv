import { take } from "lodash";
import React from "react";
import { RelzVisualizationData } from "./common";
import {
  Arrow,
  Character,
  SharedDefinitions,
  Arrow2,
  PhraseDisplayProps,
  ArrowProps2,
  PhraseDisplay,
  ArrowProps,
  CharacterProps,
} from "./drawing";

export interface RelzVisualizationProps {
  data: RelzVisualizationData;
  step: number;
}

export function RelzVisualization(props: RelzVisualizationProps) {
  const { data, step } = props;
  const { input } = data;
  const currentStep = data.steps[Math.min(step, data.steps.length - 1)];
  console.log(currentStep);

  const characters: CharacterProps[] = input.split("").map((c, i) => ({
    x: i * 30 + 30,
    y: 30,
    text: c,
    color: "none",
  }));
  const metaSymbols: CharacterProps[] =
    currentStep.type !== "initial" && currentStep.type !== "compress-first"
      ? data.metaSymbols.map((c, i) => ({
          x: i * 30 + 30,
          y: 240,
          text: String(c),
          color: "none",
        }))
      : [];

  const phrases: PhraseDisplayProps[] = [];
  const mappingArrows: ArrowProps2[] = [];
  let referenceArrow: ArrowProps | undefined = undefined;

  const [phrasesVisible, metaPhrasesVisible, compressedPhrasesVisible] =
    currentStep.type === "initial"
      ? [0, 0, 0]
      : currentStep.type === "compress-first"
      ? [currentStep.phrase + 1, 0, 0]
      : currentStep.type === "mapping"
      ? [data.firstPassPhrases.length, 0, 0]
      : currentStep.type === "compress-second"
      ? [data.firstPassPhrases.length, currentStep.phrase + 1, 0]
      : [
          data.firstPassPhrases.length,
          data.metaSymbolPhrases.length,
          currentStep.phrase + 1,
        ];

  take(data.firstPassPhrases, phrasesVisible).forEach((p) => {
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

  take(data.metaSymbolPhrases, metaPhrasesVisible).forEach((p) => {
    const pos = p.pos;
    if (p.type === "literal") {
      const text = `(${p.symbol},0)`;
      phrases.push({
        x: pos * 30 + 30,
        y: 280,
        l: 1,
        text,
      });
    } else {
      const text = `(${p.p},${p.l})`;
      phrases.push({
        x: pos * 30 + 30,
        y: 280,
        l: p.l,
        text,
      });
    }
  });

  take(data.phrases, compressedPhrasesVisible).forEach((p, i) => {
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

    const metaPhrase = data.metaSymbolPhrases[i];
    mappingArrows.push({
      x1: metaPhrase.pos * 30 + 30 + metaPhrase.l * 15,
      y1: 240,
      x2: p.pos * 30 + 30 + p.l * 15,
      y2: 210,
      straight: true,
    });
  });

  if (currentStep.type === "compress-first") {
    const phrase = data.firstPassPhrases[currentStep.phrase];
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

  if (currentStep.type === "compress-second") {
    const phrase = data.metaSymbolPhrases[currentStep.phrase];
    if (phrase.type === "copy") {
      referenceArrow = {
        x1: phrase.pos * 30 + 45,
        x2: phrase.p * 30 + 45,
        y: 240,
      };
    }
    for (let i = 0; i < phrase.l; i++) {
      metaSymbols[phrase.pos + i].color = "target";
      if (phrase.type === "copy") {
        if (metaSymbols[phrase.p + i].color === "target") {
          metaSymbols[phrase.p + i].color = "source-target";
        } else {
          metaSymbols[phrase.p + i].color = "source";
        }
      }
    }
  }

  if (currentStep.type === "mapping") {
    data.firstPassPhrases.forEach((p, i) => {
      mappingArrows.push({
        x1: p.pos * 30 + 30 + p.l * 15,
        y1: 110,
        x2: i * 30 + +45,
        y2: 240,
        straight: true,
      });
    });
  }

  return (
    <svg height="350" width={data.input.length * 30 + 60}>
      <SharedDefinitions></SharedDefinitions>

      <SharedDefinitions></SharedDefinitions>

      {characters.map((props, i) => (
        <Character key={i} {...props} />
      ))}

      {metaSymbols.map((props, i) => (
        <Character key={i} {...props} />
      ))}

      {phrases.map((props, i) => (
        <PhraseDisplay key={i} {...props} />
      ))}

      {referenceArrow && <Arrow {...referenceArrow} />}

      {mappingArrows.map((props, i) => (
        <Arrow2 key={i} {...props} straight></Arrow2>
      ))}

      {currentStep.type === "back-mapping" && (
        <line
          x1="30"
          y1="115"
          x2={input.length * 30 + 30}
          y2="115"
          stroke="black"
        />
      )}
      {currentStep.type === "back-mapping" && (
        <line
          x1="30"
          y1="119"
          x2={input.length * 30 + 30}
          y2="119"
          stroke="black"
        />
      )}
    </svg>
  );
}
