const heartClick = async (event) => {
  event.preventDefault();
  console.log("favorite button");
  // fetch('/api/dogs/vote',{
  //   method: 'POST',
  //   body: JSON.stringify({winner: ,loser:})
  // })
};

document
  .getElementById("favorite-button")
  .addEventListener("click", heartClick);
