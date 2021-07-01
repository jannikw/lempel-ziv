import {
  compressLz77,
  compressRelz,
  compressRelzRecursive,
  compressRlz,
  compressRlzPrefix,
  compressWithSlidingWindow,
  decompress,
  decompressRlz,
} from "./algorithms";
import fc from "fast-check";
import { stringToCodePoints } from "./utils";

describe("compressLz77", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (input) => {
        const phrases = [...compressLz77(input)];
        const output = decompress(phrases);
        expect(output).toStrictEqual(input);
      }),
      {
        examples: [[[1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 5, 5]]],
      }
    );
  });
});

describe("compressLz77WithSlidingWindow", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(0, 20),
        (input, windowSize) => {
          const phrases = [...compressWithSlidingWindow(input, windowSize)];
          const output = decompress(phrases);
          expect(output).toStrictEqual(input);
        }
      )
    );
  });
});

describe("compressRlz", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        (input, reference) => {
          const phrases = [...compressRlz(input, reference)];
          const output = decompressRlz(phrases, reference);
          expect(output).toStrictEqual(input);
        }
      )
    );
  });
});

describe("relative LZ using prefix", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(0, 20),
        (input, prefixLength) => {
          const [prefixPhrases, suffixPhrases] = compressRlzPrefix(
            input,
            prefixLength
          );
          const output = decompress([...prefixPhrases, ...suffixPhrases]);
          expect(output).toStrictEqual(input);
        }
      )
    );
  });
});

describe("ReLZ", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(0, 20),
        (input, prefixLength) => {
          const { phrases } = compressRelz(input, prefixLength);
          const output = decompress(phrases);
          expect(output).toStrictEqual(input);
        }
      ),
      {
        examples: [[stringToCodePoints("TAACCGTATGTCCAAGGTCCAA"), 8]],
      }
    );
  });
});

describe("ReLZ recursive", () => {
  test("compress then decompress results in input", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(1, 20),
        fc.integer(0, 30),
        (input, prefixLength, recursionLimit) => {
          const { phrases } = compressRelzRecursive(
            input,
            prefixLength,
            recursionLimit
          );
          const output = decompress(phrases);
          expect(output).toStrictEqual(input);
        }
      ),
      {
        examples: [[stringToCodePoints("TAACCGTATGTCCAAGGTCCAA"), 8]],
      }
    );
  });
});
