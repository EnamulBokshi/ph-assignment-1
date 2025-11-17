const formatValue =(input:string | number | boolean) : string | number | boolean =>{
    if(typeof input === 'number') {
        return input*10;
    }
    else if(typeof input === 'string'){
        return input.toUpperCase();
    }
    else if(typeof input === 'boolean') {
        return !input
    } 
    throw new Error('Invalid input type provided!')
}



type GetLength = (input: string | number[]) => number ;

const getLength : GetLength= (input) => {
    if(typeof input === 'string'){
        return input.length;
    }
    if(Array.isArray(input)){
        return input.length;
    }
    
    return 0;
}



class Person{
    name:string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    getDetails(){
        return `'Name: ${this.name}, Age: ${this.age}'`   
    }
}



type FilterByRating = (books: {title: string; rating: number}[]) => {title: string; rating: number}[]
const filterByRating : FilterByRating =(books) =>{
    const filteredBooks = books.filter(book => {
        if(book.rating < 0 || book.rating > 5) {
            throw new Error('Rating must be between 0-5');
            
        }
        if(book.rating >=4 ) {
            return {
                title: book.title,
                rating: book.rating.toFixed(1)
            }
        }
    } )
    return filteredBooks;
}


type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}
type FilterActiveUsers = (users: User[]) => User[];
const filterActiveUsers:FilterActiveUsers =(users)=>{
    return users.filter(user => user.isActive)
}




interface Book{
    title: string;
    author: string;
    publishedYear: number;
    isAvailable:boolean;
}

const printBookDetails = (book:Book):string => {
    console.log(`Title: ${book.title}: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable ? 'Yes':'No'}`)
    return `Title: ${book.title}: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable ? 'Yes':'No'}`
} 






type GetUniqueValues = (array1: number[] | string [], array2: number[] | string[]) => number[] | string[];

const getUniqueValues : GetUniqueValues = (array1, array2) => {
    for(let i = 0; i<array2.length; i++){
        const currentNumber = array2[i];
        
        let find = false;
        for(let j = 0; j<array1.length; j++){
            if(currentNumber === array1[j]){
                find = true;
                break;
            }
        }
        if(!find) array1[array1.length] = array2[i];
    }

    return array1;
}




type Product ={
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}


const calculateTotalPrice = (products: Product[]) : number =>{

    const totalPrice = products.reduce((total, item) => {
            let currentTotal = item.price * item.quantity;
            
            if(item.discount){
                if(item.discount > 100 || item.discount < 0) throw new Error('Discount must be between 0-100')
                currentTotal = currentTotal - currentTotal*(item.discount/100)
            }
            return total + currentTotal;
    }, 0)    

    return totalPrice;
}
