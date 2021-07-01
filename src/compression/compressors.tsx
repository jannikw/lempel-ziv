export type CompressorType =
  | "lz77"
  | "lz-sw"
  | "rlz"
  | "rlz-pref"
  | "relz"
  | "relz-rec";

export type CompressorSettings =
  | {
      type: "lz77";
    }
  | {
      type: "lz-sw";
      windowSize?: number;
    }
  | {
      type: "rlz";
      reference: string;
    }
  | {
      type: "rlz-pref";
      prefixLength: number;
    }
  | {
      type: "relz";
      prefixLength: number;
    }
  | {
      type: "relz-rec";
      prefixLength: number;
      recursionLimit?: number;
    };

export function initialCompressorSettings(
  type: CompressorType
): CompressorSettings {
  if (type === "lz77") {
    return { type: "lz77" };
  } else if (type === "lz-sw") {
    return { type: "lz-sw", windowSize: 5 };
  } else if (type === "rlz") {
    return { type: "rlz", reference: "" };
  } else if (type === "rlz-pref") {
    return { type: "rlz-pref", prefixLength: 5 };
  } else if (type === "relz") {
    return { type: "relz", prefixLength: 5 };
  } /* else if (type === "relz-rec") */ else {
    return { type: "relz-rec", prefixLength: 5 };
  }
}

export interface Compressor {
  type: CompressorType;
  title: string;
  needsReference: boolean;
  needsPrefixSize: boolean;
  needsWindowSize: boolean;
  needsRecursionLimit: boolean;
}

export const availableCompressors: { [type in CompressorType]: Compressor } = {
  lz77: {
    type: "lz77",
    title: "LZ77",
    needsReference: false,
    needsPrefixSize: false,
    needsWindowSize: false,
    needsRecursionLimit: false,
  },
  "lz-sw": {
    type: "lz-sw",
    title: "LZ with sliding window",
    needsReference: false,
    needsPrefixSize: false,
    needsWindowSize: true,
    needsRecursionLimit: false,
  },
  rlz: {
    type: "rlz",
    title: "RLZ",
    needsReference: true,
    needsPrefixSize: false,
    needsWindowSize: false,
    needsRecursionLimit: false,
  },
  "rlz-pref": {
    type: "rlz-pref",
    title: "RLZ using prefix",
    needsReference: false,
    needsPrefixSize: true,
    needsWindowSize: false,
    needsRecursionLimit: false,
  },
  relz: {
    type: "relz",
    title: "ReLZ",
    needsReference: false,
    needsPrefixSize: true,
    needsWindowSize: false,
    needsRecursionLimit: false,
  },
  "relz-rec": {
    type: "relz-rec",
    title: "Recursive ReLZ",
    needsReference: false,
    needsPrefixSize: true,
    needsWindowSize: false,
    needsRecursionLimit: true,
  },
};
