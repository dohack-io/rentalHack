console.log("Test")

document.getElementById("login-button").addEventListener("click",
() => {
    
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    console.log(email);
    console.log(password);
    loadingNav();
    corsRequest("https://almond-dunlin-3705.twil.io/sync-token", reqListener);
});