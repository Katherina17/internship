let optionArr = [5, 10, 20];
let currentPage = 1;
let totalCount = 1;
let pageSize = 5;

function fillPageSizes(){
    let selectElement = document.getElementById("page-size");
    for(let i = 0; i < optionArr.length; i++){
        let option = document.createElement('option');
        option.innerText = optionArr[i];
        selectElement.appendChild(option);
    }
}


function getData(pageNumber = 1, pageSize = 5){
    fetch(`http://localhost:3000/restaurants?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fillTable(data['data']);
        totalCount = Number(data["totalCount"]);
        createPagination();
        let pagItems = document.getElementsByClassName('page-link');
        for(let item of pagItems) {
            if(item.innerText == String(currentPage)) {
                item.setAttribute("class", "page-link active-page");
            }
            else {
                item.setAttribute("class", "page-link");
            }
        }
    })
}



function fillTable(data){
    console.log(data);
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
                if(data[i][key].length > 0) {
                    td.innerText = data[i][key][0]['grade'];
                }
            } else{
                td.innerText = data[i][key];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function showPagination(paginationArr){
    let paginationList = document.getElementById('pagination-list');
    paginationList.innerHTML = "";
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

    let arrowSingleBack = document.createElement('li');
    arrowSingleBack.setAttribute('class', "page-item");
    let refArrow = document.createElement('a');
    refArrow.setAttribute('class', 'page-link');
    refArrow.setAttribute('aria-label', "Previous");
    arrowSingleBack.appendChild(refArrow);
    let spanArrow = document.createElement('span');
    spanArrow.setAttribute('aria-hidden', 'true');
    spanArrow.innerText = '‹';
    refArrow.appendChild(spanArrow);
    paginationList.appendChild(arrowSingleBack);
    
    
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

    let arrowSingleNext = document.createElement('li');
    arrowSingleNext.setAttribute('class', "page-item");
    let refArrowNext = document.createElement('a');
    refArrowNext.setAttribute('class', 'page-link');
    refArrowNext.setAttribute('aria-label', "Previous");
    arrowSingleNext.appendChild(refArrowNext);
    let spanArrowNext = document.createElement('span');
    spanArrowNext.setAttribute('aria-hidden', 'true');
    spanArrowNext.innerText = '›';
    refArrowNext.appendChild(spanArrowNext);
    paginationList.appendChild(arrowSingleNext);
    
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

    let pagItems = document.getElementsByClassName('page-link');
    let select = document.getElementById('page-size');
    let totalPages = paginationArr[paginationArr.length - 1];
    for(let i = 0; i < pagItems.length; i++){
        pagItems[i].addEventListener('click', ev => {
            if(pagItems[i].innerText !== '...'){
                if(pagItems[i].innerText == '›') {
                    currentPage = currentPage == totalPages ? totalPages : currentPage + 1;
                } else if(pagItems[i].innerText == '»') {
                    currentPage = totalPages;
                } else if(pagItems[i].innerText == '‹'){
                    currentPage = currentPage == totalPages ? totalPages : currentPage - 1;
                } else if(pagItems[i].innerText == '«'){
                    currentPage = 1;
                } else {
                    currentPage = Number(pagItems[i].innerText);
                }
                getData(currentPage, pageSize);
            }
            
        })
    }
}

function createPagination() {
    let totalPages = Math.ceil(totalCount/pageSize);
    let paginationArr = [];
    if(totalPages < 10){
       for (let i = 1; i <= totalPages; i++){
           paginationArr.push(i);
       }
    } else {
        if(currentPage < 5){
            for (let i = 1; i <= currentPage + 2; i++){
                paginationArr.push(i);
            }
            paginationArr.push('...');
            paginationArr.push(totalPages);
        } else if(currentPage == totalPages){
            paginationArr.push(1);
            paginationArr.push('...');
            for( let i = totalPages - 2;  i <= totalPages; i++){
                paginationArr.push(i);
            }
        } else if(currentPage + 1 == totalPages){
            paginationArr.push(1);
            paginationArr.push('...');
            for( let i = currentPage - 2;  i <= currentPage + 1 ; i++){
                paginationArr.push(i);
            }   
         } else if(currentPage + 2 == totalPages){
            paginationArr.push(1);
            paginationArr.push('...');
            for( let i = currentPage - 2;  i <= currentPage + 2 ; i++){
                paginationArr.push(i);
            }
               
         } else if(currentPage + 3 == totalPages){
            paginationArr.push(1);
            paginationArr.push('...');
            for( let i = currentPage - 2;  i <= currentPage + 3 ; i++){
                paginationArr.push(i);
            }   
         } else if(currentPage >= 5){
            paginationArr.push(1);
            paginationArr.push('...');
            for( let i = currentPage - 2;  i <= currentPage + 2 ; i++){
                paginationArr.push(i);
            }
            paginationArr.push('...');
            paginationArr.push(totalPages);
        } 
    showPagination(paginationArr);
}
}
     

document.getElementById('page-size').addEventListener('change', ev => {
    let select = document.getElementById('page-size');
    currentPage = 1;
    pageSize = select.options[select.selectedIndex].value;
    getData(currentPage, pageSize);
})

fillPageSizes();
getData();