




  document.addEventListener("DOMContentLoaded", async () => {
    const topThreeContainer = document.getElementById("top-three-leaderboard");
    const othersContainer = document.getElementById("other-leaderboard");



    try {
      const res = await fetch('/api/top-sales-reps');


      const data = await res.json();
      const topThree = data.slice(0, 3);
      const rest = data.slice(3);



      // Render Top 3

      topThree.forEach(user => {
        const dashbgClass = `dashbg-${user.rank}`; // e.g., dashbg-1
        const topBlock = `
          <div class="col-lg-4">
            <div class="user-block block text-center">
              <div class="avatar"><img src="${user.avatar}" alt="..." class="img-fluid">
                <div class="order ${dashbgClass}">${ordinal(user.rank)}</div>
              </div>
              <a href="#" class="user-title">
                <h3 class="h5">${user.name}</h3><span>${user.handle}</span>
              </a>
              <div class="contributions">${user.sales} Sales</div>
              <div class="details d-flex">
                <div class="item"><i class="icon-info"></i><strong>${user.metrics.info}</strong></div>
                <div class="item"><i class="fa fa-gg"></i><strong>${user.metrics.gg}</strong></div>
                <div class="item"><i class="icon-flow-branch"></i><strong>${user.metrics.branches}</strong></div>
              </div>
            </div>
          </div>
        `;

        topThreeContainer.innerHTML += topBlock;

      });




      // Render Remaining Users

      rest.forEach(user => {
        
        const otherBlock = `
          <div class="public-user-block block">
            <div class="row d-flex align-items-center">                   
              <div class="col-lg-4 d-flex align-items-center">
                <div class="order">${ordinal(user.rank)}</div>
                <div class="avatar">
                  <img src="${user.avatar}" alt="..." class="img-fluid">
                </div>
                <a href="#" class="name">
                  <strong class="d-block">${user.name}</strong>
                  <span class="d-block">${user.handle}</span>
                </a>
              </div>
              <div class="col-lg-4 text-center">
                <div class="contributions">${user.sales} Sales</div>
              </div>
              <div class="col-lg-4">
                <div class="details d-flex">
                  <div class="item"><i class="icon-info"></i><strong>${user.metrics.info}</strong></div>
                  <div class="item"><i class="fa fa-gg"></i><strong>${user.metrics.gg}</strong></div>
                  <div class="item"><i class="icon-flow-branch"></i><strong>${user.metrics.branches}</strong></div>
                </div>
              </div>
            </div>
          </div>
        `;

        othersContainer.innerHTML += otherBlock;

      });




    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      topThreeContainer.innerHTML = `<p class="text-center">Leaderboard failed to load.</p>`;
    }
  });


  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  


