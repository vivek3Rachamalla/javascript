function printFun(num){
    console.log("the number is " + num);
}

function takesNumber(num, fun){
    fun(num);
}

takesNumber(2,printFun);


function firstLetter(firstName, lastName){
    return firstName.charAt(0)+lastName.charAt(0)
}

console.log(firstLetter("vivek","rachamalla"));