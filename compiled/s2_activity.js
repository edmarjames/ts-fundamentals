"use strict";
// ### **Exercise 1: Working with `any` and `unknown` Types**
// 1. Create a function `processInput` that:
//    - Accepts a parameter `input` of type `any`.
//    - If `input` is a string, return the string in uppercase.
//    - If `input` is a number, return the square of the number.
//    - For any other type, return the string `"Unsupported type"`.
// 2. Rewrite the function using `unknown` instead of `any`, and ensure type checks are added before processing.
// **Expected Outcome:**
// - `processInput("hello")` → `"HELLO"`
// - `processInput(5)` → `25`
// - `processInput(true)` → `"Unsupported type"`
// solution
function processInput(input) {
    if (typeof input === 'string') {
        return input.toUpperCase();
    }
    else if (typeof input === 'number') {
        return input * input;
    }
    else {
        return 'Unsupported type';
    }
}
;
const test = [
    processInput('hello'),
    processInput(5),
    processInput(true)
];
console.log('>>> Any');
for (let result of test) {
    console.log(result);
}
;
console.log('\r');
function processInputUnknown(input) {
    if (typeof input === 'string') {
        return input.toUpperCase();
    }
    else if (typeof input === 'number') {
        return input * input;
    }
    else {
        return 'Unsupported type';
    }
}
;
const testUnknown = [
    processInputUnknown('hello'),
    processInputUnknown(5),
    processInputUnknown(true)
];
console.log('>>> Unknown');
for (let result of testUnknown) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 2: Implementing a Function with `never`**
// 1. Write a function `handleError` that:
//    - Accepts a `message` of type `string`.
//    - Throws an error with the provided `message`.
//    - The function should have a return type of `never`.
// 2. Test the function by calling it with an appropriate error message.
// **Expected Outcome:**
// - Calling `handleError("Critical failure!")` should throw an error: `"Critical failure!"`.
// - The function should not return any value.
// solution
function handleError(message) {
    throw new Error(message);
}
;
try {
    handleError('Critical failure!');
}
catch (err) {
    console.log(err.message);
}
console.log('\r');
// ### **Exercise 3: Handling `undefined` and `null` with Strict Null Checks**
// 1. Create a function `getValueLength` that:
//    - Accepts a parameter `value` of type `string | null | undefined`.
//    - Returns the length of the string if `value` is a string.
//    - Returns `0` if `value` is `null` or `undefined`.
// 2. Modify your `tsconfig.json` to enable `strictNullChecks`, then ensure your function works as expected.
// **Expected Outcome:**
// - `getValueLength("TypeScript")` → `10`
// - `getValueLength(null)` → `0`
// - `getValueLength(undefined)` → `0`
// solution
function getValueLength(value) {
    if (typeof value === 'string') {
        return value.length;
    }
    else {
        return 0;
    }
}
;
const getValueLengthResult = [
    getValueLength('TypeScript'),
    getValueLength(null),
    getValueLength(undefined)
];
for (let result of getValueLengthResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 4: Enforcing Array Type and Operations**
// 1. Create a function `addToNumbersArray` that:
//    - Accepts two parameters:
//      - `arr` of type `number[]`.
//      - `value` of type `number`.
//    - Adds `value` to the array only if it is a positive number.
//    - Returns the updated array.
// **Expected Outcome:**
// - `addToNumbersArray([1, 2, 3], 4)` → `[1, 2, 3, 4]`
// - `addToNumbersArray([1, 2, 3], -1)` → `[1, 2, 3]`
// solution
function addToNumbersArray(arr, value) {
    let num = Math.sign(value);
    if (num !== -1) {
        arr.push(value);
    }
    return arr;
}
const addToNumbersArrayResult = [
    addToNumbersArray([1, 2, 3], 4),
    addToNumbersArray([1, 2, 3], -1)
];
for (let result of addToNumbersArrayResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 5: Working with Readonly Arrays**
// 1. Create a function `duplicateArray` that:
//    - Accepts a parameter `arr` of type `readonly string[]`.
//    - Returns a new array where each string in the original array is duplicated (e.g., `"hello"` becomes `"hellohello"`).
// 2. Test the function with a `readonly` array.
// **Expected Outcome:**
// - `duplicateArray(["foo", "bar"])` → `["foofoo", "barbar"]`
// - Attempting to modify the original array should throw an error due to `readonly`.
// solution
function duplicateArray(arr) {
    return arr.map(str => `${str}${str}`);
}
const duplicateArrayResult = duplicateArray(['foo', 'bar']);
console.log(duplicateArrayResult);
console.log('\r');
// ### **Exercise 6: Type Inference and Mixed Arrays**
// 1. Create a function `filterMixedArray` that:
//    - Accepts an array `arr` of inferred type `(string | number)[]`.
//    - Returns two arrays:
//      - One containing only strings.
//      - One containing only numbers.
// 2. Test the function with a mixed array.
// **Expected Outcome:**
// - `filterMixedArray([1, "apple", 2, "banana", 3])` →
//   - `["apple", "banana"]` (array of strings)
//   - `[1, 2, 3]` (array of numbers)
// solution
function filterMixedArray(arr) {
    let stringArr = [];
    let stringNum = [];
    arr.forEach((element) => {
        if (typeof element === 'string') {
            stringArr.push(element);
        }
        else {
            stringNum.push(element);
        }
    });
    return [stringArr, stringNum];
}
;
const filterMixedArrayResult = filterMixedArray([1, 'apple', 2, 'banana', 3]);
const [arr1, arr2] = filterMixedArrayResult;
console.log(arr1, arr2);
console.log('\r');
// ### **Exercise 7: Creating and Manipulating Tuples**
// 1. Create a function `updateTuple` that:
//    - Accepts a tuple `data` of type `[number, string, boolean]`.
//    - Returns a new tuple where:
//      - The number is incremented by 1.
//      - The string is converted to uppercase.
//      - The boolean is toggled (i.e., `true` becomes `false` and vice versa).
// **Expected Outcome:**
// - `updateTuple([42, "hello", true])` → `[43, "HELLO", false]`
// - `updateTuple([99, "typescript", false])` → `[100, "TYPESCRIPT", true]`
// solution
function updateTuple(data) {
    return data.map((element) => {
        if (typeof element === 'number') {
            element++;
        }
        else if (typeof element === 'string') {
            element = element.toUpperCase();
        }
        else if (typeof element === 'boolean') {
            element = !element;
        }
        return element;
    });
}
;
const updateTupleResult = [
    updateTuple([42, 'hello', true]),
    updateTuple([99, 'typescript', false])
];
for (let result of updateTupleResult) {
    console.log(result);
}
;
console.log('\r');
function calculateDistance(dist1, dist2) {
    const sumOfAll = dist2.map((element, index) => Math.pow(element - dist1[index], 2));
    const reduced = sumOfAll.reduce((acc, curr) => acc + curr, 0);
    return Math.sqrt(reduced);
}
;
const calculateDistanceResult = [
    calculateDistance([1, 2, 3], [4, 6, 8]),
    calculateDistance([0, 0, 0], [1, 1, 1]),
];
calculateDistanceResult.forEach(result => {
    console.log(result);
});
console.log('\r');
// ### **Exercise 9: Tuple Validation**
// 1. Create a function `validateTuple` that:
//    - Accepts an input `data` of type `any[]`.
//    - Checks if the input matches the type `[string, number, boolean]`.
//    - Returns a boolean indicating whether the input is a valid tuple.
// **Expected Outcome:**
// - `validateTuple(["hello", 42, true])` → `true`
// - `validateTuple([42, "hello", true])` → `false`
// - `validateTuple(["hello", 42])` → `false`
// solution
function validateTuple(data) {
    if (typeof data[0] === 'string' && typeof data[1] === 'number' && typeof data[2] === 'boolean') {
        return true;
    }
    else {
        return false;
    }
}
;
const validateTupleResult = [
    validateTuple(['hello', 42, true]),
    validateTuple([42, 'hello', true]),
    validateTuple(['hello', 42])
];
for (let result of validateTupleResult) {
    console.log(result);
}
;
console.log('\r');
;
function validateProduct(obj) {
    if (typeof obj.name === 'string' && typeof obj.price === 'number'
        && (obj.category === undefined || typeof obj.category === 'string')) {
        return true;
    }
    else {
        return false;
    }
}
;
const validateProductResult = [
    validateProduct({ name: 'Laptop', price: 1299 }),
    validateProduct({ name: 'Phone', price: 'Free' }),
    validateProduct({ price: 200, category: 'Electronics' })
];
validateProductResult.forEach(result => {
    try {
        console.log(result);
    }
    catch (err) {
        console.log(err.message);
    }
});
console.log('\r');
const scores = { 'Alice': 10, 'Bob': 20 };
const updates = [{ player: 'Alice', score: 5 }, { player: 'Charlie', score: 15 }];
function updateScores(scores, updates) {
    for (let obj of updates) {
        if (scores.hasOwnProperty(obj.player)) {
            scores[obj.player] += obj.score;
        }
        else {
            scores[obj.player] = obj.score;
        }
    }
    return scores;
}
;
const updateScoresResult = updateScores(scores, updates);
console.log(updateScoresResult);
console.log('\r');
;
;
function getEmployeeNames(obj) {
    return obj.employees.map(employee => employee.name);
}
;
const department = {
    name: 'Engineering',
    employees: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ],
};
const getEmployeeNamesResult = getEmployeeNames(department);
console.log(getEmployeeNamesResult);
