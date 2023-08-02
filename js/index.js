var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var siteList;


if (localStorage.getItem("siteList") == null) {
    siteList = [];
} else {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    display(siteList);
}


function submit() {
    if (validateUrl() == true) {
        var newURL = {
            name: siteName.value,
            url: siteURL.value,
        }
        siteList.push(newURL);
        display(siteList);
        clear(siteList);
        localStorage.setItem("siteList", JSON.stringify(siteList))
    } else {
        alert(`
        Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`)
    }
}

function display(list) {
    var cartona = ``
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
                    <td>${[i + 1]}</td>
                    <td>${[list[i].name]}</td>
                    <td><a href="${[list[i].url]}" target="_blank"><button  class="btn btn-success btn-sm "><i class="icofont-eye pe-2"></i>Visit</button></a></td>
                    <td><button onclick = "deleteURL(${[i]})" class="btn btn-danger btn-sm"><i class="icofont-ui-delete pe-2"></i>Delete</button></td>
                </tr>`
    }
    
    document.getElementById("tBody").innerHTML = cartona;
}

function clear() {
    siteName.value = ""
    siteURL.value = ""
}

function deleteURL(index) {
    siteList.splice(index, 1)
    localStorage.setItem("siteList", JSON.stringify(siteList))
    display(siteList)
}



function validateUrl() {
    var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (regex.test(siteURL.value) == true) {
        siteURL.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongURL").classList.add("d-none");
        return true
    } else {
        siteURL.classList.add("is-invalid");
        document.getElementById("wrongURL").classList.remove("d-none");
        return false
    }
}

function validNameUrl() {
    var regex = /[A-Z]/g;
    if (regex.test(siteName.value) == true) {
        siteName.classList.replace("is-invalid", "is-valid");
        document.getElementById("wrongName").classList.add("d-none");
        return true
    } else {
        siteName.classList.add("is-invalid");
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
}