/* =====================================================
   SAMPLE VEHICLE DATA
===================================================== */

let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [

  {
    id: 1,
    name: "Toyota Camry XSE",
    make: "Toyota",
    type: "Car",
    year: 2022,
    price: 2850000,
    fuel: "Petrol",
    km: 18500,
    location: "Kochi, Kerala",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "BMW 3 Series",
    make: "BMW",
    type: "Car",
    year: 2021,
    price: 3950000,
    fuel: "Petrol",
    km: 24000,
    location: "Bangalore, Karnataka",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Honda City ZX",
    make: "Honda",
    type: "Car",
    year: 2023,
    price: 1680000,
    fuel: "Petrol",
    km: 12000,
    location: "Thrissur, Kerala",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 4,
    name: "Mercedes-Benz GLC",
    make: "Mercedes",
    type: "SUV",
    year: 2020,
    price: 5200000,
    fuel: "Diesel",
    km: 31000,
    location: "Chennai, Tamil Nadu",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 5,
    name: "Ford Endeavour",
    make: "Ford",
    type: "SUV",
    year: 2021,
    price: 3650000,
    fuel: "Diesel",
    km: 27000,
    location: "Calicut, Kerala",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 6,
    name: "Honda CB350",
    make: "Honda",
    type: "Bike",
    year: 2022,
    price: 185000,
    fuel: "Petrol",
    km: 8500,
    location: "Ernakulam, Kerala",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80"
  }

];


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  renderVehicles(vehicles);
  updateDashboard();

});


/* =====================================================
   FORMAT CURRENCY
===================================================== */

function formatPrice(price) {

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);

}


/* =====================================================
   RENDER VEHICLES
===================================================== */

function renderVehicles(list) {

  const grid = document.getElementById("vehicleGrid");
  const noResults = document.getElementById("noResults");

  grid.innerHTML = "";

  if (list.length === 0) {

    noResults.style.display = "block";

    return;

  }

  noResults.style.display = "none";


  list.forEach(vehicle => {

    const card = document.createElement("article");

    card.className = "vehicle-card";

    card.innerHTML = `

      <img
        class="vehicle-image"
        src="${vehicle.image}"
        alt="${vehicle.name}"
      >

      <div class="vehicle-card-body">

        <div class="vehicle-top">

          <div>

            <div class="vehicle-name">
              ${vehicle.name}
            </div>

            <div class="vehicle-meta">
              ${vehicle.year} • ${vehicle.make}
            </div>

          </div>

          <button
            class="favorite"
            onclick="toggleFavorite(this)"
          >
            ♡
          </button>

        </div>


        <div class="vehicle-specs">

          <span>⛽ ${vehicle.fuel}</span>

          <span>🛣 ${Number(vehicle.km).toLocaleString()} km</span>

          <span>🚘 ${vehicle.type}</span>

        </div>


        <div class="vehicle-price">
          ${formatPrice(vehicle.price)}
        </div>


        <div class="vehicle-footer">

          <span class="vehicle-location">
            📍 ${vehicle.location}
          </span>

          <button
            class="btn btn-primary details-btn"
            onclick="showDetails(${vehicle.id})"
          >
            View Details
          </button>

        </div>

      </div>
    `;

    grid.appendChild(card);

  });

}


/* =====================================================
   SEARCH + FILTER
===================================================== */

function searchVehicles() {

  const heroSearch =
    document.getElementById("heroSearch").value.toLowerCase();

  const filterSearch =
    document.getElementById("filterSearch").value.toLowerCase();

  const keyword = heroSearch || filterSearch;

  const type =
    document.getElementById("heroType").value;

  const minPrice =
    Number(document.getElementById("heroMinPrice").value) || 0;

  const maxPrice =
    Number(document.getElementById("heroMaxPrice").value) || Infinity;

  const make =
    document.getElementById("filterMake").value;

  const fuel =
    document.getElementById("filterFuel").value;

  const sort =
    document.getElementById("sortVehicles").value;


  let filtered = vehicles.filter(vehicle => {

    const matchesKeyword =
      !keyword ||
      vehicle.name.toLowerCase().includes(keyword) ||
      vehicle.make.toLowerCase().includes(keyword);

    const matchesType =
      !type || vehicle.type === type;

    const matchesMake =
      !make || vehicle.make === make;

    const matchesFuel =
      !fuel || vehicle.fuel === fuel;

    const matchesPrice =
      vehicle.price >= minPrice &&
      vehicle.price <= maxPrice;

    return (
      matchesKeyword &&
      matchesType &&
      matchesMake &&
      matchesFuel &&
      matchesPrice
    );

  });


  if (sort === "low") {

    filtered.sort((a, b) => a.price - b.price);

  }

  if (sort === "high") {

    filtered.sort((a, b) => b.price - a.price);

  }

  if (sort === "year") {

    filtered.sort((a, b) => b.year - a.year);

  }

  if (sort === "newest") {

    filtered.sort((a, b) => b.id - a.id);

  }


  renderVehicles(filtered);

}


/* =====================================================
   VEHICLE DETAILS
===================================================== */

function showDetails(id) {

  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) return;

  document.getElementById("detailImage").src =
    vehicle.image;

  document.getElementById("detailTitle").textContent =
    vehicle.name;

  document.getElementById("detailPrice").textContent =
    formatPrice(vehicle.price);


  document.getElementById("detailSpecs").innerHTML = `

    <div>
      <span>Year</span>
      <strong>${vehicle.year}</strong>
    </div>

    <div>
      <span>Fuel</span>
      <strong>${vehicle.fuel}</strong>
    </div>

    <div>
      <span>Kilometers</span>
      <strong>${Number(vehicle.km).toLocaleString()}</strong>
    </div>

    <div>
      <span>Type</span>
      <strong>${vehicle.type}</strong>
    </div>

    <div>
      <span>Make</span>
      <strong>${vehicle.make}</strong>
    </div>

    <div>
      <span>Location</span>
      <strong>${vehicle.location}</strong>
    </div>

  `;

  document
    .getElementById("detailsModal")
    .classList.add("show");

}


function closeDetails() {

  document
    .getElementById("detailsModal")
    .classList.remove("show");

}


/* =====================================================
   SELL VEHICLE
===================================================== */

function openSellModal() {

  document
    .getElementById("sellModal")
    .classList.add("show");

}


function closeSellModal() {

  document
    .getElementById("sellModal")
    .classList.remove("show");

}


document
  .getElementById("vehicleForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();


    const vehicle = {

      id: Date.now(),

      name:
        document.getElementById("vehicleName").value,

      make:
        document.getElementById("vehicleMake").value,

      type:
        document.getElementById("vehicleType").value,

      year:
        Number(document.getElementById("vehicleYear").value),

      price:
        Number(document.getElementById("vehiclePrice").value),

      fuel:
        document.getElementById("vehicleFuel").value,

      km:
        Number(document.getElementById("vehicleKm").value),

      location:
        document.getElementById("vehicleLocation").value,

      image:
        document.getElementById("vehicleImage").value ||
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"

    };


    vehicles.unshift(vehicle);

    saveVehicles();

    renderVehicles(vehicles);

    updateDashboard();

    document
      .getElementById("vehicleForm")
      .reset();

    closeSellModal();

    alert("Vehicle listing published successfully!");

  });


/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveVehicles() {

  localStorage.setItem(
    "vehicles",
    JSON.stringify(vehicles)
  );

}


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(button) {

  button.classList.toggle("active");

  button.textContent =
    button.classList.contains("active")
      ? "♥"
      : "♡";

}


/* =====================================================
   LOGIN
===================================================== */

function openLogin() {

  document
    .getElementById("loginModal")
    .classList.add("show");

}


function closeLogin() {

  document
    .getElementById("loginModal")
    .classList.remove("show");

}


function login(event) {

  event.preventDefault();

  closeLogin();

  openDashboard();

}


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function openDashboard() {

  closeLogin();

  document
    .getElementById("dashboard")
    .classList.add("show");

  updateDashboard();

}


function closeDashboard() {

  document
    .getElementById("dashboard")
    .classList.remove("show");

}


/* =====================================================
   DASHBOARD NAVIGATION
===================================================== */

function showDashboard(section) {

  const panels = [
    "overview",
    "inventory",
    "sales",
    "customers",
    "settings"
  ];

  panels.forEach(name => {

    const panel =
      document.getElementById(name + "Panel");

    if (panel) {

      panel.classList.add("hidden");

    }

  });


  document
    .getElementById(section + "Panel")
    .classList.remove("hidden");


  const titles = {

    overview: "Dashboard Overview",
    inventory: "Vehicle Inventory",
    sales: "Sales Management",
    customers: "Customer Management",
    settings: "Settings"

  };


  document.getElementById("dashboardTitle")
    .textContent = titles[section];


  document
    .querySelectorAll(".dashboard-nav a")
    .forEach(item => item.classList.remove("active"));


  const navItems =
    document.querySelectorAll(".dashboard-nav a");

  const index = panels.indexOf(section);

  if (navItems[index]) {

    navItems[index].classList.add("active");

  }

}


/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

  document.getElementById("totalVehicles")
    .textContent = vehicles.length;


  const recentTable =
    document.getElementById("recentTable");

  const inventoryTable =
    document.getElementById("inventoryTable");


  recentTable.innerHTML = "";

  inventoryTable.innerHTML = "";


  vehicles.slice(0, 5).forEach(vehicle => {

    recentTable.innerHTML += `

      <tr>

        <td>
          <strong>${vehicle.name}</strong>
        </td>

        <td>
          ${formatPrice(vehicle.price)}
        </td>

        <td>
          ${vehicle.year}
        </td>

        <td>
          ${vehicle.location}
        </td>

        <td>
          <span class="status">Active</span>
        </td>

      </tr>

    `;

  });


  vehicles.forEach(vehicle => {

    inventoryTable.innerHTML += `

      <tr>

        <td>
          <strong>${vehicle.name}</strong>
        </td>

        <td>
          ${vehicle.make}
        </td>

        <td>
          ${formatPrice(vehicle.price)}
        </td>

        <td>
          ${vehicle.year}
        </td>

        <td>
          ${vehicle.fuel}
        </td>

        <td>

          <button
            class="delete-btn"
            onclick="deleteVehicle(${vehicle.id})"
          >
            Delete
          </button>

        </td>

      </tr>

    `;

  });

}


/* =====================================================
   DELETE VEHICLE
===================================================== */

function deleteVehicle(id) {

  const confirmDelete =
    confirm("Delete this vehicle listing?");

  if (!confirmDelete) return;


  vehicles =
    vehicles.filter(vehicle => vehicle.id !== id);


  saveVehicles();

  renderVehicles(vehicles);

  updateDashboard();

}


/* =====================================================
   SCROLL
===================================================== */

function scrollToVehicles() {

  document
    .getElementById("vehicles")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

  const nav =
    document.querySelector(".nav-links");

  nav.style.display =
    nav.style.display === "flex"
      ? "none"
      : "flex";

}


/* =====================================================
   CLOSE MODAL ON BACKGROUND CLICK
===================================================== */

document.addEventListener("click", function(event) {

  if (
    event.target.classList.contains("modal-overlay")
  ) {

    event.target.classList.remove("show");

  }

});
