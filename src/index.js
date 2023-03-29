fetch("http://localhost:3000/characters")
.then(response => response.json())
.then(charactersData => {
  if (!Array.isArray(charactersData)) {
    charactersData = Array.from(charactersData);
  }
  charactersData.forEach(character => {
    // add character name to character bar
    const characterBar = document.getElementById("character-bar");
    const characterName = document.createElement("span");
    characterName.textContent = character.name;
    characterName.addEventListener("click", () => {
      // display character details in detailed info
      displayCharacterDetails(character);
    });
    characterBar.appendChild(characterName);
  });
})
.catch(error => console.error(error));

function displayCharacterDetails(character) {
// display character details in detailed info
const detailedInfo = document.getElementById("detailed-info");
const name = detailedInfo.querySelector("#name");
const image = detailedInfo.querySelector("#image");
const voteCount = detailedInfo.querySelector("#vote-count");

name.textContent = character.name;
image.src = character.image;
image.alt = character.name;
voteCount.textContent = character.votes;

const votesForm = detailedInfo.querySelector("#votes-form");
votesForm.addEventListener("submit", event => {
  event.preventDefault();
  const votesInput = votesForm.querySelector("#votes");
  const votes = parseInt(votesInput.value, 10);
  character.votes += votes;
  voteCount.textContent = character.votes;
  votesInput.value = "";
});

const resetButton = detailedInfo.querySelector("#reset-btn");
resetButton.addEventListener("click", () => {
  character.votes = 0;
  voteCount.textContent = character.votes;
});
}
