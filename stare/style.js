$(window).on("load", function () {
    setTimeout(function () {
        $('.loader1').fadeOut("slow");
        $('.logo').addClass("logo-anim");
        $('.text1').addClass("text1-anim");
        $('.text2').addClass("text2-anim");
    }, 800)

});
$('html, body')
    .animate({
        scrollTop: 500,
        scrollLeft: 300
    }, 600);

setTimeout(function () {
    $('html, body').animate({
        scrollTop: 0,
        scrollLeft: 0
    }, 800);

}, 800);
setTimeout(function () {
    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= $('.strony').offset().top - 1000) {
            $('.strony .img').each(function (i) {
                setTimeout(function () {
                    $('.strony .img').eq(i).addClass('show');
                }, 150 * (i + 1));
            });
        }
    });
}, 1600);

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    canvas2 = document.getElementById('canvas2'),
    ctx2 = canvas2.getContext('2d'),
    // full screen dimensions
    cw = window.innerWidth,
    ch = window.innerHeight,
    charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    maxCharCount = 100,
    fallingCharArr = [],
    fontSize = 10,
    maxColums = cw / (fontSize),
    color = "#ce5eff";
canvas.width = canvas2.width = cw;
canvas.height = canvas2.height = ch;


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.draw = function (ctx) {

    this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
    this.speed = randomFloat(1, 5);


    ctx2.fillStyle = "rgba(50,100,100,0.8)";
    ctx2.font = fontSize + "px san-serif";
    ctx2.fillText(this.value, this.x, this.y);

    ctx.fillStyle = color;
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y);



    this.y += this.speed;
    if (this.y > ch) {
        this.y = randomFloat(-100, 0);
        this.speed = randomFloat(2, 5);
    }
}

for (var i = 0; i < maxColums; i++) {
    fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
}


var update = function () {

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, cw, ch);

    ctx2.clearRect(0, 0, cw, ch);

    var i = fallingCharArr.length;

    while (i--) {
        fallingCharArr[i].draw(ctx);
        var v = fallingCharArr[i];
    }

    requestAnimationFrame(update);
}

update();

function paralax() {
    $(window).scroll(function () {
        var Scroll = $(this).scrollTop();
        $('.logo-main').css({
            'transform': 'translate(0px, ' + Scroll / 12 + '%)'
        });
        $('.text-logo').css({
            'transform': 'translate(0px, ' + Scroll / 10 + '%)'
        });
    });
}

var szerokosc = $(window).width();
if (szerokosc > 992) {
    paralax();
}

$(window).on('resize', function () {
    szerokosc = $(window).width();
    if (szerokosc < 992) {
        $(window).off('scroll');
    } else {
        paralax();
    }
});

//var text = $(".text1");
var r = 255,
    g = 0,
    b = 0,
    auto = 1;

function yellow() {
    if (auto == 1) {
        if (g != 255) {
            g++;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(yellow, 15);
        } else {
            green();
        }
    }
}

function green() {
    if (auto == 1) {
        if (r != 0) {
            r--;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(green, 15);
        } else {
            aqua();
        }
    }
}

function aqua() {
    if (auto == 1) {
        if (b != 255) {
            b++;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(aqua, 15);
        } else {
            blue();
        }
    }
}

function blue() {
    if (auto == 1) {
        if (g != 0) {
            g--;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(blue, 15);
        } else {
            magenta();
        }
    }
}

function magenta() {
    if (auto == 1) {
        if (r != 255) {
            r++;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(magenta, 15);
        } else {
            red();
        }
    }
}

function red() {
    if (auto == 1) {
        if (b != 0) {
            b--;
            color = "rgb(" + r + "," + g + "," + b + ")";
            $(".text1").attr('style', 'color:' + 'rgb(' + r + ',' + g + ',' + b + ')' + '!important');
            setTimeout(red, 15);
        } else {
            yellow();
        }
    }
}

yellow();

$(window).on("keydown", function (e) {
    if (e.keyCode == 65) {
        auto = 0;
        color = "#00e2ff";
        $(".text1").attr('style', 'color: #00e2ff !important');
    } else if (e.keyCode == 66) {
        auto = 0;
        color = "#003bff";
        $(".text1").attr('style', 'color: #003bff !important');
    } else if (e.keyCode == 70) {
        auto = 0;
        color = "#6200ff";
        $(".text1").attr('style', 'color: #6200ff !important');
    } else if (e.keyCode == 71) {
        auto = 0;
        color = "#1f8400";
        $(".text1").attr('style', 'color: #1f8400 !important');
    } else if (e.keyCode == 76) {
        auto = 0;
        color = "#0aff00";
        $(".text1").attr('style', 'color: #0aff00 !important');
    } else if (e.keyCode == 79) {
        auto = 0;
        color = "#ff8900";
        $(".text1").attr('style', 'color: #ff8900 !important');
    } else if (e.keyCode == 80) {
        auto = 0;
        color = "#c23aff";
        $(".text1").attr('style', 'color: #c23aff !important');
    } else if (e.keyCode == 82) {
        auto = 0;
        color = "#ff1515";
        $(".text1").attr('style', 'color: #ff1515 !important');
    } else if (e.keyCode == 89) {
        auto = 0;
        color = "#ffd804";
        $(".text1").attr('style', 'color: #ffd804 !important');
    } else if (e.keyCode == 48) {
        r = 255;
        g = 0;
        b = 0;
        auto = 1;
        yellow();
        $(".text1").attr('style', 'color: #5a7e63 !important');
    }
});
