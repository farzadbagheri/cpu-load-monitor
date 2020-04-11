import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import {checkForHighLoad, checkForRecovery} from './utils/alert-logic';
import {highLoadData, recoveryData} from './test-constants';

test("should correctly identify high CPU load", () => {
  expect(checkForHighLoad(highLoadData)).toBe(true);
});

test("should correctly identify recovery after high CPU load ", () => {
  expect(checkForRecovery(recoveryData)).toBe(true);
});

