

//==================== Sales Form Submission Logic (Updated) =================================================
    
    document.addEventListener('DOMContentLoaded', function() {
        

  //================ Fetch accounts from backend API and populate the select dropdown

            async function populateAgentDropdown() {
              console.log(" Starting agent dropdown population...");

              try {
                console.log("Sending GET request to fetch agents...");
                const response = await fetch('https://sun-company.onrender.com/agents/my-agents', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include'
                });

                console.log(" Response received:", response);

                if (!response.ok) {
                  console.error(" Server responded with error status:", response.status);
                  throw new Error('Failed to fetch agents');
                }

                const data = await response.json();
                console.log("Parsed response JSON:", data);

                const accountSelect = document.querySelector('select[name="account"]');

                if (!accountSelect) {
                  console.error(" Could not find the select element with name='account'");
                  return;
                }

                accountSelect.innerHTML = ''; 

                data.forEach(agent => {
                  console.log(" Processing agent:", agent);

                  const option = document.createElement('option');
                  option.value = agent.id; 
                  option.textContent = agent.name; 

                  accountSelect.appendChild(option);
                  console.log(` Added <option> for agent: [id: ${agent.id}, name: ${agent.name}]`);
                });

                console.log(" Dropdown population complete!");

              } catch (error) {
                console.error('Error fetching or processing agents:', error);
                alert('Failed to load agents. Please try again later.');
              }
            }

            // Call it when the page loads or when needed
            populateAgentDropdown();


        // Form submit handler
        document.getElementById('salesForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from actually submitting
            
            
            // if we want to keep user-selected date, remove the setdefaultdate line above
        });
   

      document.addEventListener('DOMContentLoaded', () => {
    const salesForm = document.getElementById('salesForm');
    const salesTable = document.getElementById('salesTableBody');

    salesForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const product = document.getElementById('package').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        const customer = document.getElementById('customerName').value;
        
        // Validate inputs
        if(!product || product === "") {
            alert('Please input a product');
            return;
        }
        if(!customer || customer === "") {
            alert('Please input a customer name');
            return;
        }

        const agent = document.querySelector('select[name="account"]').value;
        if(!agent || agent === "") {
            alert('Please select an agent');
            return;
        }
        // Create table row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="date">${new Date().toISOString().split('T')[0]}</td>
            <td class="agent">${agent}</td>
            <td class="customer">${customer}</td>
            <td class="product">${product}</td>
            <td class="quantity">${quantity}</td>
            <td class="price">${parseFloat(price).toFixed(2)}</td>
            <td><span class="badge badge-success">Completed</span></td>
        `;


        salesTable.appendChild(newRow);
        salesForm.reset();
    });
});

//===================== Post Button Logic =================================================

     async function postSales() {

    const rows = document.querySelectorAll('#salesTableBody tr');

    if (rows.length === 0) {
        alert('No sales records to post.');
        return;
    }

    // Extracting Data from rows to create individual objects

    const salesPayload = Array.from(rows).map(row => {
        const productName = row.querySelector('td:nth-child(4)').textContent.trim();  // Product
        const quantity = parseInt(row.querySelector('td:nth-child(5)').textContent.trim(), 10);  // Quantity
        const pricePerUnit = parseFloat(row.querySelector('td:nth-child(6)').textContent.replace('₦','').trim());  // Price
        const agentName = row.querySelector('td:nth-child(2)').textContent.trim();  // Agent
        // const customerName = row.querySelector('td:nth-child(3)').textContent.trim();  // Not used in payload

        return {
            description: productName,  // Assuming description is the product name
            agentId: agentName,        // Still using 'agentId' key to match backend, but passing name
            items: [
                {
                    productName,
                    quantity,
                    pricePerUnit
                }
            ]
        };
    });

    console.log('Sales Payload:', salesPayload);

    try {

        const response = await fetch("https://sun-company.onrender.com/sale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",
            body: JSON.stringify(salesPayload)
        });

        if (!response.ok) throw new Error('Server returned an error');

        // Success
        alert('Sales records posted successfully!');
        document.getElementById('salesTableBody').innerHTML = '';

    } catch (err) {
        console.error('Error posting sales:', err);
        alert('Failed to post sales. Please try again.');

    } finally {
      

    }
}
    });