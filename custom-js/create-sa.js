

//=================== Create Sales Admin Function ==========================
async function createSalesAdmin() {

  // Get relevant form values
  const Name = document.querySelector('input[name="fullName"]').value;
  const emailAddress = document.querySelector('input[name="registerEmail"]').value;

  // Validate inputs
  if (!Name || !emailAddress) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    // Create the data object to be sent
    const salesAdminData = {
      fullName: Name,
      // email: emailAddress
    };

    const response = await fetch('https://sun-company.onrender.com/agents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(salesAdminData)
    });

    
      console.log("Sales Admin data to be sent:", salesAdminData);

    if (!response.ok) {
      throw new Error('Failed to create Sales Admin. Please try again.');
    }

    const data = await response.json();
    console.log("Sales Admin created successfully:", data);
    alert("Sales Admin created successfully!");

    // Reset form
    document.querySelector('form.form-horizontal').reset();

  } catch (error) {
    console.error("Error creating Sales Admin:", error);
    alert("Error creating Sales Admin: " + error.message);
  }
}

        

      // const form = document.querySelector('form.form-horizontal');
      // form.addEventListener('submit', function(event) {
      //   event.preventDefault(); 
      //   createSalesAdmin();
      // });
