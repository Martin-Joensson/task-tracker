const button = document.querySelector("#dog-button") as HTMLButtonElement;
const image = document.querySelector("#dog-image") as HTMLImageElement;
const loading = document.querySelector("#dog-loading") as HTMLParagraphElement;

button.addEventListener("click", getDog);

type DogResponse = {
  message: string;
  status: string;
};

function getRandomNumber(): number {
  let randomNumber = Math.random();
  return randomNumber;
}

async function getDog(): Promise<void> {
  let apiSrc = "https://dog.ceo/api/breed/whippet/images/random";
  if (getRandomNumber() < 0.2) {
    apiSrc = "https://dog.ceo/api/breed/poodle/standard/images/random";
  } else if (getRandomNumber() < 0.6) {
    apiSrc = "https://dog.ceo/api/breed/shiba/images/random";
  } else {
    apiSrc = "https://dog.ceo/api/breed/whippet/images/random";
  }

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
