import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from "util";

if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}


global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
