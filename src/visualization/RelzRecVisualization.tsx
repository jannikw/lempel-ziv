import { drop, dropWhile, last, sum, take } from "lodash";
import React from "react";
import { RelzRecVisualizationData } from "./common";
import {
  Arrow,
  Arrow2,
  ArrowProps,
  ArrowProps2,
  Character,
  CharacterProps,
  PhraseDisplay,
  PhraseDisplayProps,
  SharedDefinitions,
} from "./drawing";

export interface RelzRecVisualizationProps {
  data: RelzRecVisualizationData;
  step: number;
}

export function RelzRecVisualization(props: RelzRecVisualizationProps) {
  const { data, step: currentPhrase } = props;
  const { passes, prefixLength } = data;
  const lineDistance = 120;
  const step = data.steps[Math.min(currentPhrase, data.steps.length - 1)];

  const passOffsets = passes.reduce(
    (lengths: number[], pass) => {
      const length =
        (last(lengths) ?? 0) + sum(pass.prefixPhrases.map((p) => p.l));
      return [...lengths, length];
    },
    [0]
  );

  const [
    passesVisible,
    phrasesVisible,
    mappingsVisible,
    currentBackMappingPass,
  ] =
    step.type === "initial"
      ? [1, 0, 0, 0]
      : step.type === "compress"
      ? [step.pass + 1, step.phrase + 1, step.pass - 1]
      : step.type === "mapping"
      ? [step.pass + 2, 0, step.pass + 1]
      : [passes.length, prefixLength, 0, step.pass, step.suffixPhrase];
  const characters: CharacterProps[][] = take(passes, passesVisible).map(
    ({ input }, i) =>
      input.map((c, h) => ({
        x: h * 30 + passOffsets[i] * 30 + 30,
        y: i * lineDistance + 30,
        text: i === 0 ? String.fromCodePoint(c) : String(c),
        color: "none",
      }))
  );

  const phraseDisplays: PhraseDisplayProps[] = [];
  const mappingArrows: ArrowProps2[] = [];
  let referenceArrow: ArrowProps | undefined = undefined;

  if (step.type === "compress") {
    const allPhrases = [
      ...passes[step.pass].prefixPhrases,
      ...passes[step.pass].suffixPhrases,
    ];
    const phrase = allPhrases[step.phrase];
    if (phrase.type === "copy") {
      referenceArrow = {
        x1: phrase.pos * 30 + passOffsets[step.pass] * 30 + 45,
        x2: phrase.p * 30 + passOffsets[step.pass] * 30 + 45,
        y: step.pass * lineDistance + 30,
      };
      for (let i = 0; i < phrase.l; i++) {
        characters[step.pass][phrase.pos + i].color = "target";
        if (characters[step.pass][phrase.p + i].color === "target") {
          characters[step.pass][phrase.p + i].color = "source-target";
        } else {
          characters[step.pass][phrase.p + i].color = "source";
        }
      }
    } else {
      characters[step.pass][phrase.pos].color = "target";
    }
  }

  if (step.type === "back-mapping") {
    const phrase = passes[step.pass].suffixPhrasesCompressed[step.suffixPhrase];
    drop(passes, currentBackMappingPass).forEach((pass, i) => {
      const passIdx = i + step.pass;
      take(
        pass.suffixPhrasesCompressed,
        passIdx === step.pass
          ? step.suffixPhrase + 1
          : passes[passIdx].suffixPhrasesCompressed.length
      ).forEach((p, pi) => {
        const pos = p.pos;
        if (p.type === "literal") {
          const text = `(${
            passIdx === 0 ? String.fromCodePoint(p.symbol) : String(p.symbol)
          },0)`;
          phraseDisplays.push({
            x: pos * 30 + passOffsets[passIdx] * 30 + 30,
            y: 65 + lineDistance * passIdx,
            l: 1,
            text,
          });
        } else {
          const text = `(${p.p},${p.l})`;
          phraseDisplays.push({
            x: pos * 30 + passOffsets[passIdx] * 30 + 30,
            y: 65 + lineDistance * passIdx,
            l: p.l,
            text,
          });
        }

        if (passes.length > passIdx + 1) {
          const metaPhrase = passes[passIdx + 1].phrasesCompressed[pi];
          mappingArrows.push({
            x1:
              metaPhrase.pos * 30 +
              30 +
              metaPhrase.l * 15 +
              passOffsets[passIdx + 1] * 30,
            y1: 150 + passIdx * lineDistance,
            x2: p.pos * 30 + 30 + p.l * 15 + passOffsets[passIdx] * 30,
            y2: 140 + passIdx * lineDistance,
            straight: true,
          });
        }
      });
      dropWhile(
        pass.suffixPhrases,
        (p) => passIdx !== step.pass || p.pos < phrase.pos + phrase.l
      ).forEach((p) => {
        const pos = p.pos;
        if (p.type === "literal") {
          const text = `(${
            passIdx === 0 ? String.fromCodePoint(p.symbol) : String(p.symbol)
          },0)`;
          phraseDisplays.push({
            x: pos * 30 + passOffsets[passIdx] * 30 + 30,
            y: 65 + lineDistance * passIdx,
            l: 1,
            text,
          });
        } else {
          const text = `(${p.p},${p.l})`;
          phraseDisplays.push({
            x: pos * 30 + passOffsets[passIdx] * 30 + 30,
            y: 65 + lineDistance * passIdx,
            l: p.l,
            text,
          });
        }
      });
    });
  }

  take(passes, passesVisible).forEach((pass, i) => {
    take(
      pass.prefixPhrases,
      i === passesVisible - 1 ? phrasesVisible : pass.prefixPhrases.length
    ).forEach((p) => {
      const { pos } = p;
      if (p.type === "literal") {
        const text = `(${
          i === 0 ? String.fromCodePoint(p.symbol) : String(p.symbol)
        },0)`;
        phraseDisplays.push({
          x: pos * 30 + passOffsets[i] * 30 + 30,
          y: 65 + lineDistance * i,
          l: 1,
          text,
        });
      } else {
        const text = `(${p.p},${p.l})`;
        phraseDisplays.push({
          x: pos * 30 + passOffsets[i] * 30 + 30,
          y: 65 + lineDistance * i,
          l: p.l,
          text,
        });
      }
    });
    take(
      pass.suffixPhrases,
      i === passesVisible - 1
        ? phrasesVisible - pass.prefixPhrases.length
        : currentBackMappingPass !== undefined && i >= currentBackMappingPass
        ? 0
        : pass.suffixPhrases.length
    ).forEach((p) => {
      const pos = p.pos;
      if (p.type === "literal") {
        const text = `(${
          i === 0 ? String.fromCodePoint(p.symbol) : String(p.symbol)
        },0)`;
        phraseDisplays.push({
          x: pos * 30 + passOffsets[i] * 30 + 30,
          y: 65 + lineDistance * i,
          l: 1,
          text,
        });
      } else {
        const text = `(${p.p},${p.l})`;
        phraseDisplays.push({
          x: pos * 30 + passOffsets[i] * 30 + 30,
          y: 65 + lineDistance * i,
          l: p.l,
          text,
        });
      }
    });
  });

  take(passes, mappingsVisible).forEach((pass, i) =>
    pass.suffixPhrases.forEach((p, pi) => {
      mappingArrows.push({
        x1: p.pos * 30 + 30 + p.l * 15 + passOffsets[i] * 30,
        y1: 100 + i * lineDistance,
        x2: pi * 30 + passOffsets[i + 1] * 30 + 45,
        y2: 150 + i * lineDistance,
        straight: true,
      });
    })
  );

  return (
    <svg
      height={passes.length * lineDistance}
      width={data.input.length * 30 + 60}
    >
      <SharedDefinitions></SharedDefinitions>

      {characters.map((passCharacters, i) =>
        passCharacters.map((props, h) => (
          <Character key={`${i}+${h}`} {...props}></Character>
        ))
      )}

      {phraseDisplays.map((props, i) => (
        <PhraseDisplay key={i} {...props}></PhraseDisplay>
      ))}

      {mappingArrows.map((props, i) => (
        <Arrow2 key={i} {...props}></Arrow2>
      ))}

      {referenceArrow && <Arrow {...referenceArrow}></Arrow>}
    </svg>
  );
}
