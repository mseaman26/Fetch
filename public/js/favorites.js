

const favoriteCheckboxHandler = async (event) => {
    if(event.target.classList.contains('form-check-input')){
        console.log("button click")
        id = event.target.dataset.dog_id
        console.log(id)
        if(event.target.checked){
            const response = await fetch ('/api/favorites', {
                method: 'POST',
                body: {
                    dog_id: id
                },
                headers: { 'Content-Type': 'application/json' }
            })
            if(!response.ok){
                console.log("response ok")
            }else{console.log(response)}
        }else {

        }
    }  
}

document.addEventListener('click', favoriteCheckboxHandler)