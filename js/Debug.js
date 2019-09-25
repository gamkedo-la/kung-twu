// Functions for testing stuff

const Debug = {
  /**
   * Assert if something is equal as expected or not and receive that result in the console
   * @param actual The actual value or reference
   * @param expected The expected value or reference
   * @param {string} testName The name of the test to log to the console
   */
  assertEqual: (actual, expected, testName = 'Debug Test') => {
    if (actual === expected) {
      console.trace('[' + testName + '] PASSED with expected:', expected);
    } else {
      console.trace('[' + testName + '] FAILED! Expected', expected, 'but got', actual);
    }
  }
}
