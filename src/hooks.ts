import { keys } from "lodash";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  availableCompressors,
  CompressorType,
} from "./compression/compressors";
import { Settings } from "./visualization/common";

export function useQuery() {
  const location = useLocation();

  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export function useEmbedState(): boolean {
  const location = useLocation();
  const query = useQuery();
  return query.has("embed") || location.pathname === "/embed";
}

export function useSettingsFromQuery(): {
  type: CompressorType;
  input: string;
  step: number;
  settings: Settings;
} {
  const query = useQuery();
  const type = query.get("type");
  const input = query.get("input") ?? "AABCDDDCABBDBADDACB";
  const step = parseInt(query.get("step") ?? "0");
  const windowSize = query.get("window");
  const prefix = query.get("prefix");
  const recursion = query.get("recursion");
  const reference = query.get("reference");
  const settings: Settings = useMemo(
    () => ({
      windowSize: windowSize === null ? 5 : parseInt(windowSize),
      prefixSize: prefix === null ? 5 : parseInt(prefix),
      recursionLimit: recursion === null ? 5 : parseInt(recursion),
      reference: reference === null ? "" : reference,
    }),
    [windowSize, prefix, recursion, reference]
  );

  return useMemo(
    () =>
      type !== null && keys(availableCompressors).includes(type)
        ? { type: type as CompressorType, input, step, settings }
        : { type: "lz77", input, step, settings },
    [type, input, step, settings]
  );
}

export function useLocalStorage(
  key: string,
  defaultValue: any
): [any, (value: any) => void] {
  const stringValue = window.localStorage.getItem(key);
  function setValue(value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  if (stringValue !== null) {
    const value = JSON.parse(stringValue);
    return [value, setValue];
  }
  return [defaultValue, setValue];
}
