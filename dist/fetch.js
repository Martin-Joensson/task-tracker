const button = document.querySelector("#dog-button");
const image = document.querySelector("#dog-image");
const loading = document.querySelector("#dog-loading");
button.addEventListener("click", getDog);
function getRandomNumber() {
    let randomNumber = Math.random();
    return randomNumber;
}
async function getDog() {
    let apiSrc = "https://dog.ceo/api/breed/whippet/images/random";
    if (getRandomNumber() < 0.2) {
        apiSrc = "https://dog.ceo/api/breed/poodle/standard/images/random";
    }
    else if (getRandomNumber() < 0.6) {
        apiSrc = "https://dog.ceo/api/breed/shiba/images/random";
    }
    else {
        apiSrc = "https://dog.ceo/api/breed/whippet/images/random";
    }
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