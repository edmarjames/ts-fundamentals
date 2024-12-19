// 1. TypeScript Special Types

// Type: any
// 'any' is a type that disables type checking and effectively allows all types to be used.
// Setting 'any' to the special type 'any' disables type checking.
let val: any = true;
val = 'true';

// Note: 'any' can be a useful way to get past errors since it disables type checking, but TypeScript will not be able to provide type safety, and tools which rely on type data, such as auto completion, will not work. Remember, it should be avoided at 'any' cost.

// Type: unknown
// 'unknown' is a similar, but safer alternative to 'any'
// TypeScript will prevent 'unknown' types from being used.
let w: unknown = 1;
w = "string"; // no error
w = {
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  }
} as { runANonExistentMethod: () => void}
// How can we avoid the error for the code commented out below when we don't know the type?
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'.
if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod();
}
// Although we have to cast multiple times we can do a check in the if to secure our type and have a safer casting

// Note: 'unknown' is best used when you don't know the type of data being typed. To add a type later, you'll need to cast it. Casting is when we use the 'as' keyword to say property or variable is of the casted type.

// Type: never
// 'never' effectively throws an error whenever it is defined.
let x: never = true;

// Note: 'never' is rarely used, especially by itself, its primary use is in advanced generics.

// Type: undefined & null
// 'undefined' and 'null' are types that refer to the JavaScript primitives 'undefined' and 'null' respectively.

let a: undefined = undefined;
let b: null = null;

// Note: these types don't have much use unless 'strictNullChecks' is enabled in the 'tsconfig.json' file.


// 2. TypeScript Arrays

// TypeScript has a specific syntax for typing arrays.
const names: string[] = ['John', 'Jane', 'Juan'];

// Readonly
// The 'readonly' keyword can prevent arrays from being changed.
const surNames: readonly string[] = ['Doe', 'Smith', 'Dela Cruz'];
surNames.push('Bautista');

// Type inference
// TypeScript can infer the type of an array if it has values.
const numbers = [1, 2, 3, 4, 5];
numbers.push(numbers[numbers.length - 1] + 1);
console.log(numbers);
numbers.push('7');


// 3. TypeScript Tuples

// Typed arrays
// A 'tuple' is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.
let myTuple: [number, boolean, string];
myTuple = [6, false, 'Hello'];

// Note: The order of assignment matters in our tuple and it will throw an error if not properly followed.

// Readonly Tuple
// A good practice is to make your 'tuple' readonly.
// Tuples only have strongly defined types for the initial values.
const myReadonlyTuple: readonly [string, number, object] = ['Hi', 10, {name: 'Edmar', age: 26}];

// Named Tuples
// 'named tuples' allows us to provide context for our values at each index.
// 'named tuples' provide more context for what our index values represent.
const graph: [x: number, y: number] = [55.6, 41.3];

// Destructuring Tuples
// Since tuples are arrays we can also destructure them.
const values: [number, number] = [10, 20];
const [z, v] = values;
console.log(z, v);


// 4. TypeScript Object Types

// TypeScript has a specific syntax for typing objects
const car: { type: string, model: string, year: number } = {
  type: 'Honda',
  model: 'Civic',
  year: 2009
};

// Type inference
// TypeScript can infer the types of properties based on their values.
const motorcycle = {
  type: 'Scooter'
}
motorcycle.type = 1;
motorcycle.type = 'Sports';
console.log(motorcycle);

// Optional properties
// optional properties are properties that don't have to be defined in the object definition.
const employee: { name: string, age: number, address?: string } = {
  name: 'John',
  age: 36
};

// Index signatures
// index signatures can be used for objects without a defined list of properties
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25;
nameAgeMap.Mark = "Fifty";