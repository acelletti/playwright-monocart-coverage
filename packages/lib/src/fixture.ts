import { addCoverageReport } from 'monocart-reporter';
import type { Page, TestType } from '@playwright/test';

export interface CoverageReportedFixtureArgs {
  coverageReportedFixture: string;
}

function extendWithCoverage<TestArgs extends {}, WorkerArgs extends {}, T extends TestType<TestArgs, WorkerArgs>, E>(
  testBase: T,
  expect: E
): { test: T; expect: E } {
  const test = testBase.extend<CoverageReportedFixtureArgs>({
    // @ts-expect-error TS2353
    coverageReportedFixture: [
      async ({ page }: { page: Page }, use: (arg: string) => Promise<void>) => {
        const info = testBase.info();
        const isChromium = info.project.name === 'chromium';

        if (isChromium) {
          await page.coverage.startJSCoverage({
            resetOnNavigation: false,
          });
        }

        await use('coverageReportedFixture');

        if (isChromium) {
          const coverageList = await page.coverage.stopJSCoverage();
          await addCoverageReport(coverageList, info);
        }
      },
      {
        scope: 'test',
        auto: true,
      },
    ],
  });

  // @ts-ignore
  return { test, expect };
}

export { extendWithCoverage };
