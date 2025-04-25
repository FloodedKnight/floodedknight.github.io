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
for (let i = 0; i < 1000; i++) {
    const circle = document.createElement("div");
    circle.className = "circles";
    container.appendChild(circle);
    circles.push(circle)
}

let counter = 0;
const selectedCircles = new Set();
const cooldownCircles = new Set();

setInterval(() => {
    circles = shuffleArray(circles)


    circles.forEach((loopVal) => {
        if (selectedCircles.has(loopVal)) return;
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
        loopVal.style.boxShadow = `0 0 0px rgba(51, 51, 51, 0.6)`;
        loopVal.style.transform = `scale(1)`;
    });
}, 2000);


let zoomLevel = 1;
window.addEventListener("wheel", (gridZoom) => {
    gridZoom.preventDefault();

    const speed = 0.05;
    let zoom_InOut = gridZoom.deltaY
    if (zoom_InOut < 0) {
        zoomLevel += speed;
    } else {
        if (zoomLevel >= 1){
            zoomLevel -= speed;
        }
    }

    zoomLevel = Math.max(0.2, Math.min(zoomLevel, 3));

    container.style.transform = `scale(${zoomLevel})`;
    container.style.transformOrigin = "center center";
}, { passive: false });

// Part below by AI
document.addEventListener("click", (e) => {
    let circleCoords = [];
    const getX = e.clientX;
    const getY = e.clientY;

    let remainingCircles = [...circles];

    for (let i = 0; i < 1000; i++) {
        let closestCircle = null;
        let minDistance = Infinity;

        remainingCircles.forEach(circle => {
            const rect = circle.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = getX - cx;
            const dy = getY - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                minDistance = distance;
                closestCircle = circle;
            }
        });

        if (closestCircle) {
            circleCoords.push(closestCircle);
            remainingCircles = remainingCircles.filter(c => c !== closestCircle); // remove it from future checks
        }
    }


    circleCoords.forEach((circle, index) => {
        if (cooldownCircles.has(circle)) return; // skip if on cooldown

        cooldownCircles.add(circle); // put on cooldown
        setTimeout(() => {
            circle.style.transform = `scale(3)`;

            // Reset after 1 second
            setTimeout(() => {
                circle.style.backgroundColor = "#515151";
                circle.style.transform = `scale(1)`;
            }, 1000);

            // Remove cooldown after 2 seconds (or however long you want)
            setTimeout(() => {
                cooldownCircles.delete(circle);
            }, 2000);

        }, index * 1); // stagger timing
    });
});
