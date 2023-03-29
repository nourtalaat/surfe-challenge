module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
