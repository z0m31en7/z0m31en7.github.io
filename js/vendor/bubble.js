//setTimeoue needed to get full screen canvas
setTimeout(function() {

  function resizeCanvas() {
    ch = window.innerHeight;
    cw = window.innerWidth;
    c.width = cw;
    c.height = ch;
  };


  var cw, ch,
    c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    parts = [],
    globalTick = 0,
    rand = function(min, max) {
      return Math.floor((Math.random() * (max - min + 1)) + min);
    };



  var Part = function() {
    this.reset();
  };

  Part.prototype.reset = function() {
    this.startRadius = rand(1, 10);
    // this.startRadius = rand(20, 25);
    this.radius = this.startRadius;
    this.x = rand(0, c.width);
    this.y = rand(0, c.height);
    this.hue = 210;
    this.saturation = rand(40, 60);
    this.lightness = rand(70, 80);
    this.startAlpha = 0.5;
    this.alpha = this.startAlpha;
    this.decayRate = .3;
    this.startLife = rand(20, 30);
    // this.startLife = 15;
    this.life = this.startLife;
    this.lineWidth = 1;
  }

  Part.prototype.update = function() {
    this.alpha = this.startAlpha * (this.life / this.startLife);
    this.radius = this.radius + 1;
    this.life -= this.decayRate;
  };

  Part.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
    ctx.lineWidth = this.lineWidth;
    ctx.fill();
    // ctx.stroke();
  };

  var createParts = function() {
    parts.push(new Part());
  };

  var updateParts = function() {
    var i = parts.length;
    while (i--) {
      if (parts[i].life < 0) {
        parts.splice(i, 1)
      }
      parts[i].update();
    }
  };

  var renderParts = function() {
    var i = parts.length;
    while (i--) {
      parts[i].render();
    }
  };

  var clear = function() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'hsla(0, 0%, 0%, 1)';
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'source-over';
  };

  //Run through the first iterations to get all the parts ready for rendering.
  for (i = 0; i < 200; i++) {
    if (globalTick % 6 == 0) {
      createParts();
    }
    updateParts();
    globalTick++;
  }

  var loop = function() {
    window.requestAnimFrame(loop, c);
    clear();

    if (globalTick % 6 == 0) {
      createParts();
    }

    updateParts();
    renderParts();
    globalTick++;


  };

  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
      window.setTimeout(a, 1E3 / 60)
    }
  }();


  resizeCanvas();
  window.onresize = resizeCanvas;

  loop();

}, 1);
