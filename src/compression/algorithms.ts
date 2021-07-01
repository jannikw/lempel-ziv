import { indexOfSubArray, lastIndexOfSubArray } from "./utils";
import { isEqual, sum, sumBy } from "lodash";

export type Phrase =
  | {
      type: "literal";
      symbol: number;
      pos: number;
      l: 1;
    }
  | {
      type: "copy";
      pos: number;
      p: number;
      l: number;
    };

export type RlzPhrase = { rlz: true } & (
  | {
      type: "literal";
      symbol: number;
      pos: number;
      l: 1;
    }
  | {
      type: "copy";
      pos: number;
      p: number;
      l: number;
    }
);

export function* compressLz77(input: number[]): Generator<Phrase> {
  let pos = 0;
  while (pos < input.length) {
    let phraseLength = 0;
    let lastOccurrence = 0;
    while (pos + phraseLength < input.length) {
      let currentPhrase = input.slice(pos, pos + phraseLength + 1);
      let currentOccurrence = lastIndexOfSubArray(
        input.slice(0, pos + phraseLength),
        currentPhrase
      );
      if (currentOccurrence !== -1) {
        phraseLength++;
        lastOccurrence = currentOccurrence;
      } else {
        break;
      }
    }

    if (phraseLength === 0) {
      yield { type: "literal", pos, symbol: input[pos], l: 1 };
      pos += 1;
    } else {
      yield { type: "copy", pos, p: lastOccurrence, l: phraseLength };
      pos += phraseLength;
    }
  }
}

export function* compressWithSlidingWindow(
  input: number[],
  windowSize: number
): Generator<Phrase> {
  let pos = 0;
  while (pos < input.length) {
    let phraseLength = 0;
    let lastOccurrence = 0;
    while (pos + phraseLength < input.length) {
      let currentPhrase = input.slice(pos, pos + phraseLength + 1);
      const windowStart = Math.max(0, pos - windowSize);
      let currentOccurrence = lastIndexOfSubArray(
        input.slice(
          windowStart,
          Math.min(windowStart + windowSize, pos + phraseLength)
        ),
        currentPhrase
      );
      if (currentOccurrence !== -1) {
        phraseLength++;
        lastOccurrence = currentOccurrence + windowStart;
      } else {
        break;
      }
    }

    if (phraseLength === 0) {
      yield { type: "literal", pos, symbol: input[pos], l: 1 };
      pos += 1;
    } else {
      yield { type: "copy", pos, p: lastOccurrence, l: phraseLength };
      pos += phraseLength;
    }
  }
}

export function decompress(phrases: Phrase[]): number[] {
  let output: number[] = [];
  for (const phrase of phrases) {
    if (phrase.type === "literal") {
      output.push(phrase.symbol);
    } else {
      for (let i = 0; i < phrase.l; i++) {
        output.push(output[phrase.p + i]);
      }
    }
  }

  return output;
}

export function* compressRlz(
  input: number[],
  reference: number[]
): Generator<RlzPhrase> {
  let pos = 0;
  while (pos < input.length) {
    let phraseLength = 0;
    let lastOccurrence = 0;
    while (pos + phraseLength < input.length) {
      let currentPhrase = input.slice(pos, pos + phraseLength + 1);
      let currentOccurrence = indexOfSubArray(reference, currentPhrase);
      if (currentOccurrence !== -1) {
        phraseLength++;
        lastOccurrence = currentOccurrence;
      } else {
        break;
      }
    }

    if (phraseLength === 0) {
      yield { rlz: true, type: "literal", pos, symbol: input[pos], l: 1 };
      pos += 1;
    } else {
      yield {
        rlz: true,
        type: "copy",
        pos,
        p: lastOccurrence,
        l: phraseLength,
      };
      pos += phraseLength;
    }
  }
}

export function decompressRlz(
  phrases: RlzPhrase[],
  reference: number[]
): number[] {
  let output: number[] = [];
  for (const phrase of phrases) {
    if (phrase.type === "literal") {
      output.push(phrase.symbol);
    } else {
      for (let i = 0; i < phrase.l; i++) {
        output.push(reference[phrase.p + i]);
      }
    }
  }

  return output;
}

export function compressRlzPrefix(
  input: number[],
  prefixLength: number
): [Phrase[], Phrase[]] {
  const prefixPhrases: Phrase[] = [];
  const suffixPhrases: Phrase[] = [];
  let pos = 0;
  while (pos < input.length) {
    let phraseLength = 0;
    let lastOccurrence = 0;
    while (pos + phraseLength < input.length) {
      let currentPhrase = input.slice(pos, pos + phraseLength + 1);
      let currentOccurrence = lastIndexOfSubArray(
        input.slice(0, Math.min(pos + phraseLength, prefixLength)),
        currentPhrase
      );
      if (
        currentOccurrence !== -1 &&
        (pos >= prefixLength || pos + phraseLength < prefixLength)
      ) {
        phraseLength++;
        lastOccurrence = currentOccurrence;
      } else {
        break;
      }
    }

    if (phraseLength === 0) {
      const phrase: Phrase = { type: "literal", pos, symbol: input[pos], l: 1 };
      if (pos < prefixLength) {
        prefixPhrases.push(phrase);
      } else {
        suffixPhrases.push(phrase);
      }
      pos += 1;
    } else {
      const phrase: Phrase = {
        type: "copy",
        pos,
        p: lastOccurrence,
        l: phraseLength,
      };
      if (pos < prefixLength) {
        prefixPhrases.push(phrase);
      } else {
        suffixPhrases.push(phrase);
      }
      pos += phraseLength;
    }
  }

  return [prefixPhrases, suffixPhrases];
}

export function relzMapping(
  input: Phrase[],
  reference: number[]
): [Map<number, Phrase>, number[]] {
  const symbolToPhraseMapping: Map<number, Phrase> = new Map();
  const contentToSymbolMapping: [number[], number][] = [];
  const mappedInput: number[] = [];

  function getMapping(phrase: Phrase): number {
    const currentContent =
      phrase.type === "literal"
        ? [phrase.symbol]
        : reference.slice(phrase.p, phrase.p + phrase.l);
    for (const [content, symbol] of contentToSymbolMapping) {
      if (isEqual(content, currentContent)) {
        return symbol;
      }
    }

    const newMetaSymbol = symbolToPhraseMapping.size;
    symbolToPhraseMapping.set(newMetaSymbol, phrase);
    contentToSymbolMapping.push([currentContent, newMetaSymbol]);
    return newMetaSymbol;
  }

  for (const phrase of input) {
    mappedInput.push(getMapping(phrase));
  }

  return [symbolToPhraseMapping, mappedInput];
}

function extractLzLikeParsing(
  phrases: Phrase[],
  mapping: Map<number, Phrase>,
  input: number[],
  positionOffset: number
): Phrase[] {
  const result: Phrase[] = [];

  for (let i = 0; i < phrases.length; i++) {
    const pos = sum(result.map((p) => p.l)) + positionOffset;
    const phrase = phrases[i];
    if (phrase.type === "literal") {
      const mappedPhrase = mapping.get(phrase.symbol);
      if (mappedPhrase === undefined) {
        throw new Error("no mapping for symbol " + phrase.symbol);
      }
      result.push({
        ...mappedPhrase,
        pos,
      });
    } else {
      const mappedPos =
        sumBy(
          input.slice(0, phrase.p).map((c) => mapping.get(c)),
          (p) => p!.l
        ) + positionOffset;
      const mappedLength = sumBy(
        input.slice(phrase.p, phrase.p + phrase.l).map((c) => mapping.get(c)),
        (p) => p!.l
      );

      result.push({ type: "copy", pos, p: mappedPos, l: mappedLength });
    }
  }

  return result;
}

interface RelzResult {
  firstPassPhrases: Phrase[];
  metaSymbols: number[];
  metaSymbolPhrases: Phrase[];
  phrases: Phrase[];
}

export function compressRelz(
  input: number[],
  prefixLength: number
): RelzResult {
  const [prefixPhrases, suffixPhrases] = [
    ...compressRlzPrefix(input, prefixLength),
  ];
  const firstPassPhrases = [...prefixPhrases, ...suffixPhrases];
  const [mapping, metaSymbols] = relzMapping(firstPassPhrases, input);
  const metaSymbolPhrases = [...compressLz77(metaSymbols)];
  const resultPhrases = extractLzLikeParsing(
    metaSymbolPhrases,
    mapping,
    metaSymbols,
    0
  );

  return {
    firstPassPhrases,
    metaSymbols,
    metaSymbolPhrases,
    phrases: resultPhrases,
  };
}

export interface RelzRecPass {
  input: number[];
  prefixPhrases: Phrase[];
  suffixPhrases: Phrase[];
  suffixMetaSymbols: number[];
  suffixMetaSymbolsPhrases: Phrase[];
  suffixPhrasesCompressed: Phrase[];
  phrasesCompressed: Phrase[];
}
export interface RelzRecursiveResult {
  passes: RelzRecPass[];
  phrases: Phrase[];
}

export function compressRelzRecursive(
  input: number[],
  prefixLength: number,
  recursionLimit: number | undefined = undefined
): RelzRecursiveResult {
  if (recursionLimit === 0) {
    return {
      passes: [],
      phrases: input.map((c, pos) => ({
        type: "literal",
        pos,
        symbol: c,
        l: 1,
      })),
    };
  }

  const [prefixPhrases, suffixPhrases] = [
    ...compressRlzPrefix(input, prefixLength),
  ];
  if (suffixPhrases.length > 0) {
    const [mapping, metaSymbols] = relzMapping(
      suffixPhrases,
      input.slice(0, prefixLength)
    );
    const result = compressRelzRecursive(
      metaSymbols,
      prefixLength,
      recursionLimit && recursionLimit - 1
    );
    const metaSymbolsPhrases = result.phrases;
    const suffixPhrasesCompressed = extractLzLikeParsing(
      metaSymbolsPhrases,
      mapping,
      metaSymbols,
      prefixLength
    );
    const phrases = [...prefixPhrases, ...suffixPhrasesCompressed];

    return {
      passes: [
        {
          input,
          prefixPhrases,
          suffixPhrases,
          suffixMetaSymbols: metaSymbols,
          suffixMetaSymbolsPhrases: metaSymbolsPhrases,
          suffixPhrasesCompressed,
          phrasesCompressed: phrases,
        },
        ...result.passes,
      ],
      phrases,
    };
  } else {
    return {
      passes: [
        {
          input,
          prefixPhrases,
          suffixPhrases: [],
          suffixMetaSymbols: [],
          suffixMetaSymbolsPhrases: [],
          suffixPhrasesCompressed: [],
          phrasesCompressed: prefixPhrases,
        },
      ],
      phrases: prefixPhrases,
    };
  }
}
