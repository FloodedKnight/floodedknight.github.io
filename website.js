let paused = false;

// Listen for tab visibility change
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    paused = true;
  } else {
    paused = false;
    counter = 0; // Optionally reset counter if you want a fresh animation
  }
});

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

// let hue = 0;

//   function updateBackground() {
//     hue = (hue + 1) % 360;

//     const color2 = `hsl(${(hue + 60) % 360}, 50%, 50%)`;

//     document.body.style.background = `
//     repeating-linear-gradient(rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 70px),
//     repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0 1px, transparent 1px 70px),
//     linear-gradient(180deg, ${color2}, #000000)`;

//     document.head.appendChild(style);
//     }
//   setInterval(updateBackground,50); // Update every 30ms for smooth animation

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
  if (paused) return;

  circles = shuffleArray(circles);
  const chosen = circles.slice(0, 20);
  chosen.forEach((loopVal, index) => {
      setTimeout(() => {
          const r = Math.floor((Math.sin(counter) + 1) / 2 * 255);
          const g = Math.floor((Math.sin(counter + 2) + 1) / 2 * 255);
          const b = Math.floor((Math.sin(counter + 4) + 1) / 2 * 255);
          const randBlur = randomNum(5, 10)
          loopVal.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
          loopVal.style.boxShadow = `0px 0px ${randBlur}px 1px rgba(${r}, ${g}, ${b}, 1)`;
          loopVal.style.transform = `scale(1.9)`;
      }, 0);

      setTimeout(() => {
          loopVal.style.backgroundColor = "rgba(51,51,51,1)";
          loopVal.style.boxShadow = `0 0 0px rgba(51, 51, 51, 0.6)`;
          loopVal.style.transform = `scale(1)`;
      }, 1000);

      counter++;
  });
}, 2000);


let zoomLevel = 1.5;
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



