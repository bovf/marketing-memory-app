function closeBox(){
    var box = document.getElementById("ratingBox")
    box.style.visibility = 'hidden'
}

function changeColor(number){
    for (let i = 0; i < number; i++) {
        var star = document.getElementById("star"+ (i + 1).toString())
        star.style.color = "yellow"
      }
    var star = document.getElementById("star1")
}