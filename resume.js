function init(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const email = params.email;
    const name =params.name;
    const address = params.address;
    const phonenumber = params.phonenumber;
    let students = JSON.parse(sessionStorage.getItem("students"));

    for(let i=0;i<students.length; i++){
        if(students[i]["email"] === email){
            document.getElementById("resumegmail").innerText = students[i]["email"];
            document.getElementById("resumename").innerText = students[i]["name"];
            document.getElementById("resumeaddress").innerText = students[i]["address"];
            document.getElementById("resumephonenumber").innerText = students[i]["phonenumber"];
        }
    }
}
window.onload = init;
