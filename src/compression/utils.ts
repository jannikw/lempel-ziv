export function indexOfSubArray<T>(array: T[], subarray: T[]): number {
  outer: for (let i = 0; i <= array.length - subarray.length; i++) {
    for (let h = 0; h < subarray.length; h++) {
      if (array[i + h] !== subarray[h]) {
        continue outer;
      }
    }
    return i;
  }

  return -1;
}

export function lastIndexOfSubArray<T>(array: T[], subarray: T[]): number {
  outer: for (let i = array.length - subarray.length; i >= 0; i--) {
    for (let h = 0; h < subarray.length; h++) {
      if (array[i + h] !== subarray[h]) {
        continue outer;
      }
    }
    return i;
  }

  return -1;
}

export function stringToCodePoints(input: string): number[] {
  const result = [];

  for (var i = 0; i < input.length; i++) {
    var codePoint = input.codePointAt(i);

    if (!codePoint) {
      break;
    }

    result.push(codePoint);
  }

  return result;
}

export function codePointsToString(...codePoints: number[]): string {
  return String.fromCodePoint(...codePoints);
}
