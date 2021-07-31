function init(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const email = params.email;
    let students = JSON.parse(sessionStorage.getItem("students"));

    for(let i=0;i<students.length; i++){
        if(students[i]["email"] === email){
            document.getElementById("resumename").innerText = students[i]["name"];
        }
    }
}
window.onload = init;