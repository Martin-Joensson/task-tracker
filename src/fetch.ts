import { capitalize } from "./utils.js";

const button = document.querySelector("#dog-button") as HTMLButtonElement;
const image = document.querySelector("#dog-image") as HTMLImageElement;
const loading = document.querySelector("#dog-loading") as HTMLParagraphElement;
const breedSelect = document.querySelector(
  "#breed-select",
) as HTMLSelectElement;

const searchInput = document.querySelector("#breed-search") as HTMLInputElement;

button.addEventListener("click", getDog);

type DogResponse = {
  message: string;
  status: string;
};

type BreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

type BreedOption = {
  value: string;
  label: string;
};

let allBreeds: BreedOption[] = [];

const breeds: BreedOption[] = [];

loadBreeds();

for (const breed of breeds) {
  const option = document.createElement("option");
  option.value = breed.value;
  option.textContent = breed.label;

  breedSelect.append(option);
}

async function loadBreeds(): Promise<void> {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data: BreedsResponse = await res.json();

  const breeds = data.message;

  breedSelect.innerHTML = "";

  const options: BreedOption[] = [{ value: "random", label: "Random" }];

  const randomOption = document.createElement("option");
  randomOption.value = "random";
  randomOption.textContent = "Random";
  breedSelect.append(randomOption);
  for (const breed in breeds) {
    const subBreeds = breeds[breed];

    if (subBreeds!.length === 0) {
      options.push({
        value: breed,
        label: capitalize(breed),
      });
    } else {
      for (const sub of subBreeds!) {
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

  const filtered = allBreeds.filter((breed) =>
    breed.label.toLowerCase().includes(query),
  );

  renderBreedOptions(filtered);
});

function renderBreedOptions(options: BreedOption[]) {
  breedSelect.innerHTML = "";

  for (const breed of options) {
    const option = document.createElement("option");
    option.value = breed.value;
    option.textContent = breed.label;

    breedSelect.append(option);
  }
}

async function getDog(): Promise<void> {
  const breed = breedSelect?.value ?? "whippet";
  const apiSrc =
    breed === "random"
      ? "https://dog.ceo/api/breeds/image/random"
      : `https://dog.ceo/api/breed/${breed}/images/random`;

  try {
    button.disabled = true;
    loading.hidden = false;
    image.hidden = true;

    const response = await fetch(apiSrc);

    const data: DogResponse = await response.json();

    console.log(data);
    image.src = data.message;
    image.hidden = false;
  } catch (error) {
    alert("Somthing went wrong.");
    console.log(error);
  } finally {
    loading.hidden = true;
    button.disabled = false;
  }
}

getDog();
