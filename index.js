// Select elements
const digitalClock = document.getElementById('digitalClock');
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const analogClock = document.getElementById('analogClock');

// Function to update both clocks
function updateClocks() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // Update digital clock (zero padded)
  digitalClock.textContent =
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0');

  // Calculate angles for analog clock (offset by 90deg to start at the top)
  const secondsDeg = ((seconds / 60) * 360) + 90;
  const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  const hoursDeg = (((hours % 12) / 12) * 360) + ((minutes / 60) * 30) + 90;

  // Rotate hands
  secondHand.style.transform = `rotate(${secondsDeg}deg)`;
  minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;
}

// Create tick marks dynamically
for (let i = 0; i < 12; i++) {
  const tick = document.createElement('div');
  tick.classList.add('tick');
  tick.style.transform = `rotate(${i * 30}deg) translateX(-50%)`;
  analogClock.appendChild(tick);
}

// Create clock numbers dynamically for clock face
const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
numbers.forEach((num, index) => {
  const numberElem = document.createElement('div');
  numberElem.classList.add('number');
  numberElem.textContent = num;
  // Calculate angle for number placement (in degrees)
  const angle = (index * 30) - 60; // Adjusted offset for proper positioning
  const radius = 120; // Distance from center
  const centerX = 150; // Half of clock width
  const centerY = 150; // Half of clock height
  const x = centerX + radius * Math.cos(angle * Math.PI / 180) - 15;
  const y = centerY + radius * Math.sin(angle * Math.PI / 180) - 15;
  numberElem.style.left = `${x}px`;
  numberElem.style.top = `${y}px`;
  analogClock.appendChild(numberElem);
});

// Initial clock update and interval
updateClocks();
setInterval(updateClocks, 1000);
