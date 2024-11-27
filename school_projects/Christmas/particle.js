let lastTime = 0;

document.addEventListener('mousemove', (event) => {
    let currentTime = new Date().getTime();
    if (currentTime - lastTime > 40) { // Create particles at an interval of 100ms
        let x = event.clientX;
        let y = event.clientY;
        
        createParticle(x, y);
        lastTime = currentTime;
    }
});

function createParticle(x, y) {
    // Array of image paths
    const images = [
        '/school_projects/Christmas/flakes/flake.png',
        '/school_projects/Christmas/flakes/flake2.png',
        '/school_projects/Christmas/flakes/flake3.png'
    ];
    // Randomly select an image
    const image = images[Math.floor(Math.random() * images.length)];

    const particle = document.createElement('img');
    particle.src = image;
    particle.classList.add('particle');

    // Add a slight random offset to each particle
    const offsetX = Math.random() * 20 - 10; // Range [-10, 10]
    const offsetY = Math.random() * 20 - 10; // Range [-10, 10]

    particle.style.left = `${x + offsetX}px`;
    particle.style.top = `${y + offsetY}px`;

    document.querySelector('body').appendChild(particle);

    // Remove the particle after the animation ends
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}
