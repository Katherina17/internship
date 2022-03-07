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

function createPagination(totalPages, currentPage){
    let paginationArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let paginationList = document.getElementById('pagination-list');
    let previous = document.createElement('li');
    previous.setAttribute('class', "page-item");
    let refPrevious = document.createElement('a');
    refPrevious.setAttribute('class', 'page-link');
    refPrevious.setAttribute('aria-label', "Previous");
    previous.appendChild(refPrevious);
    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerText = '«';
    refPrevious.appendChild(span);
    paginationList.appendChild(previous);
    
    
    for (let i = 0; i < paginationArr.length; i++){
        let paginationItem = document.createElement('li');
        let reference = document.createElement('a');
        reference.innerText = paginationArr[i];
        paginationItem.setAttribute('class', "page-item");
        reference.setAttribute('class', 'page-link');
        paginationItem.setAttribute('class', 'paginationClick');
        paginationItem.appendChild(reference);
        paginationList.appendChild(paginationItem);
    }
    
    let next = document.createElement('li');
    next.setAttribute('class', "page-item");
    let refNext = document.createElement('a');
    refNext.setAttribute('class', 'page-link');
    refNext.setAttribute('aria-label', "Next");
    next.appendChild(refNext);
    let nextSpan = document.createElement('span');
    nextSpan.setAttribute('aria-hidden', 'true');
    nextSpan.innerText = '»';
    refNext.appendChild(nextSpan);
    paginationList.appendChild(next);
}

createPagination();

let pagItems = document.getElementsByClassName('paginationClick');
for(let i = 0; i < pagItems.length; i++){
    pagItems[i].addEventListener('click', ev => {
        let select = document.getElementById('page-size');
        select.options[select.selectedIndex].value;
        getData(pagItems[i].innerText, select.options[select.selectedIndex].value);
        
    })
}




