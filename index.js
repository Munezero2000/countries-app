const cardCont = document.querySelector("#card-container");

const fetchAllCountries = async () => {
  const response = await fetch("./data.json");
  if (response.status === 200) {
    const data = response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
};

const getData = async () => {
  let data = await fetchAllCountries();
  return data;
};

let filter = "";

function createDom(countriesList, filter) {
  let countries;
  if (filter.length !== 0) {
    countries = countriesList.filter((country) => {
      return (
        country.name.toLowerCase().includes(filter.toLowerCase()) ||
        country.region.toLowerCase().includes(filter.toLowerCase())
      );
    });
  } else {
    countries = countriesList;
  }

  cardCont.innerHTML = "";
  for (let index = 0; index <= countries.length; index++) {
    let card = document.createElement("a");
    card.addEventListener("click", () => {
      location.assign(`detail.html#${countries[index].name}`);
    });
    let cardStyle = [
      "w-full",
      "flex",
      "flex-col",
      "bg-white",
      "rounded-lg",
      "overflow-hidden",
      "hover:cursor-pointer",
    ];
    card.classList.add(...cardStyle);
    cardCont.appendChild(card);

    let cardImage = document.createElement("img");
    cardImage.setAttribute("src", countries[index].flags.png);
    let imageStyle = ["flex-1", "w-full"];
    cardImage.classList.add(...imageStyle);
    card.appendChild(cardImage);

    let cardDesc = document.createElement("div");

    let name = document.createElement("h1");
    let nameStyle = ["font-bold", "text-xl"];
    name.classList.add(...nameStyle);
    name.textContent = countries[index].name;
    cardDesc.appendChild(name);

    let pop = document.createElement("p");
    let popStyle = ["text-lg", "font-medium"];
    pop.innerHTML = "<b>Population: </b>" + countries[index].population;
    pop.classList.add(popStyle);
    cardDesc.appendChild(pop);

    let region = document.createElement("p");
    region.innerHTML = "<b>Region: </b>" + countries[index].region;
    region.classList.add(popStyle);
    cardDesc.appendChild(region);

    let capital = document.createElement("p");
    capital.innerHTML = "<b>Capital: </b>" + countries[index].capital;
    capital.classList.add(popStyle);
    cardDesc.appendChild(capital);

    let descStyle = ["p-5", "space-y-3", "flex-1"];
    cardDesc.classList.add(...descStyle);
    card.appendChild(cardDesc);
  }
}

getData().then((countries) => {
  createDom(countries, filter);
});

document.querySelector("#search").addEventListener("input", (e) => {
  filter = e.target.value;
  console.log(filter);
  getData().then((data) => {
    createDom(data, filter);
  });
});

document.querySelector("#filter").addEventListener("change", (e) => {
  filter = e.target.value;
  console.log(filter);
  getData().then((data) => {
    createDom(data, filter);
  });
});

// country details
