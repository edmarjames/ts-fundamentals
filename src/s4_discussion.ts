// 1. TypeScript Casting
// There are times when working with types where it's necessary to override the type of a variable, such as when incorrect types are provided by a library.
// Casting is the process of overriding a type.

// Casting with 'as'
// A straightforward way to cast a variable is using the 'as' keyword, which will directly change the type of the given variable.
let randomVar: any = 'Hi';
console.log((randomVar as string).length);

// TypeScript will still attempt to typecheck casts to prevent casts that don't seem correct, for example the following will throw a type error since TypeScript knows casting a string to a number doesn't makes sense without converting the data.
console.log((4 as string).length);

// Casting with '<>'
// Using '<>' works the same as casting with 'as'
// This type of casting will not work with TSX, such as when working with React files.
let xVar: unknown = 'hello';
console.log((<string>xVar).length);

// Force casting
// To override type errors that TypeScript may throw when casting, first cast to 'unknown', then to the target type.
let y = 'This is a string';
console.log(((y as unknown) as number).length);


// 2. TypeScript Classes
// TypeScript adds types and visibility modifiers to JavaScript classes.

// Members: Types
// The members of a class (properties & methods) are typed using type annotations, similar to variables.
class Person {
  name: string;
};

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
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
};

const personTwo = new PersonTwo('Jane');
console.log(personTwo.getName());

// Parameter properties
// TypeScript provides a convenient way to define class members in the constructor, by adding a visibility modifiers to the parameter.
class PersonThree {
  public constructor(private name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
};

const personThree = new PersonThree('Juan');
console.log(personThree.getName());

// Readonly
// Similar to arrays, the 'readonly' keyword can prevent class members from being changed.
class PersonFour {
  private readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
};

const personFour = new PersonFour('Smith');
console.log(personFour.getName());

// Inheritance: Implements
// Interfaces can be used to define the type a class must follow through the 'implements' keyword.
// A class can implement multiple interfaces by listing each one after 'implements', separated by a comma like so. 'class Rectangle implement Shape, Colored {}'.
interface Shape {
  getArea: () => number;
};

class Rectangle implements Shape {
  public constructor(protected readonly width: number, protected readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }

  public toString(): string {
    return `Rectangle[width=${this.width}, height=${this.height}]`;
  }
}

const myRect = new Rectangle(10,20);
console.log(myRect.getArea());

// Inheritance: Extends
// Classes can extend each other through the 'extends' keyword. A class can only extends one other class.
class Square extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  // getArea gets inherited from Rectangle
}

const mySq = new Square(20);
console.log(mySq.getArea());

// Override
// When a class extends another class, it can replace the members of the parent class with the same name.
// Newer versions of TypeScript will allow explicitly marking this with the 'override' keyword.
// By default the 'override' keyword is optional when overriding a method, and only helps to prevent accidentally overriding a method that does not exist. Use the setting 'noImplicitOverride' to force it to be used when overriding.
class SquareTwo extends Rectangle {
  public constructor(width: number) {
    super(width, width);
  }

  public override toString(): string {
    return `Square[width=${this.width}]`;
  };
}

const mySqTwo = new SquareTwo(20);
console.log(mySqTwo.toString());

// Abstract Classes
// Classes can be written in a way that allows them to be used as a base class for other classes without having to implement all the members. This is done by using the 'abstract' keyword. Members that are left unimplemented also use the 'abstract' keyword.
// Abstract classes cannot be directly instantiated, as they do not have all their members implemented.
abstract class Polygon {
  public abstract getArea(): number;

  public toString(): string {
    return `Polygon[area=${this.getArea()}]`;
  }
}

class RectangleTwo extends Polygon {
  public constructor(protected readonly width: number, protected readonly height: number) {
    super();
  }

  public getArea(): number {
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
function createPair<S, T>(p1: S, p2: T): [S, T] {
  return [p1, p2];
};

console.log(createPair<string, number>('Hi', 69));

// Classes
// Generics can be used to create generalized classes.
// TypeScript can also infer the type of the generic parameter if it's used in a constructor parameter.
class NamedValue<T> {
  private _value: T | undefined;

  constructor (private name: string) {
    this.name = name;
  };

  public setValue(value: T) {
    this._value = value;
  };

  public getValue(): T | undefined {
    return this._value;
  };

  public toString(): string {
    return `${this.name}: ${this._value}`;
  };
};

let value = new NamedValue<number>('My Favorite Number');
value.setValue(6);
console.log(value.toString());

// Type Aliases
// Generics in type aliases allow creating types that are more reusable.
// This also works with interfaces with the following syntax: 'interface wrapped<T> {}'
type Wrapped<T> = { value: T };
const wrappedValue: Wrapped<number> = { value: 11 };
console.log(wrappedValue);

// Default value
// Generics can be assigned default values which apply if no other value is specified or inferred.
class NamedValueTwo<T = number> {
  private _value: T | undefined;

  constructor (private name: string) {
    this.name = name;
  };

  public setValue(value: T) {
    this._value = value;
  };

  public getValue(): T | undefined {
    return this._value;
  };

  public toString(): string {
    return `${this.name}: ${this._value}`;
  };
};

let valueTwo = new NamedValueTwo('My Favorite Number');
valueTwo.setValue(69);
console.log(valueTwo.toString());

// Extends
// Constraints can be added to generics to limit what's allowed. The constraints make it possible to rely on a more specific type when using the generic type.
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}
createLoggedPair<string, number>('Haha', 99);


// 4. TypeScript Utility Types
// TypeScript comes with a large number of types that can help with some common type manipulation, usually referred to as utility types.

// Partial
// 'Partial' changes all the properties in an object to be optional.
interface Point {
  x: number;
  y: number
};

let pointPart: Partial<Point> = {};
pointPart.x = 1;
console.log(pointPart);

// Required
// 'Required' changes all the properties in an object to be required.
interface Vehicle {
  make: string;
  model: string;
  mileage?: number;
};
let myCar: Required<Vehicle> = {
  make: 'Honda',
  model: 'Civic',
  mileage: 6000
};
console.log(myCar);

// Record
// 'Record' is a shortcut to defining an object type with a specific key type and value type.
const nameAgeMap1: Record<string, number> = {
  'Alice': 21,
  'Bob': 35
};
console.log(nameAgeMap1);

// which is also equivalent to
const nameAgeMap2: { [key: string]: number } = {
  'John': 65
};
console.log(nameAgeMap2);

// Omit
// 'Omit' removes key from an object type.
interface Employee {
  name: string;
  age: number;
  position: string
};

const john: Omit<Employee, 'age' | 'position'> = {
  name: 'John'
};
console.log(john);

// Pick
// 'Pick' removes all but the specified keys from an object type.
interface Customer {
  name: string;
  age: number;
  address: string
};

const customerOne: Pick<Customer, 'name'> = {
  name: 'Bob'
};
console.log(customerOne);

// Exclude
// 'exclude' removes types from a union
type Primitive = string | number | boolean;
const primitiveValue: Exclude<Primitive, string> = true;

// ReturnType
// 'ReturnType' extracts the return type of a function type.
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};
console.log(point);

// Parameters
// 'parameters' extracts the parameter type of a function type as an array.
type PointPrinter = (p: { x: number; y: number; }) => void;
const point1: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};
console.log(point1);

// Readonly
// 'readonly' is used to create a new type where all properties are readonly, meaning they cannot be modified once assigned a value.
// Keep in mind TypeScript will prevent this at compile time, but in theory since it is compiled down to JavaScript you can still override a readonly property.
interface Driver {
  name: string;
  age: number
}

const driverOne: Readonly<Driver> = {
  name: 'Dylan',
  age: 35
};
// driverOne.name = 'Tanggol'; will throw a warning - cannot assign to name because it is a read-only property
console.log(driverOne);