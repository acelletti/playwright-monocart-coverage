import { expect as expectBase, test as testBase } from '@playwright/test';
import { extendWithCoverage } from './fixture.ts';

const { expect, test } = extendWithCoverage(testBase, expectBase);

export { expect, test };
