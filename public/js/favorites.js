

const favoriteCheckboxHandler = async (event) => {
    if(event.target.classList.contains('form-check-input')){
        console.log("button click")
        let id = event.target.dataset.dog_id
        console.log(id)
        if(event.target.checked){
            const response = await fetch ('/api/favorites', {
                method: 'POST',
                body: JSON.stringify({
                    dog_id: id
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if(!response.ok){
                console.log("response ok")
            }else{console.log(response)}
        }else {
            const favDelete = await fetch ('/api/favorites', {
                method: 'DELETE',
                body: JSON.stringify({
                    dog_id: id
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        }
    }  
}

document.addEventListener('click', favoriteCheckboxHandler)