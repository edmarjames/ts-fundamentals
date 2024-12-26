"use strict";
// 1. TypeScript Keyof
;
// 'keyof' Person here creates a union type of 'name' and 'age', other strings will not be allowed.
function printPerson(person, property) {
    console.log(`Printing person property ${property}: "${person[property]}"`);
}
;
const personCopy = {
    name: 'John',
    age: 23
};
printPerson(personCopy, 'name');
// `keyof StringMap` resolves to `string` here
function createStringPair(property, value) {
    return { [property]: value };
}
;
// 2. TypeScript Null & undefined
// TypeScript has a powerful system to deal with 'null' or 'undefined' values.
// By default 'null' and 'undefined' handling is disabled, and can be enabled by setting 'strictNullChecks' to true.
// When 'strictNullChecks' is enabled, TypeScript requires values to be set unless 'undefined' is explicitly added to the type.
// Types
// 'null' and 'undefined' are primitive types and can be used like other types, such as 'string'
let valueCopy = null;
valueCopy = 'Lorem';
valueCopy = undefined;
valueCopy = null;
;
function printYardSize(house) {
    const yardSize = house.yard?.sqft;
    if (yardSize === undefined) {
        console.log('No yard');
    }
    else {
        console.log(`Yard is ${yardSize} sqft`);
    }
}
;
let home = {
    sqft: 500
};
printYardSize(home);
// Nullish Coalescence
// Nullish Coalescence is another JavaScript feature that works well with TypeScript's null handling. It allows writing expressions that have a fallback specifically when dealing with 'null' or 'undefined'. This is useful when other falsy values can occur in the expression but are still valid. It can be used with the '??' operator in an expression, similar to using the '&&' operator.
function printMileage(mileage) {
    console.log(`Mileage: ${mileage ?? 'Not available'}`);
}
;
printMileage(null);
printMileage(0);
printMileage(undefined);
// Null assertion
// TypeScripts inference system isn't perfect, there are times when it makes sense to ignore a value's possibility of being 'null' or 'undefined'. An easy way to do this is to use casting, but TypeScript also provides the '!' operator as a convenient shortcut.
// Just like casting, this can be unsafe and should be used with care.
function getValue() {
    return 'hello';
}
;
let valueThree = getValue();
console.log('Value length: ' + valueThree.length);
// Array bounds handling
// Even with 'strictNullChecks' enabled, by default TypeScript will assume array access will never return undefined (unless undefined is part of the array type).
// The config 'noUncheckedIndexedAccess' can be used to change this behavior.
let array = [1, 2, 3];
console.log(array[0]);
console.log(array[3]);
let myColor = "#0000FF";
console.log(myColor);
let obj = { dynamic_key: "value" };
console.log(obj);
