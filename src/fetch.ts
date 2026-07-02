const button = document.querySelector("#dog-button") as HTMLButtonElement;
const image = document.querySelector("#dog-image") as HTMLImageElement;
const loading = document.querySelector("#dog-loading") as HTMLParagraphElement;
const breedSelect = document.querySelector(
  "#breed-select",
) as HTMLSelectElement;

button.addEventListener("click", getDog);

type DogResponse = {
  message: string;
  status: string;
};

const breeds = [
  { value: "random", label: "Random" },
  { value: "whippet", label: "Whippet" },
  { value: "shiba", label: "Shiba" },
  { value: "poodle/standard", label: "Standard Poodle" },
];

for (const breed of breeds) {
  const option = document.createElement("option");
  option.value = breed.value;
  option.textContent = breed.label;

  breedSelect.append(option);
}

async function getDog(): Promise<void> {
  const breed = breedSelect?.value ?? "whippet";
  const apiSrc =
    breed === "random"
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

    const data: DogResponse = await response.json();

    console.log(data);
    image.src = data.message;
    image.hidden = false;
  } catch (error) {
    alert("Somthing went wrong.");
    console.log(error);
  }

  loading.hidden = true;
  button.disabled = false;
}

getDog();
