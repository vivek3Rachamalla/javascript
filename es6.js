


const printName = (name) => "Hi "+name;
console.log(printName("Martin"));




const printBill = (name,bill)=> `Hi ${name}, please pay: ${bill}`;
console.log(printBill("john","450"));



const person = {
    name : 'Noam Chomsky',
    age : 92
}   
const {name,age} = person;
console.log( name, age)