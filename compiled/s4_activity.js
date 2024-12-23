"use strict";
// ### **Exercise 1: Manipulating Unknown Data**
// 1. Write a function `processUnknownData` that:
//    - Accepts a parameter `data` of type `unknown`.
//    - If `data` is a string, return the uppercase version of the string (e.g., `"hello"` becomes `"HELLO"`).
//    - If `data` is a number, return the square of the number.
//    - If `data` is neither a string nor a number, return `"Unsupported type"`.
// // Expected Outcome:
// processUnknownData("typescript");
// // → "TYPESCRIPT"
// processUnknownData(4);
// // → 16
// processUnknownData(true);
// // → "Unsupported type"
// solution
function processUnknownData(data) {
    if (typeof data === 'string') {
        return data.toUpperCase();
    }
    else if (typeof data === 'number') {
        return data ** 2;
    }
    else {
        return 'Unsupported type';
    }
}
;
const processUnknownDataResult = [
    processUnknownData('typescript'),
    processUnknownData(4),
    processUnknownData(true)
];
processUnknownDataResult.forEach(result => console.log(result));
console.log('\r');
// ### **Exercise 2: Custom Casting Utility**
// 1. Create a function `safeCast` that:
//    - Accepts two parameters:
//      - `value`: a variable of type `any`.
//      - `targetType`: a string representing the target type (`"string"`, `"number"`, or `"boolean"`).
//    - Returns the `value` cast to the target type.
//    - If the casting is invalid (e.g., casting `"hello"` to `"number"`), throw an error with the message `"Invalid cast"`.
// // Expected Outcome:
// safeCast("123", "number");
// // → 123
// safeCast(456, "string");
// // → "456"
// safeCast("hello", "boolean");
// // → Error: Invalid cast
// solution
function safeCast(value, targetType) {
    if (targetType === 'number') {
        const converted = Number(value);
        if (isNaN(converted))
            throw new Error('Invalid cast');
        return converted;
    }
    else if (targetType === 'string') {
        return String(value);
    }
    else if (targetType === 'boolean') {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        throw new Error('Invalid cast');
    }
    else {
        throw new Error('Invalid target type');
    }
}
;
try {
    console.log(safeCast('123', 'number'));
    console.log(safeCast(456, 'string'));
    console.log(safeCast('true', 'boolean'));
    console.log(safeCast('hello', 'boolean'));
}
catch (err) {
    console.error(`Error: ${err.message}`);
}
;
console.log('\r');
// ### **Exercise 3: Force Casting for Libraries**
// 1. Define a `calculateTotal` function that:
//    - Accepts a parameter `data` of type `unknown`.
//    - Cast `data` to a string, parse it as JSON, and assume the structure is always `{ items: number[] }`.
//    - Calculate and return the sum of all numbers in the `items` array.
//    - Use **force casting** if necessary to bypass TypeScript errors.
// // Expected Outcome:
// const jsonString = '{"items": [10, 20, 30]}';
// calculateTotal(jsonString);
// // → 60
// const invalidString = '{"items": "invalid"}';
// calculateTotal(invalidString);
// // → Error: Cannot calculate total
// solution
function calculateTotal(data) {
    try {
        const parsed = JSON.parse(data);
        if ('items' in parsed && Array.isArray(parsed.items)
            && parsed.items.every(item => typeof item === 'number')) {
            const total = parsed.items.reduce((sum, curr) => sum + curr, 0);
            return total;
        }
        else {
            throw new Error('Cannot calculate total');
        }
    }
    catch (err) {
        throw new Error('Cannot calculate total');
    }
}
;
try {
    console.log(calculateTotal('{"items": [10, 20, 30]}'));
    console.log(calculateTotal('{"items": "invalid"}'));
}
catch (err) {
    console.error(`Error: ${err.message}`);
}
console.log('\r');
// ### **Exercise 4: Employee Hierarchy**
// 1. Create a base class `Employee` that:
//     - Has the following `protected` properties:
//       - `name` (string), `age` (number), and `salary` (number).
//     - Includes a constructor that initializes these properties.
//     - Has a `public` method `getDetails()` that returns a string in the format: `"Name: [name], Age: [age], Salary: [salary]"`.
// 2. Create a subclass `Manager` that:
//     - Extends the `Employee` class.
//     - Has an additional `private` property `bonus` (number).
//     - Overrides the `getDetails()` method to include the bonus in the format: `"Name: [name], Age: [age], Salary: [salary], Bonus: [bonus]"`.
// // Expected Outcome:
// const emp = new Employee("John Doe", 30, 50000);
// console.log(emp.getDetails());
// // → "Name: John Doe, Age: 30, Salary: 50000"
// const mgr = new Manager("Jane Smith", 40, 80000, 20000);
// console.log(mgr.getDetails());
// // → "Name: Jane Smith, Age: 40, Salary: 80000, Bonus: 20000"
// solution
class Employee {
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}`;
    }
}
;
class Manager extends Employee {
    constructor(name, age, salary, bonus) {
        super(name, age, salary);
        this.bonus = bonus;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}, Bonus: ${this.bonus}`;
    }
}
;
const emp = new Employee('John Doe', 30, 50000);
const mgr = new Manager('Jane Smith', 40, 80000, 20000);
const results = [emp, mgr];
results.forEach(result => console.log(result.getDetails()));
console.log('\r');
// ### **Exercise 5: Shape Factory**
// 1. Create an `abstract` class `Shape` with:
//     - An `abstract` method `getArea()` that returns a number.
//     - A `public` method `getDescription()` that returns `"I am a shape"`.
// 2. Implement the following concrete classes extending `Shape`:
//     - `Circle`: Has a `private` property `radius` (number). Implements `getArea()` as `π × radius²`.
//     - `Triangle`: Has `private` properties `base` (number) and `height` (number). Implements `getArea()` as `0.5 × base × height`.
// 3. Create a function `shapeFactory` that accepts a type (`"Circle"` or `"Triangle"`) and its dimensions, returning an instance of the corresponding class.
// // Expected Outcome:
// const circle = shapeFactory("Circle", 10); // Circle with radius 10
// console.log(circle.getArea()); // → 314.159...
// const triangle = shapeFactory("Triangle", 5, 10); // Triangle with base 5, height 10
// console.log(triangle.getArea()); // → 25
// console.log(circle.getDescription()); // → "I am a shape"
// solution
class Shape {
    getDescription() {
        return 'I am a shape';
    }
}
;
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getAreaCopy() {
        return Math.PI * this.radius ** 2;
    }
}
;
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    getAreaCopy() {
        return 0.5 * this.base * this.height;
    }
}
;
function shapeFactory(shape, ...rest) {
    if (shape === 'Circle') {
        return new Circle(rest[0]);
    }
    else {
        return new Triangle(rest[0], rest[1]);
    }
}
;
const shapeFactoryResult = [
    shapeFactory('Circle', 10),
    shapeFactory('Triangle', 5, 10)
];
shapeFactoryResult.forEach(result => console.log(result.getAreaCopy()));
console.log(shapeFactoryResult[0].getDescription());
console.log('\r');
// ### **Exercise 6: Read-Only Bank Account**
// 1. Create a class `BankAccount` that:
//     - Has a `readonly` property `accountNumber` (string).
//     - Has `private` properties `balance` (number) and `ownerName` (string).
//     - Has a constructor that initializes all properties.
//     - Includes a `public` method `deposit(amount: number)` that increases the balance.
//     - Includes a `public` method `getAccountDetails()` that returns: `"Account [accountNumber] belongs to [ownerName] with balance [balance]"`.
// 2. Write a subclass `SavingsAccount` that:
//     - Extends `BankAccount`.
//     - Includes an additional method `addInterest(rate: number)` that increases the balance by the specified percentage.
// // Expected Outcome:
// const account = new BankAccount("123456789", 1000, "Alice");
// console.log(account.getAccountDetails());
// // → "Account 123456789 belongs to Alice with balance 1000"
// account.deposit(500);
// console.log(account.getAccountDetails());
// // → "Account 123456789 belongs to Alice with balance 1500"
// const savings = new SavingsAccount("987654321", 2000, "Bob");
// savings.addInterest(5); // Adds 5% interest
// console.log(savings.getAccountDetails());
// // → "Account 987654321 belongs to Bob with balance 2100"
// solution
class BankAccount {
    constructor(accountNumber, balance, ownerName) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.ownerName = ownerName;
    }
    ;
    deposit(amount) {
        this.balance = this.balance + amount;
    }
    ;
    getBalance() {
        return this.balance;
    }
    ;
    getAccountDetails() {
        return `Account ${this.accountNumber} belongs to ${this.ownerName} with balance ${this.balance}`;
    }
    ;
}
;
class SavingsAccount extends BankAccount {
    addInterest(rate) {
        const currentBalance = this.getBalance();
        const interest = (rate / 100) * currentBalance;
        this.deposit(interest);
    }
}
;
const account = new BankAccount('123456789', 1000, 'Alice');
console.log(account.getAccountDetails());
account.deposit(500);
console.log(account.getAccountDetails());
const savings = new SavingsAccount('987654321', 2000, 'Bob');
savings.addInterest(5);
console.log(savings.getAccountDetails());
console.log('\r');
// ### **Exercise 7: Generic Stack**
// 1. Implement a `Stack<T>` class that:
//     - Allows pushing an item of type `T` onto the stack.
//     - Allows popping the last item off the stack and returns it (or `undefined` if the stack is empty).
//     - Includes a method `peek()` to view the top item without removing it (or `undefined` if empty).
//     - Includes a method `isEmpty()` that returns `true` if the stack is empty, otherwise `false`.
// // Expected Outcome:
// const numStack = new Stack<number>();
// console.log(numStack.isEmpty()); // → true
// numStack.push(10);
// numStack.push(20);
// console.log(numStack.peek()); // → 20
// console.log(numStack.pop()); // → 20
// console.log(numStack.pop()); // → 10
// console.log(numStack.isEmpty()); // → true
// const strStack = new Stack<string>();
// strStack.push("A");
// strStack.push("B");
// console.log(strStack.peek()); // → "B"
// console.log(strStack.pop()); // → "B"
// console.log(strStack.pop()); // → "A"
// solution
class Stack {
    constructor() {
        this.currentStack = [];
    }
    push(item) {
        this.currentStack.push(item);
    }
    ;
    pop() {
        return this.currentStack.length > 0 ? this.currentStack.pop() : undefined;
    }
    ;
    peek() {
        return this.currentStack.length > 0 ? this.currentStack[this.currentStack.length - 1] : undefined;
    }
    ;
    isEmpty() {
        return this.currentStack.length === 0;
    }
}
;
const numStack = new Stack();
console.log(numStack.isEmpty());
numStack.push(10);
numStack.push(20);
console.log(numStack.peek());
console.log(numStack.pop());
console.log(numStack.pop());
console.log(numStack.isEmpty());
console.log('\r');
const strStack = new Stack();
strStack.push('A');
strStack.push('B');
console.log(strStack.peek());
console.log(strStack.pop());
console.log(strStack.pop());
console.log('\r');
// ### **Exercise 8: Generic Key-Value Store**
// 1. Create a `KeyValueStore<K, V>` class that:
//     - Stores key-value pairs of types `K` and `V`.
//     - Includes a method `setKeyValue(key: K, value: V)` to add or update a key-value pair.
//     - Includes a method `getValue(key: K): V | undefined` to retrieve the value for a given key.
//     - Includes a method `getKeys(): K[]` to retrieve all keys.
// // Expected Outcome:
// const store = new KeyValueStore<string, number>();
// store.setKeyValue("A", 100);
// store.setKeyValue("B", 200);
// console.log(store.getValue("A")); // → 100
// console.log(store.getValue("C")); // → undefined
// console.log(store.getKeys()); // → ["A", "B"]
// const numKeyStore = new KeyValueStore<number, string>();
// numKeyStore.setKeyValue(1, "One");
// numKeyStore.setKeyValue(2, "Two");
// console.log(numKeyStore.getValue(1)); // → "One"
// console.log(numKeyStore.getKeys()); // → [1, 2]
// solution
class KeyValueStore {
    constructor() {
        this.objStore = new Map();
    }
    setKeyValue(key, value) {
        this.objStore.set(key, value);
    }
    ;
    getValue(key) {
        return this.objStore.get(key);
    }
    ;
    getKeys() {
        return Array.from(this.objStore.keys());
    }
    ;
}
;
const store = new KeyValueStore();
store.setKeyValue('A', 100);
store.setKeyValue('B', 200);
console.log(store.getValue('A')); // → 100
console.log(store.getValue('C')); // → undefined
console.log(store.getKeys()); // → ["A", "B"]
console.log('\r');
const numKeyStore = new KeyValueStore();
numKeyStore.setKeyValue(1, 'One');
numKeyStore.setKeyValue(2, 'Two');
console.log(numKeyStore.getValue(1)); // → "One"
console.log(numKeyStore.getKeys()); // → [1, 2]
console.log('\r');
// ### **Exercise 9: Generic Merge Function**
// 1. Write a generic function `merge<T, U>(obj1: T, obj2: U): T & U` that:
//     - Accepts two objects of types `T` and `U`.
//     - Returns a new object that merges both objects.
//     - Ensures that the resulting object has all the properties of `obj1` and `obj2`.
// // Expected Outcome:
// const obj1 = { name: "Alice" };
// const obj2 = { age: 30, isActive: true };
// const merged = merge(obj1, obj2);
// console.log(merged); // → { name: "Alice", age: 30, isActive: true }
// const obj3 = { id: 123 };
// const obj4 = { role: "admin", permissions: ["read", "write"] };
// const merged2 = merge(obj3, obj4);
// console.log(merged2); // → { id: 123, role: "admin", permissions: ["read", "write"] }
// solution
function merge(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
;
const obj1 = { name: 'Alice' };
const obj2 = { age: 30, isActive: true };
const merged = merge(obj1, obj2);
console.log(merged);
const obj3 = { id: 123 };
const obj4 = { role: 'admin', permissions: ['read', 'write'] };
const merged2 = merge(obj3, obj4);
console.log(merged2);
console.log('\r');
;
function initializeConfig(partialConfig) {
    if (partialConfig.port === undefined) {
        partialConfig.port = 3000;
    }
    ;
    if (partialConfig.enableLogging === undefined) {
        partialConfig.enableLogging = false;
    }
    ;
    return partialConfig;
}
;
const config1 = initializeConfig({ appName: 'MyApp' });
console.log(config1);
const config2 = initializeConfig({ appName: 'AnotherApp', enableLogging: true });
console.log(config2);
console.log('\r');
;
const permissions = {
    admin: ['read', 'write', 'delete'],
    editor: ['read', 'write'],
    viewer: ['read'],
};
function getPublicUserInfo(user) {
    const { email, ...rest } = user;
    return { ...rest };
}
;
const user = { id: 1, name: 'Alice', role: 'admin', email: 'alice@example.com' };
const publicInfo = getPublicUserInfo(user);
console.log(publicInfo);
console.log(permissions.admin);
console.log('\r');
;
const publicEmployee = { id: 1, name: 'John', department: 'Finance' };
console.log(publicEmployee);
function getSensitiveInfoKeys() {
    return ['department', 'salary'];
}
;
const sensitiveKeys = getSensitiveInfoKeys();
console.log(sensitiveKeys);
