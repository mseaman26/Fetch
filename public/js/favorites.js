

const favoriteCheckboxHandler = async (event) => {
    if(event.target.classList.contains('form-check-input')){
        id = event.target.dataset.dog_id
        console.log(id)
        if(event.target.checked){
            await fetch ('/api/favorites', {
                method: 'POST',
                body: {
                    dog_id: id
                },
                headers: { 'Content-Type': 'application/json' }
            })
        }else {

        }
    }  
}

document.addEventListener('click', favoriteCheckboxHandler)