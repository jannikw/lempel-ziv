import { range, reverse, take } from "lodash";
import {
  compressLz77,
  compressRelz,
  compressRelzRecursive,
  compressRlz,
  compressRlzPrefix,
  compressWithSlidingWindow,
  Phrase,
  RelzRecPass,
  RlzPhrase,
} from "../compression/algorithms";
import { stringToCodePoints } from "../compression/utils";
import { CompressorType } from "../compression/compressors";

export type LzStep =
  | { type: "initial" }
  | { type: "compress"; phrase: number }
  | { type: "result" };

export interface LzLikeVisualizationData {
  type: "lz-like";
  input: string;
  phrases: Phrase[];
  steps: LzStep[];
  windowSize?: number;
  prefixLength?: number;
}

export interface RlzVisualizationData {
  type: "rlz";
  input: string;
  reference: string;
  phrases: RlzPhrase[];
  steps: LzStep[];
}

type RelzStep =
  | { type: "initial" }
  | { type: "compress-first"; phrase: number }
  | { type: "mapping" }
  | { type: "compress-second"; phrase: number }
  | { type: "back-mapping"; phrase: number };

export interface RelzVisualizationData {
  type: "relz";
  input: string;
  prefixLength: number;
  firstPassPhrases: Phrase[];
  metaSymbols: number[];
  metaSymbolPhrases: Phrase[];
  phrases: Phrase[];
  steps: RelzStep[];
}

type RelzRecStep =
  | { type: "initial" }
  | { type: "compress"; pass: number; phrase: number }
  | { type: "mapping"; pass: number }
  | { type: "back-mapping"; pass: number; suffixPhrase: number };

export interface RelzRecVisualizationData {
  type: "relz-rec";
  input: string;
  prefixLength: number;
  passes: RelzRecPass[];
  phrases: Phrase[];
  steps: RelzRecStep[];
}

export type VisualizationData =
  | LzLikeVisualizationData
  | RlzVisualizationData
  | RelzVisualizationData
  | RelzRecVisualizationData;

export interface Settings {
  windowSize: number;
  prefixSize: number;
  reference: string;
  recursionLimit: number;
}

type Partial<T> = {
  [P in keyof T]+?: T[P];
};

export function computeData(
  type: CompressorType,
  input: string,
  settings: Partial<Settings>
): VisualizationData {
  const codePoints = stringToCodePoints(input);
  if (type === "lz77") {
    const phrases = [...compressLz77(codePoints)];
    const steps: LzStep[] = [
      { type: "initial" },
      ...range(phrases.length).map((phrase) => ({
        type: "compress" as const,
        phrase,
      })),
      { type: "result" },
    ];
    return { type: "lz-like", input, steps, phrases };
  } else if (type === "lz-sw") {
    const phrases = [
      ...compressWithSlidingWindow(codePoints, settings.windowSize ?? 5),
    ];
    const steps: LzStep[] = [
      { type: "initial" },
      ...range(phrases.length).map((phrase) => ({
        type: "compress" as const,
        phrase,
      })),
      { type: "result" },
    ];
    return {
      type: "lz-like",
      input,
      phrases,
      windowSize: settings.windowSize,
      steps,
    };
  } else if (type === "rlz") {
    const { reference } = settings;
    const referenceCodePoints = stringToCodePoints(reference ?? "");
    const phrases = [...compressRlz(codePoints, referenceCodePoints)];
    const steps: LzStep[] = [
      { type: "initial" },
      ...range(phrases.length).map((phrase) => ({
        type: "compress" as const,
        phrase,
      })),
      { type: "result" },
    ];
    return {
      type: "rlz",
      input,
      reference: reference ?? "",
      phrases,
      steps,
    };
  } else if (type === "rlz-pref") {
    const [prefixPhrases, suffixPhrases] = [
      ...compressRlzPrefix(codePoints, settings.prefixSize ?? 5),
    ];
    const phrases = [...prefixPhrases, ...suffixPhrases];
    const steps: LzStep[] = [
      { type: "initial" },
      ...range(phrases.length).map((phrase) => ({
        type: "compress" as const,
        phrase,
      })),
      { type: "result" },
    ];
    return {
      type: "lz-like",
      input,
      phrases,
      prefixLength: settings.prefixSize,
      steps,
    };
  } else if (type === "relz") {
    const result = compressRelz(codePoints, settings.prefixSize ?? 5);
    const steps: RelzStep[] = [
      { type: "initial" },
      ...range(result.firstPassPhrases.length).map((phrase) => ({
        type: "compress-first" as const,
        phrase,
      })),
      { type: "mapping" },
      ...range(result.metaSymbolPhrases.length).map((phrase) => ({
        type: "compress-second" as const,
        phrase,
      })),
      ...range(result.phrases.length).map((phrase) => ({
        type: "back-mapping" as const,
        phrase,
      })),
    ];
    return {
      type: "relz",
      input,
      prefixLength: settings.prefixSize ?? 5,
      ...result,
      steps,
    };
  } else {
    const result = compressRelzRecursive(
      codePoints,
      settings.prefixSize ?? 5,
      settings.recursionLimit
    );
    const lastPass = result.passes.length - 1;
    const steps: RelzRecStep[] = [
      { type: "initial" },
      ...result.passes.flatMap((pass, i) => [
        ...pass.prefixPhrases.map((p, h) => ({
          type: "compress" as const,
          pass: i,
          phrase: h,
        })),
        ...pass.suffixPhrases.map((p, h) => ({
          type: "compress" as const,
          pass: i,
          phrase: h + pass.prefixPhrases.length,
        })),
        ...(i === lastPass ? [] : [{ type: "mapping" as const, pass: i }]),
      ]),
      ...reverse(take([...result.passes], result.passes.length - 1)).flatMap(
        (pass, i) =>
          pass.suffixPhrasesCompressed.map((p, h) => ({
            type: "back-mapping" as const,
            pass: result.passes.length - i - 2,
            suffixPhrase: h,
          }))
      ),
    ];
    return {
      type: "relz-rec",
      input,
      prefixLength: settings.prefixSize ?? 5,
      passes: result.passes,
      phrases: result.phrases,
      steps,
    };
  }
}
