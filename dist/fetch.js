import { capitalize } from "./utils.js";
const button = document.querySelector("#dog-button");
const image = document.querySelector("#dog-image");
const loading = document.querySelector("#dog-loading");
const breedSelect = document.querySelector("#breed-select");
const searchInput = document.querySelector("#breed-search");
button.addEventListener("click", getDog);
let allBreeds = [];
const breeds = [];
loadBreeds();
for (const breed of breeds) {
    const option = document.createElement("option");
    option.value = breed.value;
    option.textContent = breed.label;
    breedSelect.append(option);
}
async function loadBreeds() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    const breeds = data.message;
    breedSelect.innerHTML = "";
    const options = [{ value: "random", label: "Random" }];
    const randomOption = document.createElement("option");
    randomOption.value = "random";
    randomOption.textContent = "Random";
    breedSelect.append(randomOption);
    for (const breed in breeds) {
        const subBreeds = breeds[breed];
        if (subBreeds.length === 0) {
            options.push({
                value: breed,
                label: capitalize(breed),
            });
        }
        else {
            for (const sub of subBreeds) {
                options.push({
                    value: `${breed}/${sub}`,
                    label: `${capitalize(breed)} (${capitalize(sub)})`,
                });
            }
        }
    }
    allBreeds = options;
    renderBreedOptions(allBreeds);
}
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allBreeds.filter((breed) => breed.label.toLowerCase().includes(query));
    renderBreedOptions(filtered);
});
function renderBreedOptions(options) {
    breedSelect.innerHTML = "";
    for (const breed of options) {
        const option = document.createElement("option");
        option.value = breed.value;
        option.textContent = breed.label;
        breedSelect.append(option);
    }
}
async function getDog() {
    const breed = breedSelect?.value ?? "whippet";
    const apiSrc = breed === "random"
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${breed}/images/random`;
    // let apiSrc = `https://dog.ceo/api/breed/${breed}/images/random`;
    // if (breed === "random") {
    //   apiSrc = "https://dog.ceo/api/breeds/images/random";
    // } else {
    //   apiSrc = `https://dog.ceo/api/breed/${breed}/images/random`;
    // }
    try {
        button.disabled = true;
        loading.hidden = false;
        image.hidden = true;
        const response = await fetch(apiSrc);
        const data = await response.json();
        console.log(data);
        image.src = data.message;
        image.hidden = false;
    }
    catch (error) {
        alert("Somthing went wrong.");
        console.log(error);
    }
    loading.hidden = true;
    button.disabled = false;
}
getDog();
//# sourceMappingURL=fetch.js.map