// 1. TypeScript Keyof

// 'keyof' is a keyword in TypeScript which is used to extract the key type from an object type.

// keyof with explicit keys
// When used on an object type with explicit keys, 'keyof' creates a union type with those keys.
interface Person {
  name: string;
  age: number;
};

// 'keyof' Person here creates a union type of 'name' and 'age', other strings will not be allowed.
function printPerson(person: Person, property: keyof Person) {
  console.log(`Printing person property ${property}: "${person[property]}"`);
};

const personCopy: Person = {
  name: 'John',
  age: 23
};

printPerson(personCopy, 'name');

// keyof with index signatures
// 'keyof' can also be used with index signatures to extract the index type.
type StringMap = { [key: string]: unknown };

// `keyof StringMap` resolves to `string` here
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
};


// 2. TypeScript Null & undefined

// TypeScript has a powerful system to deal with 'null' or 'undefined' values.
// By default 'null' and 'undefined' handling is disabled, and can be enabled by setting 'strictNullChecks' to true.
// When 'strictNullChecks' is enabled, TypeScript requires values to be set unless 'undefined' is explicitly added to the type.

// Types
// 'null' and 'undefined' are primitive types and can be used like other types, such as 'string'
let valueCopy: string | undefined | null = null;
valueCopy = 'Lorem';
valueCopy = undefined;
valueCopy = null;

// Optional chaining
// Optional chaining is a JavaScript feature that works well with TypeScript's null handling. It allows accessing properties on an object, that may or may not exist, with a compact syntax. It can be used with the '?.' operator when accessing properties.

interface House {
  sqft: number;
  yard?: {
    sqft: number;
  };
};

function printYardSize(house: House) {
  const yardSize = house.yard?.sqft;
  if (yardSize === undefined) {
    console.log('No yard');
  } else {
    console.log(`Yard is ${yardSize} sqft`);
  }
};

let home: House = {
  sqft: 500
};

printYardSize(home);

// Nullish Coalescence
// Nullish Coalescence is another JavaScript feature that works well with TypeScript's null handling. It allows writing expressions that have a fallback specifically when dealing with 'null' or 'undefined'. This is useful when other falsy values can occur in the expression but are still valid. It can be used with the '??' operator in an expression, similar to using the '&&' operator.

function printMileage(mileage: number | null | undefined) {
  console.log(`Mileage: ${mileage ?? 'Not available'}`);
};

printMileage(null);
printMileage(0);
printMileage(undefined);

// Null assertion
// TypeScripts inference system isn't perfect, there are times when it makes sense to ignore a value's possibility of being 'null' or 'undefined'. An easy way to do this is to use casting, but TypeScript also provides the '!' operator as a convenient shortcut.
// Just like casting, this can be unsafe and should be used with care.
function getValue(): string | undefined {
  return 'hello';
};

let valueThree = getValue();
console.log('Value length: ' + valueThree!.length);

// Array bounds handling
// Even with 'strictNullChecks' enabled, by default TypeScript will assume array access will never return undefined (unless undefined is part of the array type).
// The config 'noUncheckedIndexedAccess' can be used to change this behavior.
let array: number[] = [1, 2, 3];
console.log(array[0]);
console.log(array[3]);


// 3. TypeScript 5.x updates

// Template literal types
// Now allows use to create more precise types using template literals. We can define custom types that depend on the actual values of strings at compile time.
type Color = "red" | "green" | "blue";
type HexColor<T extends Color> = `#${string}`;

let myColor: HexColor<"blue"> = "#0000FF";
console.log(myColor);

// Index signature labels
// Allows us to label index signatures using computed property names. It helps in providing more descriptive type information when working with dynamic objects.
type DynamicObject = { [key: string as `dynamic_${string}`]: string };

let obj: DynamicObject = { dynamic_key: "value" };
console.log(obj);