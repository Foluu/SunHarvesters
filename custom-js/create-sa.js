

document.addEventListener('DOMContentLoaded', () => {


  //=================== Create Sales Admin Function ==========================



  const salesAdminForm = document.querySelector('form.form-horizontal');
  if (salesAdminForm) {
    salesAdminForm.addEventListener('submit', function (event) {
      event.preventDefault();
      createSalesAdmin();
    });
  }


  async function createSalesAdmin() {
    const fullname = document.querySelector('input[name="agentName"]').value;
    const emailAddress = document.querySelector('input[name="registerEmail"]').value;


    console.log("Name:", fullname, "Email:", emailAddress);



    if (!fullname || !emailAddress) {
      alert("Please fill in all required fields.");
      return;
    }



    try {
      const salesAdminData = {
        name: fullname
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


      salesAdminForm.reset();


    } catch (error) {
      console.error("Error creating Sales Admin:", error);
      alert("Error creating Sales Admin: " + error.message);
    }
  }











  //========================== Register a Member ========================================


  const memberForm = document.querySelector('#registerMemberForm');
  if (memberForm) {
    memberForm.addEventListener('submit', function (event) {
      event.preventDefault();
      registerMember();
    });
  }



  async function registerMember() {
    const name = document.querySelector('input[name="fullName"]').value;
    const email = document.querySelector('input[name="registerEmail"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
    const role = document.querySelector('select[name="role"]').value;




    console.log("Full Name:", name, "Email:", email, "Phone:", phone, "Role:", role);

    if (!name || !email || !role || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }



    try {
      const memberData = {
        name,
        email,
        password,
        role
      };


      console.log("Member data to be sent:", memberData);



      const response = await fetch('https://sun-company.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(memberData)
      });


      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to register member. Please try again.');
      }

      const data = await response.json();

      console.log("Member registered successfully:", data);
      alert("Member registered successfully!");

      memberForm.reset();

    } catch (error) {
      console.error("Error registering member:", error);
      alert("Error registering member: " + error.message);
    }
  }







});
