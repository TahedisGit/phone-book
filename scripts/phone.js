const loadPhone = async (searchText, isShowAll) => {
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

  console.log("is show all? ", isShowAll);
  // display only first 9 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    console.log(phone);
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
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>`;

    phoneContainer.appendChild(phoneCard);
  });

  // hide loader
  toggleLoading(false);
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
