const heartClick = async (event) => {
  event.preventDefault();
  console.log("favorite button");
};

document
  .getElementById("favorite-button")
  .addEventListener("click", heartClick);
