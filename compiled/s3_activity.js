"use strict";
// ### **Exercise 1: Navigational Path**
// 1. Define a numeric enum `CardinalDirections` with values for `North`, `East`, `South`, and `West` starting at 1.
// 2. Write a function `getDirection` that:
//    - Accepts an array of directions as strings (e.g., `["North", "East"]`) and returns an array of the corresponding numeric enum values.
//    - Throws an error if an invalid direction is provided.
// **Expected Outcome:**
// ```typescript
// getDirection(["North", "West"]); // → [1, 4]
// getDirection(["Up"]); // → Throws "Invalid direction: Up"
// ```
// solution
var CardinalDirectionsCopy;
(function (CardinalDirectionsCopy) {
    CardinalDirectionsCopy[CardinalDirectionsCopy["North"] = 1] = "North";
    CardinalDirectionsCopy[CardinalDirectionsCopy["East"] = 2] = "East";
    CardinalDirectionsCopy[CardinalDirectionsCopy["South"] = 3] = "South";
    CardinalDirectionsCopy[CardinalDirectionsCopy["West"] = 4] = "West";
})(CardinalDirectionsCopy || (CardinalDirectionsCopy = {}));
;
function getDirection(directions) {
    const invalidDirections = [];
    const directionValues = directions.map((element) => {
        if (element in CardinalDirectionsCopy) {
            return CardinalDirectionsCopy[element];
        }
        else {
            invalidDirections.push(element);
            return undefined;
        }
    });
    if (invalidDirections.length > 0) {
        return `Invalid direction(s): ${invalidDirections.join(', ')}`;
    }
    return directionValues;
}
;
const getDirectionResult = [
    getDirection(['North', 'West']),
    getDirection(['Up', 'South'])
];
for (let result of getDirectionResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 2: Status Code Lookup**
// 1. Define a fully initialized numeric enum `HttpStatus` with the following status codes:
//    - `OK` → 200
//    - `BadRequest` → 400
//    - `Unauthorized` → 401
//    - `NotFound` → 404
// 2. Write a function `getHttpStatusMessage` that:
//    - Accepts a numeric status code.
//    - Returns a message for known status codes (e.g., `200 → "Success"`).
//    - Returns `"Unknown Status"` for codes not in the enum.
// **Expected Outcome:**
// ```typescript
// getHttpStatusMessage(200); // → "Success"
// getHttpStatusMessage(500); // → "Unknown Status"
// ```
// solution
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["BadRequest"] = 400] = "BadRequest";
    HttpStatus[HttpStatus["Unauthorized"] = 401] = "Unauthorized";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
})(HttpStatus || (HttpStatus = {}));
;
function getHttpStatusMessage(code) {
    return HttpStatus[code] !== undefined ? HttpStatus[code] : 'Unknown status';
}
;
const getHttpStatusMessageResult = [getHttpStatusMessage(200), getHttpStatusMessage(500)];
for (let result of getHttpStatusMessageResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 3: Employee Roles and Access**
// 1. Define a string enum `Role` with the following values:
//    - `Admin` → "ADMIN"
//    - `Editor` → "EDITOR"
//    - `Viewer` → "VIEWER"
// 2. Write a function `hasAccess` that:
//    - Accepts a role (from the `Role` enum) and a permission (e.g., `"read"`, `"write"`).
//    - Returns `true` if the role has access to the permission based on the following rules:
//      - `Admin` → Access to all permissions.
//      - `Editor` → Access to `"read"` and `"write"`.
//      - `Viewer` → Access to `"read"` only.
//    - Throws an error for invalid roles or permissions.
// **Expected Outcome:**
// ```typescript
// hasAccess(Role.Admin, "write"); // → true
// hasAccess(Role.Editor, "delete"); // → Throws "Invalid permission: delete"
// hasAccess(Role.Viewer, "write"); // → false
// hasAccess("Guest", "read"); // → Throws "Invalid role: Guest"
// ```
// solution
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Editor"] = "EDITOR";
    Role["Viewer"] = "VIEWER";
})(Role || (Role = {}));
;
function hasAccess(role, permission) {
    const permissionRules = {
        [Role.Admin]: ['read', 'write', 'archive'],
        [Role.Editor]: ['read', 'write'],
        [Role.Viewer]: ['read']
    };
    if (permissionRules.hasOwnProperty(role)) {
        if (!permissionRules['ADMIN'].includes(permission)) {
            return `Invalid permission: ${permission}`;
        }
        ;
        return permissionRules[role].includes(permission);
    }
    else {
        return `Invalid role: ${role}`;
    }
}
;
const hasAccessResult = [
    hasAccess(Role.Admin, 'write'),
    hasAccess(Role.Editor, 'delete'),
    hasAccess(Role.Viewer, 'write'),
    hasAccess('Guest', 'read')
];
for (let result of hasAccessResult) {
    console.log(result);
}
;
console.log('\r');
function getProfileSummary(userProfiles) {
    return userProfiles.map(profile => `Name: ${profile.name}, Age: ${profile.age}`);
}
;
const users = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
    { name: 'Bob', age: 30, email: 'bob@example.com' },
];
console.log(getProfileSummary(users));
console.log('\r');
;
;
function isManager(employee) {
    return 'teamSize' in employee;
}
;
const alice = { id: 1, name: 'Alice' };
const bob = { id: 2, name: 'Bob', teamSize: 5 };
const isManagerResult = [
    isManager(alice),
    isManager(bob)
];
for (let result of isManagerResult) {
    console.log(result);
}
;
console.log('\r');
function createProduct(product) {
    let productString = `Product: ${product.name}, Price: ${product.price}, `;
    if ('options' in product) {
        productString += `Options: ${product?.options?.size}, ${product?.options?.color}`;
    }
    else {
        productString += 'No options available';
    }
    return productString;
}
;
const product1 = { name: 'T-Shirt', price: 19.99, options: { size: 'M', color: 'Blue' } };
const product2 = { name: 'Mug', price: 12.99 };
const createProductResult = [
    createProduct(product1),
    createProduct(product2)
];
for (let result of createProductResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 7: Parse User Input**
// 1. Write a function `parseInput` that:
//   - Accepts a parameter of type `string | number[]`.
//   - If the input is a `string`, splits it into an array of characters and returns it.
//   - If the input is a `number[]`, joins the numbers into a single string and returns it.
// **Expected Outcome:**
// ```typescript
// parseInput("hello");
// // → ["h", "e", "l", "l", "o"]
// parseInput([1, 2, 3]);
// // → "123"
// ```
// solution
function parseInput(input) {
    if (typeof input === 'string') {
        return input.split('');
    }
    else {
        return input.join('');
    }
}
;
const parseInputResult = [
    parseInput('hello'),
    parseInput([1, 2, 3])
];
for (let result of parseInputResult) {
    console.log(result);
}
;
console.log('\r');
function processData(data) {
    return typeof data === 'string' ? data.length : data.reduce((arr, curr) => arr + curr, 0);
}
;
const processDataResult = [
    processData('Hello World'),
    processData([10, 20, 30])
];
for (let result of processDataResult) {
    console.log(result);
}
;
console.log('\r');
function getPay(worker, hours) {
    if ('salary' in worker) {
        return worker.salary;
    }
    else if ('hourlyRate' in worker && hours) {
        return worker.hourlyRate * hours;
    }
    return 0;
}
;
const employeeCopy = { name: 'Alice', salary: 50000 };
const contractor = { name: 'Bob', hourlyRate: 50 };
const getPayResult = [
    getPay(employeeCopy),
    getPay(contractor, 160)
];
for (let result of getPayResult) {
    console.log(result);
}
;
console.log('\r');
// ### **Exercise 10: Dynamic Multiplier Function**
// 1. Write a function `dynamicMultiplier` that:
//     - Accepts two parameters:
//       - `numbers`: an array of numbers.
//       - `multiplier` (optional): a number with a default value of `1`.
//     - Returns a new array where each number in `numbers` is multiplied by `multiplier`.
// **Expected Outcome:**
// ```typescript
// dynamicMultiplier([1, 2, 3]);
// // → [1, 2, 3]
// dynamicMultiplier([1, 2, 3], 2);
// // → [2, 4, 6]
// ```
// solution
function dynamicMultiplier(numbers, multiplier) {
    return numbers.map(number => number * (!multiplier ? 1 : multiplier));
}
;
const dynamicMultiplierResult = [
    dynamicMultiplier([1, 2, 3]),
    dynamicMultiplier([1, 2, 3], 2)
];
for (let result of dynamicMultiplierResult) {
    console.log(result);
}
;
console.log('\r');
const processOrder = (price, quantity, discount = 0) => (price * quantity) - discount;
const processOrderResult = [
    processOrder(100, 2),
    processOrder(100, 2, 50)
];
for (let result of processOrderResult) {
    console.log(result);
}
;
console.log('\r');
;
function analyzeArray(...rest) {
    return {
        min: Math.min(...rest),
        max: Math.max(...rest),
        average: rest.reduce((arr, curr) => arr + curr, 0) / rest.length
    };
}
;
const analyzeArrayResult = [
    analyzeArray(5, 10, 15, 20),
    analyzeArray(1, 3, 5)
];
for (let result of analyzeArrayResult) {
    console.log(result);
}
;
