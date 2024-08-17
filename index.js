window.onload = function() {
    setTimeout(function() {
        document.getElementById('popupMessage').style.display = 'block';
    }, 2000);
}

function closePopup() {
    document.getElementById('popupMessage').style.display = 'none';
}