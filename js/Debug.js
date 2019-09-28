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
  /**
	 * Type-checks a value to ensure it is a particular instanceof or typeof something. "null" is included.
	 * Throws an error if test fails, but this can be reduced to a console log in param throwError.
	 * Useful for checking parameters passed into a function, or any value at runtime during development. May be turned off by hard-coding value _DEBUG to false in class below.
	 * Note: Usually JavaScript evaluates typeof null to "object", but here we have added the ability to check "null".
	 * @param {any} checkValue The value/instance to check
	 * @param {Function | string} expectedType The class constructor function name or string typeof to check. e.g. KeySet, InputManager, "string", "object"
	 * @param {boolean} throwError (default: true) Throw an error to halt execution when parameter is not valid, otherwise just log result.
	 * @param {boolean} notifyOnValid (default: false) Sends a console log that indicates if test passed or not.
	 * @returns void
	 */
	isValid (checkValue, expectedType, throwError = true, notifyOnValid = false) {
		const _DEBUG = true; // Set to false to skip this function in entire codebase

		if (!_DEBUG) return;

		// First check that the expectedType is valid
		if (!expectedType && typeof expectedType !== "string" && typeof expectedType !== "function") {
			const validatorErrorMsg = "Could not check the validity of " +
			checkValue + "! The validator parameter must be a typeof string, or constructor function, but was actually a typeof " +
			typeof expectedType + "!";

			throw new Error(validatorErrorMsg);
		}

		// Checking that expectedType is a valid typeof value
    if (typeof expectedType === "string") {
			const typeofTypes = ["number", "undefined", "object", "boolean", "bigint", "string", "symbol", "function", "null"];
			let isAValidTypeofType = false;
			typeofTypes.forEach((type) => {
				if (expectedType === type) {
					isAValidTypeofType = true;
				}
			});

      if (!isAValidTypeofType) {
        throw new Error("Could not check the validity of " + checkValue + "! The validator parameter must be a valid evaluation of typeof or 'null'");
      }
    }

		// Check that the value is the expected type
		if (expectedType === "null" && checkValue === null || // This checks 'null'
      typeof expectedType === "function" && checkValue instanceof expectedType ||
			typeof expectedType === "string" && typeof checkValue === expectedType) 
		{
			// Success Condition
			if (notifyOnValid) {
				console.log("[TypeCheck in " + getFuncName() + "] PASSED\n", checkValue, "is " + 
				getValidatorTypeDesc(expectedType));
			}
		} else {
			// Error Condition
			const message = "[TypeCheck in " + getFuncName() + "] FAILED!\nWas expecting " + 
			getValidatorTypeDesc(expectedType) + ",\nbut got " + getActualTypeDesc(checkValue) + 
			"!\nCheck log above for actual value.";

			if (throwError) { // Throws error with actual value before
				console.log("Actual value:", checkValue);
				throw new Error("\n" + message);
			} else { // Just log a message with stack trace to the console
				console.trace(message, "\nActual value:", checkValue);
			}
		}

		// === Private Error Message Helpers ===
		function getValidatorTypeDesc(value) {
			return (typeof expectedType === "string")
      ? (expectedType === "null")
        ? "null"
        :"a typeof " + value
      : (typeof value === "object")
				? "an instanceof" + value.constructor.name
				: "an instanceof " + value.name;
		}
		function getActualTypeDesc(value) {
			return (typeof expectedType === "string")
      ? (expectedType === "null")
        ? "null"
        : typeof value
			: "an instanceof " + value.constructor.name;
		}
		function getFuncName() {
			const e = new Error();
			let funcName = 'isValidInstanceOf';
			if (e.stack) {
				// Get previous function name from the stack
				const retrievedFuncName = e.stack.split("\n")[3].trim().split(" ")[1];
				// Check that the name exists
				if (retrievedFuncName)  {
					funcName = retrievedFuncName;
				}
			}
			return funcName;
		}
	}
}
