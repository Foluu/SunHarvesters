

async function login(email, password) {
   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

   try{
    const response = await fetch("../api/auth/login", {
        method: "POST",
        credentials: "include", // for cookies
        headers: {
            "Content-Type": "application/json"     
           },
        body: JSON.stringify({ email, password })  
      });

    if (!response.ok) {
        throw new Error("Login failed");   
     }
     } catch(error){

            alert("error" + error.message);    
        }
    console.log("Login successful");     
   }
    login("user@example.com", "securepassword");


document.getElementById("contactform").addEventListener("submit", function(event) {
    
    event.preventDefault();

});