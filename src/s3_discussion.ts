// 1. TypeScript Enums
// An 'enum' is a special class that represents a group of constants (unchangeable variables).
// 'Enums' come in two flavors 'string' and 'numeric'

// Numeric Enums - Default
// By default, enums will initialize the first value to '0' and add 1 to each additional value.
enum CardinalDirections {
  North,
  East,
  South,
  West
};
const currentDirection = CardinalDirections.North;
console.log(currentDirection);
console.log(CardinalDirections);

// Numeric Enums - initialized
// You can set the value of the first numeric enum and have it auto increment from that.
enum Directions {
  North = 2,
  East,
  South,
  West
}
const secondDirection = Directions.East;
console.log(Directions);
console.log(secondDirection);

// Numeric Enums - fully initialized
// You can assign unique number values for each enum value. Then the values will not increment automatically.
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
};
console.log(StatusCodes.NotFound);
console.log(StatusCodes.BadRequest);

// String Enums
// Enums can also contain strings. This is more common than numeric enums, because of their readability and intent.
enum EmployeesPosition {
  Manager = 'John',
  Secretary = 'Jane',
  Treasurer = 'Juan'
};
console.log(EmployeesPosition.Manager);
console.log(EmployeesPosition.Treasurer);

// Note: Technically, you can mix and match string and numeric enum values, but it is recommended no to do so.


// 2. TypeScript Type Aliases and Interfaces
// TypeScript allows types to be defined separately from the variables that use them.
// Aliases and Interfaces allows types to be easily shared between different variables/objects.

// Type aliases
// Allows defining types with a custom name (an Alias).
// Can be used for primitives like 'string' or more complex types such as 'objects' and 'arrays'
type Age = number;
const myAge: Age = 26;
console.log(myAge);

// Interfaces
// Are similar to type aliases, except they only apply to 'object' types.
interface Rectangle {
  height: number,
  width: number
}

const rectangle: Rectangle = {
  height: 20,
  width: 50
};

console.log(rectangle);

// Extending Interfaces
// Extending an interface means you are creating a new interface with the same properties as the original, plus something new.
interface Rectangle {
  height: number,
  width: number
}

interface ColoredRectangle extends Rectangle {
  color: string
}

const redRectangle: ColoredRectangle = {
  height: 20,
  width: 60,
  color: 'red'
}

console.log(redRectangle);


// 3. TypeScript Union Types
// Union types are used when a value can be more than a single type.
// Such as when a property would be 'string' or 'number'.

// Union | (OR)
// Using the '|' we are saying our parameter is a 'string' or 'number'.
function printAge(age: string | number) {
  console.log(`My age is ${age}`);
};
printAge('26');
printAge(26);

// Union Type Errors
// You need to know what you type is when union types are being used to avoid type errors.
function printRemainingBalance(balance: string | number) {
  if (typeof balance === 'number') {
    console.log(`My remaining balance is ${balance.toFixed(2)}`);
  } else {
    console.log(`My remaining balance is ${balance}`);
  }
};

printRemainingBalance(500.000000);
printRemainingBalance('500.000');


// 4. TypeScript Functions
// TypeScript has a specific syntax for typing function parameters and return values.

// Return type
// The type of the value returned by the function can be explicitly defined.
// If no return type is defined, TypeScript will attempt to infer it through the types of the variables or expressions returned.
function getTime(): number {
  return new Date().getTime();
};
console.log(getTime());

// Void return type
// The type 'void' can be used to indicate a function doesn't return any value.
function printHello(): void {
  console.log('Hello World!');
};
printHello();

// Parameters
// Function parameters are typed with a similar syntax as variable declarations.
// If no parameter type is defined, TypeScript will default to using 'any', unless additional type information is available as shown in the Default Parameters and Type Alias sections below.
function sum(num1: number, num2: number): number {
  return num1 + num2;
};
console.log(sum(5, 7));

// Optional parameters
// By default TypeScript will assume all parameters are required, but they can be explicitly marked as optional.
function add(num1: number, num2: number, num3?: number): number {
  return num1 + num2 + (num3 || 0);
};
console.log(add(10, 13));
console.log(add(10, 13, 5));

// Default parameters
// For parameters with default values, the default value goes after the type annotation.
// TypeScript can also infer the type from the default value.
function pow(value: number, exponent: number = 2): number {
  return value ** exponent;
}
console.log(pow(6));
console.log(pow(2, 3));

// Named parameters
// Typing named parameters follows the same pattern as typing normal parameters.
function divide({ dividend, divisor }: { dividend: number, divisor: number}): number {
  return dividend / divisor;
};
console.log(divide({dividend: 8, divisor: 2}));

// Rest parameters
// Can be typed like normal parameters, but the type must be an array as rest parameters are always arrays.
function addAllNumbers(a: number, b: number, ...rest: number[]): number {
  return a + b + rest.reduce((acc, curr) => acc + curr, 0);
};
console.log(addAllNumbers(1, 6, 8, 9, 7));

// Type alias
// Function types can be specified separately from functions with type aliases.
// These types are written similarly to arrow functions.
type Squared = (value: number) => number;
const squareFunc: Squared = (value) => value ** 2;
console.log(squareFunc(4));