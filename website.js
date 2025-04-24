function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

//  Part above made with AI

function randomNum(lowerBound, upperBound){
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}


const container = document.getElementById("circleContainer");
var circles = [];
for (let i = 0; i < 6000; i++) {
    const circle = document.createElement("div");
    circle.className = "circles";
    container.appendChild(circle);
    circles.push(circle)
}

let counter = 0;
setInterval(() => {
    circles = shuffleArray(circles)
    circles.forEach((loopVal) => {
        setTimeout(() => {
            // let rand = randomNum(1, 2);
            const r = Math.floor((Math.sin(counter) + 1) / 2 * 255);
            const g = Math.floor((Math.sin(counter + 2) + 1) / 2 * 255);
            const b = Math.floor((Math.sin(counter + 4) + 1) / 2 * 255);
            loopVal.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            loopVal.style.transform = `scale(1.4)`;
        }, counter * 10);
        counter++;
    });


    circles.forEach(loopVal => {
        loopVal.style.backgroundColor = "#515151";
        loopVal.style.transform = `scale(1)`;
    });
}, 2000);

// let secondCounter = 0
// document.addEventListener("mousemove", (event) => {
//     const mouseX = event.x;
//     const mouseY = event.y;
//     circles.forEach((loopVal) => {
//         const circleX = loopVal.offsetLeft + loopVal.offsetWidth / 2;
//         const circleY = loopVal.offsetTop + loopVal.offsetHeight / 2;
//         const distanceFromCursor = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));

//         if (distanceFromCursor < 20){

//             loopVal.style.backgroundColor = "rgb(143, 39, 39)";
//         };
//     });
//     secondCounter += 0.05;
// });
