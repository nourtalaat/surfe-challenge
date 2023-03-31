module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ['**/*.spec.ts?(x)'],
  testTimeout: 15000,
};
