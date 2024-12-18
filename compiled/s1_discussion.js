"use strict";
// Simple types
// There are three main primitives in JavaScript and TypeScript
// 'boolean' - true or false values
// 'number' - whole numbers and floating point values
// 'string' - text values like 'TypeScript Rocks'
// There are also 2 less common primitives used in later versions of JavaScript and TypeScript.
// 'bigint' - whole numbers and floating point values, but allows larger negative and positive numbers than the 'number type'
// 'symbol' - are used to create a globally unique identifier.
// Type assignment
// When creating a variable, there are two main ways TypeScript assigns a type (explicit, implicit)
// Explicit type - writing out the type
// easier to read and more intentional.
const firstName = 'John';
console.log(firstName);
// Implicit type - forces TypeScript to 'infer' the value
// having TypeScript 'guess' the type of a value is called 'infer'
// implicit type assignment are shorter, faster to type and often used when developing and testing.
const lastName = 'Doe';
console.log(lastName);
// Error in type assignment
// Typescript will throw an error if data types do not match.
let transactionId = '1234';
transactionId = 1234;
let customerName = 'Jane';
customerName = 1010;
// Unable to infer
// TypeScript may not always properly infer what the type of a variable may be. In such cases, it will set the type to 'any' which disables type checking.
const json = JSON.parse('69');
console.log(typeof json);
// This behavior can be disabled by enabling 'noImplicityAny' as an option in a TypeScript's project 'tsconfig.json' that is a JSON config file for customizing how some of TypeScript behaves.
