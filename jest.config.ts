/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  displayName: 'creators',
  preset: '../../jest.preset.js',
  transform: {
    '.+\\.(css|svg|png|jpg|jpeg)$': 'jest-transform-stub',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/config/setupTests.ts',
    'jest-mock-console/dist/setupTestFramework.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['../../node_modules/(?!(refractor)/)'],
  coverageDirectory: '../../coverage/apps/creators',
  moduleNameMapper: {
    '.+\\.(css|svg|png|jpg|jpeg)$': 'jest-transform-stub',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
    '^react-dom$': 'preact/compat',
    '^react$': 'preact/compat',
    // Noop style files
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
    },
    SNIPPET_API_URL: '',
    SNIPPET_EVENTS_API_URL: '',
    SNIPPET_CREATORS_URL: '',
    SNIPPET_URL: '',
    SNIPPET_BRANCH_NAME: '',
    SNIPPET_IS_USING_APP_BLOCKS: '',
  },
}
