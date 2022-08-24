/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  displayName: 'starter',
  transform: {
    '.+\\.(svg|png|jpg|jpeg)$': 'jest-transform-stub',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/config/setupTests.ts',
    'jest-mock-console/dist/setupTestFramework.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['../../node_modules/(?!(refractor)/)'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '.+\\.(svg|png|jpg|jpeg)$': 'jest-transform-stub',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
    '^react-dom$': 'preact/compat',
    '^react$': 'preact/compat',
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
      babelConfig: {
        comments: false,
        plugins: ['@vanilla-extract/babel-plugin'],
      },
    },
    ISLAND_API_URL: 'https://pokeapi.co/api/v2',
  },
}
