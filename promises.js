function getData() {
    
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("Fetched the data!");
            resolve ("skc@gmail.com");
            }, 4000);
        
    });
    
};
    
 async function getMail(){
    console.log("start");
    var email = await getData()
    console.log("Email id of the user id is: " + email);
    console.log("end");
 }   

 getMail();

