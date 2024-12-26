"use strict";
// ### **Exercise 1: Dynamic Property Getter**
// 1. Create an interface `Book` with the following properties:
//    - `title` (string)
//    - `author` (string)
//    - `publishedYear` (number)
// 2. Write a function `getProperty<T>(obj: T, property: keyof T): T[keyof T]` that:
//    - Takes an object `obj` of type `T` and a property name from `keyof T`.
//    - Returns the value of the specified property.
;
function getProperty(obj, property) {
    return obj[property];
}
;
const myBook = { title: '1984', author: 'George Orwell', publishedYear: 1949 };
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
function setProperty(obj, property, value) {
    obj[property] = value;
}
;
const myBookTwo = { title: '1984', author: 'George Orwell', publishedYear: 1949 };
setProperty(myBookTwo, 'title', 'Animal Farm');
setProperty(myBookTwo, 'publishedYear', 1945);
setProperty(myBook, 'publishedYear', 'not a number');
console.log(myBookTwo);
console.log('\r');
;
function getPublicProperties(obj) {
    const { password, ...rest } = obj;
    return { ...rest };
}
;
const userTwo = { id: 101, username: 'john_doe', password: 'secret123' };
const publicUser = getPublicProperties(userTwo);
console.log(publicUser);
// console.log(publicUser.password);
console.log('\r');
;
function getUserInfo(user) {
    const address = user?.address ? `${user.address.city}, ${user.address.zip}` : 'Not available';
    return `Username: ${user.username}, Email: ${user.email ?? 'Not provided'} , Address: ${address}`;
}
;
const user1 = { username: 'alice', email: null, address: { city: 'Wonderland', zip: '00001' } };
console.log(getUserInfo(user1));
const user2 = { username: 'bob', email: 'bob@example.com' };
console.log(getUserInfo(user2));
console.log('\r');
;
;
function getEmployeeCount(company) {
    if ('departments' in company) {
        const employees = company.departments?.map(department => department?.employees || 0);
        return employees?.reduce((sum, curr) => sum + curr, 0);
    }
    ;
    return 0;
    // alternative solution
    // return company.departments?.reduce((sum, dept) => sum + (dept.employees ?? 0), 0) ?? 0;
}
;
const company1 = {
    name: 'TechCorp',
    departments: [
        { name: 'Engineering', employees: 10 },
        { name: 'HR' }
    ]
};
console.log(getEmployeeCount(company1));
const company2 = { name: 'SoloEnterprise' };
console.log(getEmployeeCount(company2));
console.log('\r');
;
function markBookUnavailable(library, title) {
    const match = library.books?.find(book => book.title === title);
    if (match) {
        match.isAvailable = false;
        return true;
    }
    ;
    return false;
}
;
const library = {
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
function sumPrefixedObject(obj) {
    const values = Object.values(obj);
    return values.reduce((sum, curr) => sum + curr, 0);
}
;
const data = { prop_a: 10, prop_b: 20, prop_c: 5 };
console.log(sumPrefixedObject(data));
const emptyData = {};
console.log(sumPrefixedObject(emptyData));
console.log('\r');
function validateHexColor(color, type) {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(color)) {
        return false;
    }
    ;
    if (type === 'light' && color.startsWith('#F')) {
        return true;
    }
    ;
    if (type === 'dark' && color.startsWith('#0')) {
        return true;
    }
    return false;
}
;
const validateHexColorResult = [
    validateHexColor('#FFFFFF', 'light'),
    validateHexColor('#0A0A0A', 'dark'),
    validateHexColor('#123456', 'light')
];
validateHexColorResult.forEach(result => console.log(result));
console.log('\r');
function addLabel(data, label) {
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
}
;
let labeledData = { label_1: 'First', label_2: 'Second' };
labeledData = addLabel(labeledData, 'Third');
console.log(labeledData);
labeledData = addLabel(labeledData, 'Fourth');
console.log(labeledData);
