
document.getElementById("contactform").addEventListener("submit", async function(event) {

    event.preventDefault(); // prevent form from refreshing the page

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("https://sun-company.onrender.com/auth/login", {
            method: "POST",
            credentials: "include", // Send cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        console.log("Login successful:", data);
        alert("Login successful!");


      

    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
    }


 //  redirect to dashboard

    window.location.href = "/Sun-Harvesters App/index.html";
    localStorage.setItem("user", JSON.stringify({ email, password }));
});
