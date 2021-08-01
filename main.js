function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    /*loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });*/

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Password must be at least 8 characters in length");
            }
            if (e.target.id === "signupphoneNumber" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Phone Number must have 10 digit");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

function validateSignUpForm(){
    let students = sessionStorage.getItem("students");
    if(students != null){
        students = JSON.parse(students);
    }
    const email = document.getElementById("signupEmail").value;
    const name = document.getElementById("signupName").value;
    const address = document.getElementById("signupAddress").value;
    const phonenumber = document.getElementById("signupphoneNumber").value;
    const password = document.getElementById("signupPassword").value;
    if(password != document.getElementById("signupConfirmPassword").value){
        alert("Password does not Match");
        return false;
    }

    if(students && checkStudentExist(students, email)) {
        alert("student is already registered");
        return false;
    }

    const student = {email: email, name: name, address: address,phonenumber: phonenumber, password: password};

    if(!students){
        const arr = [];
        arr.push(student);
        sessionStorage.setItem("students", JSON.stringify(arr));
    } else {
        students.push(student);
        sessionStorage.setItem("students", JSON.stringify(students));
    }

    return true;
}

function checkStudentExist(arr, email){
    for(let i=0;i<arr.length; i++){
        if(arr[i]["email"] === email){
            return true;
        }
    }
    return false;
}


function loginUser(){
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    if(checkUserValid(email, password)){
        handleClick(email);
    } else{
        alert("Invalid credentials");
    }
}

function checkUserValid(email, password){
    let students = sessionStorage.getItem("students");
    if(students != null){
        students = JSON.parse(students);
        for(let i=0;i<students.length; i++) {
            if (students[i]["email"] === email && students[i]["password"] === password) {
                return true;
            }
        }
        return false;
    }

    return false;
}

const handleClick = (email) => {
    window.location = ('./Resume.html?email=' + email)
}
