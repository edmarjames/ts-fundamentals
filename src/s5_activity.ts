// ### **Exercise 1: Dynamic Property Getter**
// 1. Create an interface `Book` with the following properties:
//    - `title` (string)
//    - `author` (string)
//    - `publishedYear` (number)
// 2. Write a function `getProperty<T>(obj: T, property: keyof T): T[keyof T]` that:
//    - Takes an object `obj` of type `T` and a property name from `keyof T`.
//    - Returns the value of the specified property.

  // // Expected Outcome:
  // const myBook = { title: "1984", author: "George Orwell", publishedYear: 1949 };
  // const title = getProperty(myBook, "title");
  // console.log(title); // → "1984"

  // const year = getProperty(myBook, "publishedYear");
  // console.log(year); // → 1949

  // solution
  interface Book {
    title: string;
    author: string;
    publishedYear: number;
  };
  function getProperty<T, P extends keyof T>(obj: T, property: P): T[P] {
    return obj[property];
  };
  const myBook: Book = { title: '1984', author: 'George Orwell', publishedYear: 1949 };

  const getPropertyResult = [
    getProperty(myBook, 'title'),
    getProperty(myBook, 'publishedYear')
  ];
  getPropertyResult.forEach(item => console.log(item));


console.log('\r');
// ### **Exercise 2: Type-Checked Property Setter**
// 1. Using the same `Book` interface, write a function `setProperty<T>(obj: T, property: keyof T, value: T[keyof T]): void` that:
//    - Modifies the specified property of the object with a new value.
//    - Ensures the value matches the type of the property being set.

  // // Expected Outcome:
  // const myBook = { title: "1984", author: "George Orwell", publishedYear: 1949 };
  // setProperty(myBook, "title", "Animal Farm");
  // setProperty(myBook, "publishedYear", 1945);
  // console.log(myBook);
  // // → { title: "Animal Farm", author: "George Orwell", publishedYear: 1945 }

  // // Uncommenting the following line should raise a TypeScript error:
  // // setProperty(myBook, "publishedYear", "not a number");

  // solution
  function setProperty<T, P extends keyof T>(obj: T, property: P, value: T[P]): void {
    obj[property] = value;
  };
  const myBookTwo: Book = { title: '1984', author: 'George Orwell', publishedYear: 1949 };
  setProperty(myBookTwo, 'title', 'Animal Farm');
  setProperty(myBookTwo, 'publishedYear', 1945);
  setProperty(myBook, 'publishedYear', 'not a number');
  console.log(myBookTwo);


console.log('\r');
// ### **Exercise 3: Restrict Property Access with `keyof` and Conditional Types**
// 1. Create an interface `User` with the following properties:
//    - `id` (number)
//    - `username` (string)
//    - `password` (string, restricted for access)
// 2. Write a utility type `PublicProperties<T>` that:
//    - Removes keys from `T` that contain the word "password" in their name.
// 3. Write a function `getPublicProperties(obj: User): PublicProperties<User>` that:
//    - Returns an object containing only the properties allowed by the `PublicProperties` type.

  // Expected Outcome:
  // const user = { id: 101, username: "john_doe", password: "secret123" };
  // const publicUser = getPublicProperties(user);
  // console.log(publicUser);
  // → { id: 101, username: "john_doe" }

  // Accessing password should raise a TypeScript error:
  // console.log(publicUser.password);

  // solution
  interface UserCopy {
    id: number;
    username: string;
    password: string;
  };
  // type PublicProperties<T> = Omit<UserCopy, 'password'>;
  type PublicProperties<T> = {
    [K in keyof T as K extends `${string}password${string}` ? never : K]: T[K];
  };
  function getPublicProperties(obj: UserCopy): PublicProperties<UserCopy> {
    const {password, ...rest} = obj;
    return {...rest} as PublicProperties<UserCopy>;
  };
  const userTwo: UserCopy = { id: 101, username: 'john_doe', password: 'secret123' };
  const publicUser = getPublicProperties(userTwo);
  console.log(publicUser);
  // console.log(publicUser.password);


console.log('\r');
// ### **Exercise 4: Handle Null or Undefined in Objects**
// 1. Create an interface `UserProfile` with the following properties:
//    - `username` (string)
//    - `email` (string | null)
//    - `address` (optional, with properties `city` and `zip` both as strings)
// 2. Write a function `getUserInfo(user: UserProfile): string` that:
//    - Returns a string summarizing the user’s information.
//    - If `email` is null or `address` is undefined, include fallback messages using nullish coalescence (`??`).

  // // Expected Outcome:
  // const user1: UserProfile = { username: "alice", email: null, address: { city: "Wonderland", zip: "00001" } };
  // console.log(getUserInfo(user1));
  // // → "Username: alice, Email: Not provided, Address: Wonderland, 00001"

  // const user2: UserProfile = { username: "bob", email: "bob@example.com" };
  // console.log(getUserInfo(user2));
  // // → "Username: bob, Email: bob@example.com, Address: Not available"

  // solution
  interface UserProfileCopy {
    username: string;
    email: string | null;
    address?: {
      city: string;
      zip: string;
    };
  };
  function getUserInfo(user: UserProfileCopy): string {
    const address = user?.address ? `${user.address.city}, ${user.address.zip}` : 'Not available';
    return `Username: ${user.username}, Email: ${user.email ?? 'Not provided'} , Address: ${address}`;
  };

  const user1: UserProfileCopy = { username: 'alice', email: null, address: { city: 'Wonderland', zip: '00001' } };
  console.log(getUserInfo(user1));

  const user2: UserProfileCopy = { username: 'bob', email: 'bob@example.com' };
  console.log(getUserInfo(user2));


console.log('\r');
// ### **Exercise 5: Optional Chaining in Deeply Nested Structures**
// 1. Create an interface `Company` with the following structure:
//    - `name` (string)
//    - `departments` (optional array of objects containing `name` (string) and `employees` (optional number))
// 2. Write a function `getEmployeeCount(company: Company): number` that:
//    - Returns the total number of employees across all departments.
//    - If a department’s `employees` property is missing, treat it as `0`.

  // // Expected Outcome:
  // const company1: Company = {
  //   name: "TechCorp",
  //   departments: [
  //     { name: "Engineering", employees: 10 },
  //     { name: "HR" }
  //   ]
  // };
  // console.log(getEmployeeCount(company1));
  // // → 10

  // const company2: Company = { name: "SoloEnterprise" };
  // console.log(getEmployeeCount(company2));
  // // → 0

  // solution
  interface Department {
    name: string;
    employees?: number;
  };
  interface Company {
    name: string;
    departments?: Department[]
  };
  function getEmployeeCount(company: Company): number {
    if ('departments' in company) {
      const employees = company.departments?.map(department => department?.employees || 0);
      return employees?.reduce((sum, curr) => sum + curr, 0);
    };
    return 0;

    // alternative solution
    // return company.departments?.reduce((sum, dept) => sum + (dept.employees ?? 0), 0) ?? 0;
  };

  const company1: Company = {
    name: 'TechCorp',
    departments: [
      { name: 'Engineering', employees: 10 },
      { name: 'HR' }
    ]
  };
  console.log(getEmployeeCount(company1));

  const company2: Company = { name: 'SoloEnterprise' };
  console.log(getEmployeeCount(company2));


console.log('\r');
// ### **Exercise 6: Safely Access and Modify Nested Values**
// 1. Create an interface `Library` with the following structure:
//    - `name` (string)
//    - `books` (optional array of objects containing `title` (string) and `isAvailable` (boolean))
// 2. Write a function `markBookUnavailable(library: Library, title: string): boolean` that:
//    - Finds a book by its title and marks it as unavailable (`isAvailable = false`).
//    - Returns `true` if the book is found and updated, or `false` otherwise.

  // // Expected Outcome:
  // const library: Library = {
  //   name: "Central Library",
  //   books: [
  //     { title: "TypeScript Basics", isAvailable: true },
  //     { title: "Advanced JavaScript", isAvailable: true }
  //   ]
  // };

  // console.log(markBookUnavailable(library, "TypeScript Basics"));
  // // → true

  // console.log(markBookUnavailable(library, "Nonexistent Book"));
  // // → false

  // console.log(library.books);
  // // → [
  // //      { title: "TypeScript Basics", isAvailable: false },
  // //      { title: "Advanced JavaScript", isAvailable: true }
  // //    ]

  // solution
  interface Books {
    title: string;
    isAvailable: boolean;
  }
  interface Library {
    name: string;
    books?: Books[];
  };
  function markBookUnavailable(library: Library, title: string): boolean {
    const match = library.books?.find(book => book.title === title);
    if (match) {
      match.isAvailable = false;
      return true;
    };
    return false;
  };

  const library: Library = {
    name: 'Central Library',
    books: [
      { title: 'TypeScript Basics', isAvailable: true },
      { title: 'Advanced JavaScript', isAvailable: true }
    ]
  };
  const markBookUnavailableResult = [
    markBookUnavailable(library, 'TypeScript Basics'),
    markBookUnavailable(library, 'Nonexistent Book')
  ];
  markBookUnavailableResult.forEach(result => console.log(result));
  console.log(library.books);


console.log('\r');
// ### **Exercise 7: Generate Dynamic Property Names**
// 1. Create a type `PrefixedObject` where each key must start with the prefix `"prop_"` and the value is always a number.
// 2. Write a function `sumPrefixedObject(obj: PrefixedObject): number` that:
//     - Takes an object of type `PrefixedObject`.
//     - Returns the sum of all its values.

  // // Expected Outcome:
  // const data: PrefixedObject = { prop_a: 10, prop_b: 20, prop_c: 5 };
  // console.log(sumPrefixedObject(data));
  // // → 35

  // const emptyData: PrefixedObject = {};
  // console.log(sumPrefixedObject(emptyData));
  // // → 0

  // solution
  type PrefixedObject = { [key: `prop_${string}`]: number };
  function sumPrefixedObject(obj: PrefixedObject): number {
    const values = Object.values(obj);
    return values.reduce((sum, curr) => sum + curr, 0);
  };
  const data: PrefixedObject = { prop_a: 10, prop_b: 20, prop_c: 5 };
  console.log(sumPrefixedObject(data));

  const emptyData: PrefixedObject = {};
  console.log(sumPrefixedObject(emptyData));


console.log('\r');
// ### **Exercise 8: Validate Hexadecimal Colors**
// 1. Create a type `HexColor` that enforces a valid hexadecimal color format for either `"light"` or `"dark"` shades:
//     - `"light"` must start with `#F`.
//     - `"dark"` must start with `#0`.
// 2. Write a function `validateHexColor(color: string, type: "light" | "dark"): boolean` that:
//     - Validates whether the given `color` matches the expected format based on the `type`.

  // // Expected Outcome:
  // console.log(validateHexColor("#FFFFFF", "light"));
  // // → true

  // console.log(validateHexColor("#0A0A0A", "dark"));
  // // → true

  // console.log(validateHexColor("#123456", "light"));
  // // → false

  // solution
  type HexColor = `#F${string}` | `#0${string}`;
  function validateHexColor(color: string, type: 'light' | 'dark'): boolean {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;

    if (!hexRegex.test(color)) {
      return false;
    };

    if (type === 'light' && color.startsWith('#F')) {
      return true;
    };

    if (type === 'dark' && color.startsWith('#0')) {
      return true
    }

    return false;
  };

  const validateHexColorResult = [
    validateHexColor('#FFFFFF', 'light'),
    validateHexColor('#0A0A0A', 'dark'),
    validateHexColor('#123456', 'light')
  ];
  validateHexColorResult.forEach(result => console.log(result));


console.log('\r');
// ### **Exercise 9: Generate Labels with Dynamic Index Signatures**
// 1. Create a type `LabeledData` where:
//     - Keys must start with the prefix `"label_"` followed by a number.
//     - Values must always be strings.
// 2. Write a function `addLabel(data: LabeledData, label: string): LabeledData` that:
//     - Adds a new label to the object with the next available number as the suffix.
//     - Returns the updated object.

  // // Expected Outcome:
  // let labeledData: LabeledData = { label_1: "First", label_2: "Second" };

  // labeledData = addLabel(labeledData, "Third");
  // console.log(labeledData);
  // // → { label_1: "First", label_2: "Second", label_3: "Third" }

  // labeledData = addLabel(labeledData, "Fourth");
  // console.log(labeledData);
  // // → { label_1: "First", label_2: "Second", label_3: "Third", label_4: "Fourth" }

  // solution
  type LabeledData = { [key: `label_${number}`]: string };
  function addLabel(data: LabeledData, label: string): LabeledData {
    const labelNumbers = Object.keys(data)
    .map(key => parseInt(key.replace('label_', '')))
    .sort((a, b) => a - b);

    const nextLabelNumber = labelNumbers.length === 0 ? 1 : labelNumbers[labelNumbers.length - 1] + 1;
    data[`label_${nextLabelNumber}`] = label;
    return data;

    // alternative solution
    // const dataKeys = Object.keys(data);
    // dataKeys.reverse();
    // const lastDigit = parseInt(dataKeys[0][dataKeys[0]?.length - 1]);
    // data[`label_${lastDigit + 1}`] = label;
  };

  let labeledData: LabeledData = { label_1: 'First', label_2: 'Second' };

  labeledData = addLabel(labeledData, 'Third');
  console.log(labeledData);

  labeledData = addLabel(labeledData, 'Fourth');
  console.log(labeledData);