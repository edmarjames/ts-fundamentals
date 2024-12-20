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
  enum CardinalDirectionsCopy {
    North = 1,
    East,
    South,
    West
  };
  function getDirection(directions: string[]): number[] | string {
    const invalidDirections: string[] = [];
    const directionValues = directions.map((element) => {
      if (element in CardinalDirectionsCopy) {
        return CardinalDirectionsCopy[element as keyof typeof CardinalDirectionsCopy];
      } else {
        invalidDirections.push(element);
        return undefined;
      }
    });

    if (invalidDirections.length > 0) {
      return `Invalid direction(s): ${invalidDirections.join(', ')}`
    }

    return directionValues as number[];
  };
  const getDirectionResult = [
    getDirection(['North', 'West']),
    getDirection(['Up', 'South'])
  ];
  for (let result of getDirectionResult) {
    console.log(result);
  };


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
  enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404
  };
  function getHttpStatusMessage(code: number): string {
    return HttpStatus[code] !== undefined ? HttpStatus[code] : 'Unknown status';
  };
  const getHttpStatusMessageResult = [getHttpStatusMessage(200), getHttpStatusMessage(500)];
  for (let result of getHttpStatusMessageResult) {
    console.log(result);
  };


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
  enum Role {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER'
  };
  function hasAccess(role: Role, permission: string): boolean | string {
    const permissionRules = {
      [Role.Admin]: ['read', 'write', 'archive'],
      [Role.Editor]: ['read', 'write'],
      [Role.Viewer]: ['read']
    };

    if (permissionRules.hasOwnProperty(role)) {
      if (!permissionRules['ADMIN'].includes(permission)) {
        return `Invalid permission: ${permission}`;
      };
      return permissionRules[role].includes(permission);
    } else {
      return `Invalid role: ${role}`;
    }
  };
  const hasAccessResult = [
    hasAccess(Role.Admin, 'write'),
    hasAccess(Role.Editor, 'delete'),
    hasAccess(Role.Viewer, 'write'),
    hasAccess('Guest' as Role, 'read')
  ];
  for (let result of hasAccessResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 4: User Profiles**
// 1. Create a type alias `UserProfile` with the following properties:
//     - `name`: a string
//     - `age`: a number
//     - `email`: a string

// 2. Write a function `getProfileSummary` that:
//     - Accepts an array of `UserProfile` objects.
//     - Returns an array of strings summarizing the profiles in the format `"Name: [name], Age: [age]"`.

  // **Expected Outcome:**
  // ```typescript
  // const users: UserProfile[] = [
  //   { name: "Alice", age: 25, email: "alice@example.com" },
  //   { name: "Bob", age: 30, email: "bob@example.com" },
  // ];
  // getProfileSummary(users);
  // // → ["Name: Alice, Age: 25", "Name: Bob, Age: 30"]
  // ```

  // solution
  type UserProfile = {
    name: string,
    age: number,
    email: string
  };
  function getProfileSummary(userProfiles: UserProfile[]): string[] {
    return userProfiles.map(profile => `Name: ${profile.name}, Age: ${profile.age}`);
  };
  const users: UserProfile[] = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
    { name: 'Bob', age: 30, email: 'bob@example.com' },
  ];
  console.log(getProfileSummary(users));


console.log('\r');
// ### **Exercise 5: Extending Interfaces with Roles**
// 1. Define an interface `Employee` with the following properties:
//     - `id`: a number
//     - `name`: a string

// 2. Create an extended interface `Manager` that:
//     - Inherits all properties from `Employee`.
//     - Adds a property `teamSize`: a number.

// 3. Write a function `isManager` that:
//     - Accepts an object of type `Employee`.
//     - Returns `true` if the object is a `Manager` (i.e., has a `teamSize` property), otherwise `false`.

  // **Expected Outcome:**
  // ```typescript
  // const alice: Employee = { id: 1, name: "Alice" };
  // const bob: Manager = { id: 2, name: "Bob", teamSize: 5 };

  // isManager(alice); // → false
  // isManager(bob);   // → true
  // ```

  // solution
  interface Employee {
    id: number,
    name: string
  };
  interface Manager extends Employee {
    teamSize: number
  };
  function isManager(employee: Employee): boolean {
    return 'teamSize' in employee;
  };

  const alice: Employee = { id: 1, name: 'Alice' };
  const bob: Manager = { id: 2, name: 'Bob', teamSize: 5 };
  const isManagerResult = [
    isManager(alice),
    isManager(bob)
  ];
  for (let result of isManagerResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 6: Configurable Products**
// 1. Create a type alias `Product` with the following properties:
//     - `name`: a string
//     - `price`: a number
//     - `options` (optional): an object type with properties for `size` (a string) and `color` (a string).

// 2. Write a function `createProduct` that:
//     - Accepts a `Product` object.
//     - Returns a string describing the product in the format:
//       `"Product: [name], Price: $[price], Options: [size], [color]"`.
//     - If no `options` are provided, the message should include `"No options available"`.

  // **Expected Outcome:**
  // ```typescript
  // const product1: Product = { name: "T-Shirt", price: 19.99, options: { size: "M", color: "Blue" } };
  // const product2: Product = { name: "Mug", price: 12.99 };

  // createProduct(product1);
  // // → "Product: T-Shirt, Price: $19.99, Options: M, Blue"

  // createProduct(product2);
  // // → "Product: Mug, Price: $12.99, No options available"
  // ```

  // solution
  type ProductCopy = {
    name: string,
    price: number
    options?: {
      size: string,
      color: string
    }
  };
  function createProduct(product: ProductCopy): string {
    let productString = `Product: ${product.name}, Price: ${product.price}, `;
    if ('options' in product) {
      productString += `Options: ${product?.options?.size}, ${product?.options?.color}`;
    } else {
      productString += 'No options available';
    }
    return productString;
  };
  const product1: ProductCopy = { name: 'T-Shirt', price: 19.99, options: { size: 'M', color: 'Blue' } };
  const product2: ProductCopy = { name: 'Mug', price: 12.99 };
  const createProductResult = [
    createProduct(product1),
    createProduct(product2)
  ];
  for (let result of createProductResult) {
    console.log(result);
  };


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
  function parseInput(input: string | number[]): string[] | string {
    if (typeof input === 'string') {
      return input.split('');
    } else {
      return input.join('');
    }
  };
  const parseInputResult = [
    parseInput('hello'),
    parseInput([1, 2, 3])
  ];
  for (let result of parseInputResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 8: Union Type with Arrays**
// 1. Create a type alias `Data` that can either be:
//   - A `string` representing a message.
//   - An array of `number` representing a list of IDs.

// 2. Write a function `processData` that:
//   - Accepts a parameter of type `Data`.
//   - If the input is a `string`, returns its length.
//   - If the input is an array of numbers, returns the sum of the numbers.

  // **Expected Outcome:**
  // ```typescript
  // processData("Hello World");
  // // → 11

  // processData([10, 20, 30]);
  // // → 60
  // ```

  // solution
  type Data = string | number[];
  function processData(data: Data): number {
    return typeof data === 'string' ? data.length : data.reduce((arr, curr) => arr + curr, 0);
  };
  const processDataResult = [
    processData('Hello World'),
    processData([10, 20, 30])
  ];
  for (let result of processDataResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 9: Employee or Contractor**
// 1. Create a union type `Worker` that can either be:
//   - An object with properties `name` (string) and `salary` (number).
//   - An object with properties `name` (string) and `hourlyRate` (number).

// 2. Write a function `getPay` that:
//   - Accepts a parameter of type `Worker` and a number `hours` (optional).
//   - If the worker has a `salary`, returns the salary.
//   - If the worker has an `hourlyRate`, calculates and returns the total pay based on the provided `hours`.

  // **Expected Outcome:**
  // ```typescript
  // const employee = { name: "Alice", salary: 50000 };
  // const contractor = { name: "Bob", hourlyRate: 50 };

  // getPay(employee);
  // // → 50000

  // getPay(contractor, 160);
  // // → 8000
  // ```

  // solution
  type WorkerCopy = {name: string, salary: number} | {name: string, hourlyRate: number};
  function getPay(worker: WorkerCopy, hours?: number): number {
    if ('salary' in worker) {
      return worker.salary;
    } else if ('hourlyRate' in worker && hours) {
      return worker.hourlyRate * hours;
    }
    return 0;
  };
  const employeeCopy = { name: 'Alice', salary: 50000 };
  const contractor = { name: 'Bob', hourlyRate: 50 };

  const getPayResult = [
    getPay(employeeCopy),
    getPay(contractor, 160)
  ];
  for (let result of getPayResult) {
    console.log(result);
  };


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
  function dynamicMultiplier(numbers: number[], multiplier?: number): number[] {
    return numbers.map(number => number * (!multiplier ? 1 : multiplier));
  };
  const dynamicMultiplierResult = [
    dynamicMultiplier([1, 2, 3]),
    dynamicMultiplier([1, 2, 3], 2)
  ];
  for (let result of dynamicMultiplierResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 11: Process Orders**
// 1. Define a type alias `Order` for a function type that:
//     - Accepts `price` (number), `quantity` (number), and an optional `discount` (number).
//     - Returns the total price (number).

// 2. Implement a function `processOrder` of type `Order`.
// 3. The function should calculate the total price as `(price × quantity) - discount` (default `discount` to `0` if not provided).

  // **Expected Outcome:**
  // ```typescript
  // processOrder(100, 2);
  // // → 200

  // processOrder(100, 2, 50);
  // // → 150
  // ```

  // solution
  type Order = (price: number, quantity: number, discount?: number) => number;
  const processOrder: Order = (price, quantity, discount = 0) => (price * quantity) - discount;
  const processOrderResult = [
    processOrder(100, 2),
    processOrder(100, 2, 50)
  ];
  for (let result of processOrderResult) {
    console.log(result);
  };


console.log('\r');
// ### **Exercise 12: Analyze Array Statistics**
// 1. Write a function `analyzeArray` that:
//     - Accepts a rest parameter of numbers.
//     - Returns an object containing:
//       - `min`: the smallest number.
//       - `max`: the largest number.
//       - `average`: the average of all numbers.

  // **Expected Outcome:**
  // ```typescript
  // analyzeArray(5, 10, 15, 20);
  // // → { min: 5, max: 20, average: 12.5 }

  // analyzeArray(1, 3, 5);
  // // → { min: 1, max: 5, average: 3 }
  // ```

  // solution
  interface Output {
    min: number,
    max: number,
    average: number
  };
  function analyzeArray(...rest: number[]): Output {
    return {
      min: Math.min(...rest),
      max: Math.max(...rest),
      average: rest.reduce((arr, curr) => arr + curr, 0) / rest.length
    };
  };
  const analyzeArrayResult = [
    analyzeArray(5, 10, 15, 20),
    analyzeArray(1, 3, 5)
  ];
  for (let result of analyzeArrayResult) {
    console.log(result);
  };
