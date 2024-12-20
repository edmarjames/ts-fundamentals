"use strict";
// 1. TypeScript Enums
// An 'enum' is a special class that represents a group of constants (unchangeable variables).
// 'Enums' come in two flavors 'string' and 'numeric'
// Numeric Enums - Default
// By default, enums will initialize the first value to '0' and add 1 to each additional value.
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 0] = "North";
    CardinalDirections[CardinalDirections["East"] = 1] = "East";
    CardinalDirections[CardinalDirections["South"] = 2] = "South";
    CardinalDirections[CardinalDirections["West"] = 3] = "West";
})(CardinalDirections || (CardinalDirections = {}));
;
const currentDirection = CardinalDirections.North;
console.log(currentDirection);
console.log(CardinalDirections);
// Numeric Enums - initialized
// You can set the value of the first numeric enum and have it auto increment from that.
var Directions;
(function (Directions) {
    Directions[Directions["North"] = 2] = "North";
    Directions[Directions["East"] = 3] = "East";
    Directions[Directions["South"] = 4] = "South";
    Directions[Directions["West"] = 5] = "West";
})(Directions || (Directions = {}));
const secondDirection = Directions.East;
console.log(Directions);
console.log(secondDirection);
// Numeric Enums - fully initialized
// You can assign unique number values for each enum value. Then the values will not increment automatically.
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["Success"] = 200] = "Success";
    StatusCodes[StatusCodes["Accepted"] = 202] = "Accepted";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
})(StatusCodes || (StatusCodes = {}));
;
console.log(StatusCodes.NotFound);
console.log(StatusCodes.BadRequest);
// String Enums
// Enums can also contain strings. This is more common than numeric enums, because of their readability and intent.
var EmployeesPosition;
(function (EmployeesPosition) {
    EmployeesPosition["Manager"] = "John";
    EmployeesPosition["Secretary"] = "Jane";
    EmployeesPosition["Treasurer"] = "Juan";
})(EmployeesPosition || (EmployeesPosition = {}));
;
console.log(EmployeesPosition.Manager);
console.log(EmployeesPosition.Treasurer);
const myAge = 26;
console.log(myAge);
const rectangle = {
    height: 20,
    width: 50
};
console.log(rectangle);
const redRectangle = {
    height: 20,
    width: 60,
    color: 'red'
};
console.log(redRectangle);
// 3. TypeScript Union Types
// Union types are used when a value can be more than a single type.
// Such as when a property would be 'string' or 'number'.
// Union | (OR)
// Using the '|' we are saying our parameter is a 'string' or 'number'.
function printAge(age) {
    console.log(`My age is ${age}`);
}
;
printAge('26');
printAge(26);
// Union Type Errors
// You need to know what you type is when union types are being used to avoid type errors.
function printRemainingBalance(balance) {
    if (typeof balance === 'number') {
        console.log(`My remaining balance is ${balance.toFixed(2)}`);
    }
    else {
        console.log(`My remaining balance is ${balance}`);
    }
}
;
printRemainingBalance(500.000000);
printRemainingBalance('500.000');
// 4. TypeScript Functions
// TypeScript has a specific syntax for typing function parameters and return values.
// Return type
// The type of the value returned by the function can be explicitly defined.
// If no return type is defined, TypeScript will attempt to infer it through the types of the variables or expressions returned.
function getTime() {
    return new Date().getTime();
}
;
console.log(getTime());
// Void return type
// The type 'void' can be used to indicate a function doesn't return any value.
function printHello() {
    console.log('Hello World!');
}
;
printHello();
// Parameters
// Function parameters are typed with a similar syntax as variable declarations.
// If no parameter type is defined, TypeScript will default to using 'any', unless additional type information is available as shown in the Default Parameters and Type Alias sections below.
function sum(num1, num2) {
    return num1 + num2;
}
;
console.log(sum(5, 7));
// Optional parameters
// By default TypeScript will assume all parameters are required, but they can be explicitly marked as optional.
function add(num1, num2, num3) {
    return num1 + num2 + (num3 || 0);
}
;
console.log(add(10, 13));
console.log(add(10, 13, 5));
// Default parameters
// For parameters with default values, the default value goes after the type annotation.
// TypeScript can also infer the type from the default value.
function pow(value, exponent = 2) {
    return value ** exponent;
}
console.log(pow(6));
console.log(pow(2, 3));
// Named parameters
// Typing named parameters follows the same pattern as typing normal parameters.
function divide({ dividend, divisor }) {
    return dividend / divisor;
}
;
console.log(divide({ dividend: 8, divisor: 2 }));
// Rest parameters
// Can be typed like normal parameters, but the type must be an array as rest parameters are always arrays.
function addAllNumbers(a, b, ...rest) {
    return a + b + rest.reduce((acc, curr) => acc + curr, 0);
}
;
console.log(addAllNumbers(1, 6, 8, 9, 7));
const squareFunc = (value) => value ** 2;
console.log(squareFunc(4));
