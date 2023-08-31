const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  // clearing pages after another search
  phoneContainer.textContent = "";

  // display show all button if there are more than 9 phones
  const showButtonContainer = document.getElementById("show-all-container");
  if (phones.length >= 9 && !isShowAll) {
    showButtonContainer.classList.remove("hidden");
  } else {
    showButtonContainer.classList.add("hidden");
  }

  // console.log("is show all? ", isShowAll);
  // display only first 9 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `<figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>${phone.slug}</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>`;

    phoneContainer.appendChild(phoneCard);
  });

  // hide loader
  toggleLoading(false);
};

// handle show details
const handleShowDetails = async (id) => {
  console.log(id);
  // load single data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
  <p><span>Storage: ${phone?.mainFeatures?.storage}</span></p> 
  <p><span>Chipset: ${phone?.mainFeatures?.chipSet}</span></p>
  <p><span>Releasedate: ${
    phone?.releaseDate || "no release date available"
  }</span></p>
  <p><span>Displaysize: ${phone?.mainFeatures?.displaySize}</span></p>
  `;
  showDetails.showModal();
};

const handleSearch = (isShowAll) => {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// loader
const toggleLoading = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// handle show all button
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
