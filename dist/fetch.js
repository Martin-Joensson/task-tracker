const button = document.querySelector("#dog-button");
const image = document.querySelector("#dog-image");
const loading = document.querySelector("#dog-loading");
const breedSelect = document.querySelector("#breed-select");
button.addEventListener("click", getDog);
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
export {};
//# sourceMappingURL=fetch.js.map