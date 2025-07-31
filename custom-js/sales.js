
//===================== Sales Form Logic with Cookie Support =====================//



document.addEventListener('DOMContentLoaded', function () {



  //------------------ Helper: Get JSON value from cookie ---------------------//

  function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        return decodeURIComponent(parts.pop().split(';').shift());
      } catch (err) {
        console.error('Failed to decode cookie:', err);
      }
    }
    return null;
  }

  function getUserFromCookie() {
    const raw = getCookieValue('user');
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch (err) {

      console.error("Couldn't parse user cookie:", err);
      return {};
    }
  }



  //--------------------- Populate Agent Dropdown ---------------------//

  async function populateAgentDropdown() {

    console.log("Starting agent dropdown population...");

    const user = getUserFromCookie();
    const userName = user.fullName || 'Personal';
    const userId = user.id || 'personal';

    const accountSelect = document.querySelector('select[name="account"]');
    if (!accountSelect) {
      console.error("Select element not found");
      return;
    }

    accountSelect.innerHTML = '';

    const personalOption = document.createElement('option');
    personalOption.id = 'personal';
    personalOption.value = userId;
    personalOption.textContent = `${userName} (Personal)`;
    personalOption.selected = true;
    accountSelect.appendChild(personalOption);
    console.log("Added personal option:", personalOption.textContent);

    try {
      const response = await fetch('https://sun-company.onrender.com/agents/my-agents', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch agents');

      const agents = await response.json();
      console.log("Fetched agents:", agents);

      agents.forEach(agent => {
        if (agent.id === userId) return; // Skip duplicate

        const option = document.createElement('option');
        option.value = agent.id;
        option.textContent = agent.name;
        accountSelect.appendChild(option);
      });

    } catch (error) {
      console.error("Agent fetch failed:", error);
      alert('Failed to load agents.');
    }
  }



  //---------------------- Sales Form Submission Handler -------------------//

  const salesForm = document.getElementById('salesForm');
  const salesTable = document.getElementById('salesTableBody');

  salesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = document.getElementById('package').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const customer = document.getElementById('customerName').value;
    const agent = document.querySelector('select[name="account"]').value;

    if (!product) return alert('Please input a product');
    if (!customer) return alert('Please input a customer name');
    if (!agent) return alert('Please select an agent');

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




  //--------------------- Sales Posting Handler -------------------------------//

  async function postSales() {
    const rows = document.querySelectorAll('#salesTableBody tr');
    if (rows.length === 0) return alert('No sales records to post.');

    const salesPayload = Array.from(rows).map(row => {
      const productName = row.querySelector('td:nth-child(4)').textContent.trim();
      const quantity = parseInt(row.querySelector('td:nth-child(5)').textContent.trim(), 10);
      const pricePerUnit = parseFloat(row.querySelector('td:nth-child(6)').textContent.replace('₦', '').trim());
      const agentId = row.querySelector('td:nth-child(2)').textContent.trim();

      return {
        "description": productName,
        "agentId": agentId,
        "items": [
          {
            "productName": productName,
            "quantity": quantity,
            "pricePerUnit": pricePerUnit
          }
        ]
      };
    });

    console.log('Sales Payload:', salesPayload);

    try {
      const response = await fetch("https://sun-company.onrender.com/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        credentials: "include",
        body: JSON.stringify(salesPayload)
      });

      if (!response.ok) throw new Error('Server returned an error');

      alert('Sales records posted successfully!');
      document.getElementById('salesTableBody').innerHTML = '';


    } catch (err) {
      console.error('Error posting sales:', err);
      alert('Failed to post sales. Please try again.');
    }
  }



  // Call this to populate agents on page load
  populateAgentDropdown();



  // Optional: expose `postSales()` to global if it's triggered by a button
  window.postSales = postSales;




});

