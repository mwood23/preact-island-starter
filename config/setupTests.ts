// The preact preset isn't working right: https://github.com/preactjs/jest-preset-preact/issues/11
// Solution: https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
import 'regenerator-runtime/runtime'
import 'jest-localstorage-mock'
import '@testing-library/jest-dom'
