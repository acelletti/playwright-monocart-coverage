import { expect as expectBase, test as testBase } from '@playwright/experimental-ct-svelte';
import { extendWithCoverage } from './fixture.ts';

const { expect, test } = extendWithCoverage(testBase, expectBase);

export { expect, test };
