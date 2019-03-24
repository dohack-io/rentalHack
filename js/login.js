document.getElementById("login-button").addEventListener("click",() => {
    loadingNav();
    corsRequest("https://almond-dunlin-3705.twil.io/sync-token", reqListener);
});