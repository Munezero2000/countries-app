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

document.querySelector("#back").addEventListener("click", () => {
  location.assign("index.html");
});

let currentCountry = location.hash.substring(1);

getData().then((countries) => {
  renderDOM(countries);
});

// Function to render the DOM
function renderDOM(countries) {
  let country = countries.find((pay) => {
    console.log(currentCountry);
    return pay.name.toLowerCase().replace(/\s/g, "") === currentCountry;
  });

  document.querySelector("#flag").setAttribute("src", `${country.flags.png}`);
  document.querySelector("#name").textContent = country.name;
  document.querySelector("#native-name").textContent = country.nativeName;
  document.querySelector("#population").textContent = country.population;
  document.querySelector("#reg").textContent = country.region;
  document.querySelector("#sub-reg").textContent = country.subregion;
  document.querySelector("#capito").textContent = country.capital;
  let domain = country.topLevelDomain.map((domain) => {
    return domain + " ";
  });
  document.querySelector("#domain").innerHTML = `${domain}`;
  let currency = country.currencies.map((currency) => {
    return currency.code + " ";
  });
  document.querySelector("#currency").textContent = `${currency}`;
  let lang = country.languages.map((lang) => {
    return lang.name + " ";
  });

  document.querySelector("#languages").innerHTML = `${lang}`;

  let region = country.subregion;

  let borderingCountries = findCountries(country.borders, countries);
  let borderings = document.querySelector("#borderz");

  for (let i = 0; i < borderingCountries.length; i++) {
    let single = document.createElement("a");
    let singleStyle = [
      "bg-white",
      "p-2",
      "rounded-sm",
      "shadow-lg",
      "flex-1",
      "text-center",
      "hover:cursor-pointer",
    ];
    single.classList.add(...singleStyle);
    single.textContent = borderingCountries[i];
    borderings.appendChild(single);
    single.addEventListener("click", () => {
      console.log(single.textContent);
      location.assign(
        `detail.html#${single.textContent.toLowerCase().replace(/\s/g, "")}`
      );
      location.reload();
    });
  }
}

function findCountries(borders, countries) {
  let result = [];
  for (let i = 0; i < borders.length; i++) {
    for (let j = 0; j < countries.length; j++) {
      if (countries[j].alpha3Code === borders[i]) {
        result.push(countries[j].name);
      } else {
        continue;
      }
    }
  }
  return result;
}
