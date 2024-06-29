const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    let w, h, particles;
    let particleDistance = 22;
    let mouse = {
        x: undefined,
        y: undefined,
        radius: 50 //wielkość pola wokół myszki
    }

    function init() {
        resizeReset();
        animationLoop();
    }

    function resizeReset() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

        particles = [];
        for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 3; y < h; y += particleDistance) {
            for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 3; x < w; x += particleDistance) {
                particles.push(new Particle(x, y));
            }
        }
    }

    function animationLoop() {
        ctx.clearRect(0, 0, w, h);
        drawScene();
        requestAnimationFrame(animationLoop);
    }

    function drawScene() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
    }

    function mousemove(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    }

    function mouseout() {
        mouse.x = undefined;
        mouse.y = undefined;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 0.7; // wielkość kulki
            this.baseX = this.x;
            this.baseY = this.y;
            this.speed = (Math.random() * 50) + 5;
        }
        draw() {
            ctx.fillStyle = "rgba(140,225,63,1)"; //kolor i przeźroczystość 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 1, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let directionX = forceDirectionX * force * this.speed;
            let directionY = forceDirectionY * force * this.speed;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 80;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 80;
                }
            }
        }
    }

    init();
    window.addEventListener("resize", resizeReset);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);