const url = "https://jsonplaceholder.typicode.com/users"
let emailArray = [];
let usernameArray = [];


// fill Email Div with emails
function setEmailDiv() {
    const emailDiv = document.getElementById('emails');
    emailArray.sort();
    let str = '';
    for (email of emailArray) {
        str += `<p>${email}</p>`;
    }
    emailDiv.innerHTML = str;
}

// fill Username Div with usernames
function setUsernameDiv() {
    const usernameDiv = document.getElementById('usernames');
    usernameArray.sort(function (a, b) { return a.length - b.length });
    let str = '';
    for (username of usernameArray) {
        str += `<p>${username}</p>`;
    }
    usernameDiv.innerHTML = str;
}


// XMLHttpRequest to retreive users and their emails from url
const xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open('GET', url);
xmlHttpRequest.onload = function () {
    if (xmlHttpRequest.status === 200) {
        let userArray = JSON.parse(this.responseText);
        for (let i = 0; i < userArray.length; i++) {
            emailArray.push(userArray[i].email);
            setEmailDiv();
        }
    }
    else {
        console.log('ERROR', xmlHttpRequest.statusText);
    }
};
xmlHttpRequest.onerror = function () {
    console.log('Network Error');
}
xmlHttpRequest.send();


// fetch API to retreive users and their usernames from url
function getUsernames() {
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    return;
                }
                response.json().then(function (data) {
                    const userArray = data;
                    for (let i = 0; i < userArray.length; i++) {
                        usernameArray.push(userArray[i].username);
                        setUsernameDiv();
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
getUsernames();