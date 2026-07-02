const button = document.querySelector("#dog-button");
const image = document.querySelector("#dog-image");
button.addEventListener("click", getDog);
function getRandomNumber() {
    let randomNumber = Math.random();
    return randomNumber;
}
async function getDog() {
    let apiSrc = "https://dog.ceo/api/breed/whippet/images/random";
    if (getRandomNumber() === 0) {
        apiSrc = "https://dog.ceo/api/breed/poodle/standard/images/random";
    }
    if (getRandomNumber() === 1) {
        apiSrc = "https://dog.ceo/api/breed/poodle/standard/images/random";
    }
    try {
        button.disabled = true;
        const response = await fetch(apiSrc);
        const data = await response.json();
        console.log(data);
        image.src = data.message;
    }
    catch (error) {
        alert("Somthing went wrong.");
        console.log(error);
    }
    button.disabled = false;
}
export {};
//# sourceMappingURL=fetch.js.map