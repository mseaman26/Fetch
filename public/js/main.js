console.log("hello")
console.log(document.location.href)

if(document.location.href == ('http://localhost:3001/vote')){
    console.log("vote button")
    let voteButton = document.querySelectorAll('.nav-vote-button')
    voteButton.style.display = "none"
}