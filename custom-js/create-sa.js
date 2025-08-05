

//=================== Create Sales Admin Function ==========================

    document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form.form-horizontal');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        createSalesAdmin();
    });

    });

    async function createSalesAdmin() {
    const name = document.querySelector('input[name="fullName"]').value;
    const emailAddress = document.querySelector('input[name="registerEmail"]').value;

    console.log("Name:", name, "Email:", emailAddress);

    if (!name || !emailAddress) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const salesAdminData = {
        name: name,
        // email: emailAddress
        };

        console.log("Sales Admin data to be sent:", salesAdminData);

        const response = await fetch('https://sun-company.onrender.com/agents/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(salesAdminData)
        
        });

        if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to create Sales Admin. Please try again.');
        }

        const data = await response.json();

        console.log("Sales Admin created successfully:", data);

        alert("Sales Admin created successfully!");

        document.querySelector('form.form-horizontal').reset();

    } catch (error) {
        console.error("Error creating Sales Admin:", error);

        alert("Error creating Sales Admin: " + error.message);
    }

    }

