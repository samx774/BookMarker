var bookmarkInputName = document.getElementById('bookmarkInputName');
var bookmarkInputUrl = document.getElementById('bookmarkInputUrl');
var tableBody = document.getElementById('tbody')
var alertBox = document.getElementById('alert')
var bookmarkContainer;


if (localStorage.getItem('myWebsites') != null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('myWebsites'));
    displayWebsite(bookmarkContainer)
}
else {
    bookmarkContainer = [];
}

// localStorage.removeItem('myWebsites')
function addWebSite(){
    if(siteNameValidation(bookmarkInputName.value) && siteUrlValidation(bookmarkInputUrl.value)){
        var webSite = {
            bookmakrName : bookmarkInputName.value,
            bookmarkUrl : bookmarkInputUrl.value,
        }
    
        bookmarkContainer.push(webSite);
        localStorage.setItem('myWebsites' , JSON.stringify(bookmarkContainer));
        console.log(bookmarkContainer)
        clearForm()
        displayWebsite(bookmarkContainer)
    }else{
        alertBox.classList.remove('d-none')
    }
}

function clearForm(){
    bookmarkInputName.value = ''
    bookmarkInputUrl.value = ''
    bookmarkInputName.classList.remove('is-invalid' , 'is-valid')
    bookmarkInputUrl.classList.remove('is-invalid' , 'is-valid')
}

function displayWebsite(array){
    var container = ``
    for(var i = 0; i < array.length; i++){
        container += `
        <tr>
        <td>${i+1}</td>
        <td>${array[i].bookmakrName}</td>
        <td><a href="${array[i].bookmarkUrl}" target="_blank"><button class="btn btn-visit btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
        <td><button onclick="deleteWebsite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`
    }
    tableBody.innerHTML= container   
}
function deleteWebsite(index){
    bookmarkContainer.splice(index, 1);
    localStorage.setItem('myWebsites' , JSON.stringify(bookmarkContainer));
    displayWebsite(bookmarkContainer);
}

function siteNameValidation(name){
    var regex = /^[A-z]{3,}$/;
    if(regex.test(name)){
        bookmarkInputName.classList.remove('is-invalid');
        bookmarkInputName.classList.add('is-valid');
        return true
    }else{
        bookmarkInputName.classList.add('is-invalid');
        return false
    }
}
function siteUrlValidation(Url){
    var regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if(regex.test(Url)){
        bookmarkInputUrl.classList.remove('is-invalid');
        bookmarkInputUrl.classList.add('is-valid');
        return true
    }else{
        
        bookmarkInputUrl.classList.add('is-invalid');
        return false
    }
}
function closeAlertBox(){
    alertBox.classList.add('d-none')
}

function removeValidAndInvalid(){
   bookmarkInputName.classList.remove('is-valid' , 'is-invalid')
   bookmarkInputUrl.classList.remove('is-valid' , 'is-invalid')
}