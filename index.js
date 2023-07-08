var darkmode_btn = document.getElementById("darkmode");
changeMode(window.localStorage.mode)
function changeMode(mode) {
    window.localStorage.mode = mode;
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", window.localStorage.mode);
    darkmode_btn.classList.remove("btn-"+window.localStorage.mode);
    darkmode_btn.classList.add(window.localStorage.mode === "dark" ? "btn-light" : "btn-dark");
    darkmode_btn.innerText = window.localStorage.mode === "dark" ? "☀️" : "🌙";
}
darkmode_btn.addEventListener('click',()=>changeMode(darkmode_btn.innerText === "🌙" ? "dark" : "light"))