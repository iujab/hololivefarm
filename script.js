const cat = document.getElementById("cat");
let x = 0;
let direction = -1;
let decision = 0;
let speed = 2;

function walk() {
    if (x + cat.width > window.innerWidth || x < 0) {
        direction *= -1;
    }
    x += speed * direction;
    cat.style.left = x + "px";
    cat.style.transform = "scaleX(" + -direction + ")";
    requestAnimationFrame(walk);
}

setInterval(() => {
    const decision = Math.floor(Math.random() * 20);

    if (decision < 5) {
        speed = 0;
    } 
    else if (decision < 10) {
        speed = 0;
        setTimeout(() => {
            direction *= -1;
            speed = 2;
        }, 1500);
    } 
    else {
        speed = 2;
    }
}, 2000);

walk();