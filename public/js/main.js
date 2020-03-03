var page = window.location.pathname.substring(1);

if ( !page || "") {
    page = "home";
} else {
    if ( page == "voted"){
        page = "vote"
    }
    document.getElementById(page).style.textDecoration = "underline";
}

document.getElementById(page).onmouseover = function() {
    this.style.color = "white"};