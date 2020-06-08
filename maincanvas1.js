document.mainCanvas = function () {
    let canvas = document.getElementById('mainCanvas');
    let context = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let lines = [], length = 10, lp = 0, amount = 30;
    function getLines() {
        lines = [];
        for (let i = 0; i < amount; i++) {
            lines.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
            });
        }
    }
    let startTime;
    function step(time) {
        if (!startTime)
            startTime = time;
        if (time - startTime >= 20) {
            startTime = time;
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < lines.length; i++) {
                context.beginPath();
                context.moveTo(lines[i].x + lp, lines[i].y);
                context.lineTo(lines[i].x + length, lines[i].y);
                context.strokeStyle = "#4d4d4e";
                context.stroke();
            }
            if (length < 60)
                length++;
            else
                lp++;
            if (lp == 60) {
                length = 0;
                lp = 0;
                getLines();
            }
        }
        requestAnimationFrame(step);
    }
    this.draw = function () {
        getLines();
        requestAnimationFrame(step, 1);
    }

    this.close = function () {
        cancelAnimationFrame(1);
    }
    window.addEventListener("resize", function (ev) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
}