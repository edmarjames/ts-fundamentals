"use strict";
// 1. TypeScript Casting
// There are times when working with types where it's necessary to override the type of a variable, such as when incorrect types are provided by a library.
// Casting is the process of overriding a type.
// Casting with 'as'
// A straightforward way to cast a variable is using the 'as' keyword, which will directly change the type of the given variable.
let randomVar = 'Hi';
console.log(randomVar.length);
// TypeScript will still attempt to typecheck casts to prevent casts that don't seem correct, for example the following will throw a type error since TypeScript knows casting a string to a number doesn't makes sense without converting the data.
console.log(4..length);
// Casting with '<>'
// Using '<>' works the same as casting with 'as'
// This type of casting will not work with TSX, such as when working with React files.
let xVar = 'hello';
console.log(xVar.length);
// Force casting
// To override type errors that TypeScript may throw when casting, first cast to 'unknown', then to the target type.
let y = 'This is a string';
console.log(y.length);
// 2. TypeScript Classes
// TypeScript adds types and visibility modifiers to JavaScript classes.
// Members: Types
// The members of a class (properties & methods) are typed using type annotations, similar to variables.
class Person {
}
;
const person = new Person();
person.name = 'John';
console.log(person.name);
// Members: Visibility
// Class members also be given special modifiers which affect visibility.
// There are three main visibility modifiers in TypeScript.
// public -> (default) allows access to the class member from anywhere
// private -> only allows access to the class member from within the class
// protected -> allows access to the class member from itself and any classes that inherit it.
class PersonTwo {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
;
const personTwo = new PersonTwo('Jane');
console.log(personTwo.getName());
// Parameter properties
// TypeScript provides a convenient way to define class members in the constructor, by adding a visibility modifiers to the parameter.
class PersonThree {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
;
const personThree = new PersonThree('Juan');
console.log(personThree.getName());
// Readonly
// Similar to arrays, the 'readonly' keyword can prevent class members from being changed.
class PersonFour {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
;
const personFour = new PersonFour('Smith');
console.log(personFour.getName());
;
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    toString() {
        return `Rectangle[width=${this.width}, height=${this.height}]`;
    }
}
const myRect = new Rectangle(10, 20);
console.log(myRect.getArea());
// Inheritance: Extends
// Classes can extend each other through the 'extends' keyword. A class can only extends one other class.
class Square extends Rectangle {
    constructor(width) {
        super(width, width);
    }
}
const mySq = new Square(20);
console.log(mySq.getArea());
// Override
// When a class extends another class, it can replace the members of the parent class with the same name.
// Newer versions of TypeScript will allow explicitly marking this with the 'override' keyword.
// By default the 'override' keyword is optional when overriding a method, and only helps to prevent accidentally overriding a method that does not exist. Use the setting 'noImplicitOverride' to force it to be used when overriding.
class SquareTwo extends Rectangle {
    constructor(width) {
        super(width, width);
    }
    toString() {
        return `Square[width=${this.width}]`;
    }
    ;
}
const mySqTwo = new SquareTwo(20);
console.log(mySqTwo.toString());
// Abstract Classes
// Classes can be written in a way that allows them to be used as a base class for other classes without having to implement all the members. This is done by using the 'abstract' keyword. Members that are left unimplemented also use the 'abstract' keyword.
// Abstract classes cannot be directly instantiated, as they do not have all their members implemented.
class Polygon {
    toString() {
        return `Polygon[area=${this.getArea()}]`;
    }
}
class RectangleTwo extends Polygon {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const myRectTwo = new RectangleTwo(10, 20);
console.log(myRectTwo.getArea());
// 3. TypeScript Basic Generics
// Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the type that they use.
// Functions
// Generics with functions help make more generalized methods which more accurately represent the types used and returned.
// TypeScript can also infer the type of the generic parameter from the function parameters.
function createPair(p1, p2) {
    return [p1, p2];
}
;
console.log(createPair('Hi', 69));
// Classes
// Generics can be used to create generalized classes.
// TypeScript can also infer the type of the generic parameter if it's used in a constructor parameter.
class NamedValue {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    ;
    setValue(value) {
        this._value = value;
    }
    ;
    getValue() {
        return this._value;
    }
    ;
    toString() {
        return `${this.name}: ${this._value}`;
    }
    ;
}
;
let value = new NamedValue('My Favorite Number');
value.setValue(6);
console.log(value.toString());
const wrappedValue = { value: 11 };
console.log(wrappedValue);
// Default value
// Generics can be assigned default values which apply if no other value is specified or inferred.
class NamedValueTwo {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    ;
    setValue(value) {
        this._value = value;
    }
    ;
    getValue() {
        return this._value;
    }
    ;
    toString() {
        return `${this.name}: ${this._value}`;
    }
    ;
}
;
let valueTwo = new NamedValueTwo('My Favorite Number');
valueTwo.setValue(69);
console.log(valueTwo.toString());
// Extends
// Constraints can be added to generics to limit what's allowed. The constraints make it possible to rely on a more specific type when using the generic type.
function createLoggedPair(v1, v2) {
    console.log(`creating pair: v1='${v1}', v2='${v2}'`);
    return [v1, v2];
}
createLoggedPair('Haha', 99);
;
let pointPart = {};
pointPart.x = 1;
console.log(pointPart);
;
let myCar = {
    make: 'Honda',
    model: 'Civic',
    mileage: 6000
};
console.log(myCar);
// Record
// 'Record' is a shortcut to defining an object type with a specific key type and value type.
const nameAgeMap1 = {
    'Alice': 21,
    'Bob': 35
};
console.log(nameAgeMap1);
// which is also equivalent to
const nameAgeMap2 = {
    'John': 65
};
console.log(nameAgeMap2);
;
const john = {
    name: 'John'
};
console.log(john);
;
const customerOne = {
    name: 'Bob'
};
console.log(customerOne);
const primitiveValue = true;
const point = {
    x: 10,
    y: 20
};
console.log(point);
const point1 = {
    x: 10,
    y: 20
};
console.log(point1);
const driverOne = {
    name: 'Dylan',
    age: 35
};
// driverOne.name = 'Tanggol'; will throw a warning - cannot assign to name because it is a read-only property
console.log(driverOne);
