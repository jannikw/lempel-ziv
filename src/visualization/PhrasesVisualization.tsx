import React, { useState } from "react";
import { VisualizationData } from "./common";
import {
  Arrow,
  ArrowProps,
  Character,
  CharacterProps,
  PhraseDisplay,
  PhraseDisplayProps,
  SharedDefinitions,
} from "./drawing";

export interface PhrasesVisualizationProps {
  data: VisualizationData;
}

export function PhrasesVisualization(props: PhrasesVisualizationProps) {
  const { data } = props;
  const [highlightedPhraseIdx, setHighlightedPhraseIdx] = useState<number>();
  const highlightedPhrase =
    highlightedPhraseIdx !== undefined
      ? data.phrases[highlightedPhraseIdx]
      : undefined;

  const characters: CharacterProps[] = data.input.split("").map((c, i) => ({
    text: c,
    x: i * 30 + 30,
    y: 30,
  }));
  const phrases: PhraseDisplayProps[] = [];
  let referenceArrow: ArrowProps | undefined = undefined;

  if (data.type === "rlz") {
    data.phrases.forEach((p, i) => {
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
      for (let h = 0; h < p.l; h++) {
        characters[p.pos + h].onMouseEnter = () => setHighlightedPhraseIdx(i);
        characters[p.pos + h].onMouseLeave = () =>
          setHighlightedPhraseIdx(undefined);
      }
    });
  } else {
    data.phrases.forEach((p, i) => {
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
      for (let h = 0; h < p.l; h++) {
        characters[p.pos + h].onMouseEnter = () => setHighlightedPhraseIdx(i);
        characters[p.pos + h].onMouseLeave = () =>
          setHighlightedPhraseIdx(undefined);
      }
    });
  }

  if (highlightedPhrase) {
    for (let i = 0; i < highlightedPhrase.l; i++) {
      characters[highlightedPhrase.pos + i].color = "target";
      if (data.type !== "rlz" && highlightedPhrase.type === "copy") {
        if (characters[highlightedPhrase.p + i].color === "target") {
          characters[highlightedPhrase.p + i].color = "source-target";
        } else {
          characters[highlightedPhrase.p + i].color = "source";
        }
      }
    }

    if (data.type !== "rlz" && highlightedPhrase.type === "copy") {
      referenceArrow = {
        x1: highlightedPhrase.pos * 30 + 45,
        x2: highlightedPhrase.p * 30 + 45,
        y: 30,
      };
    }
  }

  const width = data.input.length * 30 + 60;
  const height = 120;

  return (
    <svg width={width} height={height}>
      <SharedDefinitions />

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
