// # **Exercise 1: Type Enforcement with Explicit Types**
// Create a function `formatUserDetails` that:
// - Accepts three parameters:
//   - `userId` (number)
//   - `userName` (string)
//   - `isActive` (boolean)
// - Returns a formatted string: `"User [userId]: userName is currently active."` or `"User [userId]: userName is not active."`, depending on the `isActive` value.

  // **Expected Outcome:**
  // - Calling `formatUserDetails(101, "John Doe", true)` should return `"User [101]: John Doe is currently active."`
  // - TypeScript should throw errors if invalid types are passed.

  // solution
  function formatUserDetails(userId: number, userName: string, isActive: boolean): string {
    return `User [${userId}]: ${userName} is currently ${isActive ? 'active' : 'not active'}`;
  };
  const resultOne = formatUserDetails(101, 'John Doe', true);
  console.log(resultOne);
  const resultTwo = formatUserDetails(102, 'Jane Doe', false);
  console.log(resultTwo);


console.log('\r');
// # **Exercise 2: Using BigInt for Large Numbers**
// Create a function `calculateLargeSum` that:
// - Accepts two parameters of type `bigint`.
// - Returns their sum as a `bigint`.

// Define two large numbers (`n1` and `n2`) as `bigint`, call the function, and log the result.

  // **Expected Outcome:**
  // - If `n1 = 123456789012345678901234567890n` and `n2 = 987654321098765432109876543210n`, the result should log `1111111110111111111011111111100n`.

  // solution
  function calculateLargeSum(num1: bigint, num2: bigint): bigint {
    return num1 + num2;
  };
  const n1 = 123456789012345678901234567890n;
  const n2 = 987654321098765432109876543210n;
  const sumResult = calculateLargeSum(n1, n2);
  console.log(sumResult);


console.log('\r');
// # **Exercise 3: Working with Symbols**
// 1. Create two symbols:
//    - One with a description `"uniqueId"`.
//    - Another without any description.
// 2. Write a function `compareSymbols` that:
//    - Accepts two symbols and checks if they are the same.
//    - Returns a string `"Symbols are the same"` or `"Symbols are different"`.

  // **Expected Outcome:**
  // - Comparing any two symbols should return `"Symbols are different"`, as symbols are always unique.

  // solution
  function compareSymbols(sym1: symbol, sym2: symbol): string {
    if (sym1 === sym2) {
      return 'Symbols are the same';
    } else {
      return 'Symbols are different';
    }
  };
  const sym1 = Symbol('uniqueId');
  const sym2 = Symbol();
  const compareResult = compareSymbols(sym1, sym2);
  console.log(compareResult);


console.log('\r');
// # **Exercise 4: Error Handling in Type Assignment**
// Write a function `logTransaction` that:
// - Accepts a `transactionId` of type `number | string`.
// - If `transactionId` is a string, convert it to a number and log it.
// - Throw an error if `transactionId` cannot be converted to a valid number.

  // **Expected Outcome:**
  // - For input `1234`, it logs `1234`.
  // - For input `"5678"`, it logs `5678`.
  // - For input `"abc"`, it throws an error: `"Invalid transaction ID"`.

  // solution
  function logTransaction(transactionId: number | string) {
    try {
      if (typeof transactionId == 'string') {
        const converted = parseInt(transactionId);
        if (isNaN(converted)) {
          throw new Error('Invalid transaction ID');
        }
        transactionId = converted;
      }
      console.log(transactionId);
    } catch (err) {
      console.error(err.message);
    }
  };
  logTransaction(1);
  logTransaction('1234');
  logTransaction('5678');
  logTransaction('abc');


console.log('\r');
// # **Exercise 5: Preventing Implicit `any`**
// Enable `noImplicitAny` in your TypeScript configuration.

// 1. Define a function `parseJson` that:
//    - Takes a `jsonString` (string) as input.
//    - Parses the string into an object of type `{ key: string; value: number; }`.
//    - Throws an error if the parsed object does not match the expected type.

// 2. Test the function with the following:
//    - `parseJson('{"key": "example", "value": 42}')` → Should parse successfully.
//    - `parseJson('{"key": "test", "value": "invalid"}')` → Should throw an error.

  // **Expected Outcome:**
  // - Correctly parses valid JSON objects while enforcing the correct structure.

  // solution
  interface ValidObject {
    key: string;
    value: number;
  }

  function parseJson(jsonString: string): ValidObject {
    const parsed = JSON.parse(jsonString);

    if (typeof parsed.key === 'string' && typeof parsed.value === 'number') {
      return parsed;
    } else {
      throw new Error('Invalid JSON structure');
    }
  };

  let parseResult = parseJson('{"key": "example", "value": 42}');
  console.log(parseResult);

  try {
    parseResult = parseJson('{"key": "test", "value": "invalid"}');
    console.log(parseResult);
  } catch (err) {
    console.error(err.message);
  }