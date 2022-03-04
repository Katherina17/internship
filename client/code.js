fetch("http://localhost:3000/restaurants/")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });