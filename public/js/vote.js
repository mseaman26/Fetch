const cuterClick = async (event) => {
  event.preventDefault();
  if(event.target.classList.contains('cuter-button'))
  console.log("favorite button");

};

document
  .addEventListener("click", cuterClick);
