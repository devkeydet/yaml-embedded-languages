import packageJson from "@package";

export const SUB_INCLUDE_CONFIG = "include";
export const INCLUDE_CONFIG = `${packageJson.name}.${SUB_INCLUDE_CONFIG}`;
export const VERSION_STATE = "version";

export type Languages = {
  [key: string]: {
    name: string;
    scopeName: string;
    stripIndent: boolean;
  };
};

/* eslint sort-keys: ["error", "asc"] */
export const LANGUAGES = {
  powerfx: {
    name: "javascript",
    scopeName: "source.js",
  },
};
