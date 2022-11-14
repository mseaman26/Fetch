# Express Note Taker
  ## Description
    This application is for rating the cuteness of dogs.  After the user logs in, they have access to a page that lets them choose between two dogs, favoring the one that they believe to be more cute.  As they do so, rating points are added and taken away accordingly and the dogs ascend or descent the rankings.  The user also has the option of adding dogs to their favorites as they go.  They can view their favorite dogs on the "favorites" page.  The user can also check the overall rankings on the "leaderboard" page

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Table of Contents
  * [Code Snippets](#code-snippets)<br />
  * [Usage](#usage)<br />
  * [Contributing to This Repository](#how-to-contribute-to-this-repository)<br />
  * [Questions](#questions)<br />

  ## Overview of the application
<img src="./public/assets/Overview.gif">

  ## Code Snippets
    Here we have the usage of the "Pretty-checkbox.css" library.  This allowed our voting page to have a heart-shaped button for the "add to favorites" functionality
```javascript
<div
  class="pretty p-icon p-toggle p-plain form-check row justify-content-center"
>
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="favs-checkbox"
    data-dog_id="{{id}}"
    name="favorite"
  />
  <div class="state p-off">
    <i
      class="icon fa fa-heart-o"
      style="position: relative !important; top: auto !important;"
    ></i>
    <label class="form-check-label" for="favs-checkbox">Add to Favorites</label>
  </div>
  <div class="state p-on p-info-o">
    <i
      class="icon fa fa-heart"
      style="position: relative !important; top: auto !important;"
    ></i>
    <label class="form-check-label" for="favs-checkbox">Add to Favorites</label>
  </div>
</div>
```
    Here we have the route that renders the "vote" page.  It chooses two random dogs, makes sure that they are not the same, and allows the user to choose which one is cuter
```javascript
router.get("/vote", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const dbDogs = await Dogs.findAll({
    });
    
    const dogVote = await dbDogs.map((dog) => {
       return dog.get({ plain: true });
    });
    let index1 = Math.floor(Math.random() * dogVote.length)
    function findAnotherRandomDog(){
        let index = Math.floor(Math.random() * dogVote.length)
        if(index !== index1){
            return index
        } else{
            return findAnotherRandomDog()
        }
    }
    let index2 = findAnotherRandomDog()
    let dogs = [dogVote[index1], dogVote[index2]]
    res.render("vote", {
      dogs: dogs,
        loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});
```
    Here is a function that seeds our Favorites table.  The program was set up with 20+ fake users and it was helpful for the development of the program to have the Favorites table populated with random data
```javascript
const seedFavorite = async(num) =>{
    try{
        const userData = await User.findAll();
        const dogData = await Dogs.findAll();
        for(let i = 0; i < num; i++)
        {
            try{
                await dogData[Math.floor(Math.random() * dogData.length)]
                .addUsers(userData[
                    Math.floor(Math.random() * userData.length)
                ])
            } catch(err){
                console.log("\n\nhaha")
            }
        }
    }
    catch (err){
        console.log(err)
    } 
}
```
  ## Usage

    Simply visit the following link!

[Fetch](https://fetch00.herokuapp.com/login)
    
  ## How to Contribute to This Repository:

    Contact one of us via email
    
  ## Questions
    If you have any questions about this project, feel free to reach out to one of us at:
  <a href="MSeaman26@gmail.com">MSeaman26@gmail.com</a><br/>
  <a href="phliphuang2@gmail.com">phliphuang2@gmail.com</a><br/> 
  <a href="danielapacker@gmail.com">danielapacker@gmail.com</a><br/>
  <a href="mpete3d@gmail.com">mpete3d@gmail.com</a>

    

