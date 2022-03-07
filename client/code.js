let optionArr = [5, 10, 20];
let selectElement = document.getElementById("page-size");
for(let i = 0; i < optionArr.length; i++){
    let option = document.createElement('option');
    option.innerText = optionArr[i];
    selectElement.appendChild(option);
}

function getData(pageNumber = 1, pageSize = 5){
    fetch(`http://localhost:3000/restaurants?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillTable(data['data']);
    })
}

getData();

function fillTable(data){
    let table = document.getElementById("rest-table");
    let tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerText = '';
    for (let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        for(let key of ["address", "borough", 'cuisine', 'grades', 'name', 'restaurant_id']){
            let td = document.createElement('td');
            if (key == 'address'){
                td.innerText =  data[i][key]['zipcode'];
            } else if (key == 'grades'){
                td.innerText = data[i][key][0]['grade'];
            } else{
                td.innerText = data[i][key];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

document.getElementById('page-size').addEventListener('change', ev => {
    let select = document.getElementById('page-size');
    select.options[select.selectedIndex].value;
    getData(1, select.options[select.selectedIndex].value);
})


