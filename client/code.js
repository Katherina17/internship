let optionArr = [5, 10, 20];
let selElement = document.getElementById('page-size');
for(let i = 0; i < optionArr.length; i++){
    let option = document.createElement('option'); // <option></option>
    option.innerText = optionArr[i]; // <option>5</option>
    selElement.appendChild(option);
}

function fillTable(data){
    let table = document.getElementById("rest-table");
    let tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        for (let key of ["address", "borough", 'cuisine', 'grades', 'name', 'restaurant_id']){
            let td = document.createElement('td');
            if(key == "address") {
                td.innerText = data[i][key]["zipcode"];
            }
            else if(key == 'grades') {
                td.innerText = data[i][key][0]['grade'];
            } 
            else{
                td.innerText = data[i][key];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function getData(pageSize = 5, pageNumber = 1){
    fetch(`http://localhost:3000/restaurants?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        fillTable(data["data"]);
    });

}

document.getElementById('page-size').addEventListener('change', ev => {
   let select = document.getElementById('page-size');
   let pageSize = select.options[select.selectedIndex].value;
   getData(pageSize);

})


getData();




    