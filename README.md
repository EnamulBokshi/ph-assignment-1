# ব্লগ-পোস্ট 
# TypeScript: Union, Intersection Types এবং keyof Keyword

TypeScript একটি শক্তিশালী type safety system যা আমাদের code আরও নিরাপদ এবং maintainable করতে সাহায্য করে। এই blog post-এ আমরা দুটি গুরুত্বপূর্ণ TypeScript feature নিয়ে আলোচনা করব: Union ও Intersection Types এবং keyof keyword।

## ১. Union এবং Intersection Types
চলো চট করে দেখি নেয় Union আর  Intersection টাইপ 

### Union Types

Union types আমাদের একটি  variable বা parameter-কে একাধিক type-এর মধ্যে যেকোনো একটি type assign করার সুবিধা দেয়। এটি `|` (pipe or খাম্বা - মজা করে বলতে পারো )  operator ব্যবহার করে define করা হয়।

**উদাহরণ:**

```typescript

type InputType = string | number | boolean

const checkType =(input: InputType) : string => {
    if(typeof input === 'number') return 'number';
    else if(typeof input === 'string') return 'string';
    else if (typeof input === 'boolean') return 'boolean'
}

console.log(checkType(12)) // number
console.log(checkType('hello ts')) // string;

// আরেকটি উদাহরণ দেখে নেওয়া যাক 

type ID = string | number;

function getUserById(id: ID) {
    if (typeof id === "string") {
        return `Fetching user with string ID: ${id}`;
    } else {
        return `Fetching user with numeric ID: ${id}`;
    }
}

console.log(getUserById("abc123"));  // string ID
console.log(getUserById(12345));     // numeric ID


// Union with objects
type PaymentMethod = 
    | { type: "card"; cardNumber: string; cvv: string }
    | { type: "paypal"; email: string }
    | { type: "cash"; amount: number };

function processPayment(payment: PaymentMethod) {
    switch (payment.type) {
        case "card":
            return `Processing card payment: ${payment.cardNumber}`;
        case "paypal":
            return `Processing PayPal payment: ${payment.email}`;
        case "cash":
            return `Processing cash payment: $${payment.amount}`;
    }
}
```

ইউনিয়ন টাইপ আমাদের বেশ কিছু সুবিদা দিয়ে থাকে । আর  আমরা এটা হরহামেশাই ব্যাবহার করে থাকি। নিছে কিছু সুবিধা তুলে ধরা হল। 

**Union Types-এর সুবিধা:**
    
    • Flexible type definition

    • Type narrowing সহজভাবে করা যায়
    
    • একাধিক valid type accept করা যায়

### Intersection Types

Intersection types একাধিক type-কে একসাথে combine করে একটি নতুন type তৈরি করে। এটি `&` (ampersand) operator ব্যবহার করে define করা হয়। Result type-এ সব combined type-এর সকল properties থাকবে।

কথা না বলে চলো কিছু উদাহরণ দেখে নেওয়া যাক। 

**উদাহরণ:**
ধরো একজন  Person আছে যে কিনা আবার একজন  Employee ও। আমরা তাকে একজন  Staff বলতে পারি  Person আর  Employee এই দুটি টাইপ কে & দিয়ে মার্জ করে দিয়ে। নিচের উদাহরণটি দেখ। 

```typescript

interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: string;
    department: string;
}

// মার্জ করে দিলাম  Person ও  Employee interface দুটিকে আর এটা কে বললাম একজন  Staff টাইপ। 

type Staff = Person & Employee;

const staff: Staff = {
    name: "এনাম",
    age: 30,
    employeeId: "EMP001",
    department: "Engineering"
};

console.log(staff);

// ধরো তার আরও কিছু প্রোপার্টি আছে যেমন  ContactInfo,  Address 
// এখন আমরা এসব গুলো একসাথে করে একটি  FullProfile টাইপ বানাতে পারি। 
// নিচের উদাহরণটি দেখ। 

interface ContactInfo {
    email: string;
    phone: string;
}

interface Address {
    street: string;
    city: string;
    country: string;
}

type FullProfile = Person & Employee & ContactInfo & Address;

const userProfile: FullProfile = {
    name: "রাম",
    age: 28,
    employeeId: "EMP002",
    department: "Marketing",
    email: "rahim@example.com",
    phone: "+880123456789",
    street: "123 Main St",
    city: "Dhaka",
    country: "Bangladesh"
};


```
 চলো এবার দেখে নেওয়া যাক Intersection Types-এর কিছ সুবিধা 

**Intersection Types-এর সুবিধা:**
    
    1. একাধিক interface বা type থেকে properties combine করা যায়

    2. Composition pattern implement করা সহজ

    3. Code reusability বৃদ্ধি পায়

## ২. keyof Keyword এর ব্যবহার

`keyof` হলো একটি TypeScript operator যা একটি object type-এর সকল keys-কে string বা numeric literal union type হিসেবে extract করে। এটি type-safe property access নিশ্চিত করতে অত্যন্ত কার্যকর।

### keyof Keyword 
keyof type script এর   অত্যান্তো দারূণ একটি ফিচার। এটি দিয়ে আমারা অন্য কোন interface এর key গুলো নিয়ে নিতে পারি বা কাজ করতে পারি 

চট করে নিছের উদাহরণ টি দেখে ফেলি।

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// keyof User = "id" | "name" | "email" | "age"
type UserKeys = keyof User;


```

### আরও Advanced উদাহরণ:

```typescript

interface Product {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
}

function updateProduct<K extends keyof Product>(
    product: Product,
    key: K,
    value: Product[K]
): Product {
    return { ...product, [key]: value };
}

let product: Product = {
    id: "P001",
    name: "Laptop",
    price: 50000,
    inStock: true
};

product = updateProduct(product, "price", 45000);     //  Valid
product = updateProduct(product, "inStock", false);   //  Valid
// product = updateProduct(product, "price", "cheap"); //  Error: Type 'string' not assignable to 'number'


```

### keyof-এর প্রধান সুবিধা:

1. **Type Safety**: Property access করার সময় compile-time error ধরা পড়ে
2. **Autocomplete**: IDE-তে intelligent autocomplete support পাওয়া যায়
3. **Refactoring**: Property name change করলে automatic error detection
4. **Generic Constraints**: Generic functions-এ type constraints তৈরি করা যায়
5. **Mapped Types**: Dynamic type transformation করা সহজ

## উপসংহার

Union এবং Intersection types আমাদের flexible এবং composite types তৈরি করতে সাহায্য করে, যেখানে `keyof` keyword type-safe property manipulation সম্ভব করে। এই features একসাথে ব্যবহার করে আমরা robust এবং maintainable TypeScript code লিখতে পারি যা runtime errors কমাতে সাহায্য করে। কি দারুণ তাই না? 

TypeScript-এর এই powerful features আয়ত্ত করলে  আমাদের code quality এবং developer experience উল্লেখযোগ্যভাবে উন্নত হবে।