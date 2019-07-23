var Switcher = (function() {
    return {
        init(target) {
            let c = document.querySelector(target);
            let ctx= c.getContext("2d");
            
            let width = c.width;
            let height = c.height;
            let r = height / 2;
            let border = 2;
            let bg = c.getAttribute("bg");
            let onColor = c.getAttribute("onColor");
            let offColor = c.getAttribute("offColor");
            let circle = c.getAttribute("circle");
            
            let status = c.getAttribute("status");
            
            if (status == "on")
                drawOn();
            else
                drawOff();
            
            c.onclick = function() {
                status = status == "on"? "off": "on";
                c.setAttribute("status", status);
                if (status == "on")
                    drawOn();
                else
                    drawOff();
            }
            
            function drawOn() {
                let start_x = r;
                let handle = setInterval(function() {
                    ctx.fillStyle = bg;
                    ctx.clearRect(0, 0, width, height);
            
                    ctx.beginPath();
                    ctx.fillStyle = onColor;
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.rect(r, 0, r * 2, r * 2);
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.fill();
            
                    ctx.beginPath();
                    ctx.fillStyle = circle;
                    ctx.arc(start_x, r, r - border, 0, Math.PI * 2);
                    ctx.fill();
            
                    if (start_x == width - r)
                        clearInterval(handle);
            
                    start_x ++;
                }, 20);
            }
            
            function drawOff() {
                let start_x = width - r;
                let handle = setInterval(function() {
                    ctx.fillStyle = bg;
                    ctx.clearRect(0, 0, width, height);
            
                    ctx.beginPath();
                    ctx.fillStyle = offColor;
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.rect(r, 0, r * 2, r * 2);
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.fill();
            
                    ctx.beginPath();
                    ctx.fillStyle = circle;
                    ctx.arc(start_x, r, r - border, 0, Math.PI * 2);
                    ctx.fill();
            
                    if (start_x == r)
                        clearInterval(handle);
            
                    start_x --;
                }, 20);
            }
        }
    }
})();

