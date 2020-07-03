$( document ).ready(function() {
    $('.navbar-toggler').click(function () {   //ikona hamburger animacja
        $('.navbar-toggler').toggleClass('change');
    });
    //pokazanie ikony play i tytulu filmu
    $(".out").mouseenter(function() {
        var film = $(this).find(".film");
        var tytul = $(film).attr( "tytul" );
        var rok = $(film).attr( "rok" );
        $(film).html('<div class="playO"><div class="play"><i class="fas fa-play"></i></div><span class="title">'+tytul+'<b style="color: #2f6bff;">'+' '+rok+'</b></span></div>');
        $(film).find(".play").animate({width: "90px",borderRadius: "30%"});
        setTimeout(function(){
            $(film).find(".title").animate({bottom: "10"});
        }, 50);

    });
    $(".out").mouseleave(function() {
        var film = $(this).find(".film");
        $(film).find(".play").animate({width: "0px"});
        $(film).html('');
    });
    //algorytm flex
    flexElements();
    $( window ).resize(function() {   //zmienianie wielkosci okna
        flexElements();
    });
    function flexElements() {
        var wPudelko = $(".tab").outerWidth();   //wielkosc elementu nadrzednego - pudelko
        var wItem = $(".out").outerWidth()+4;  //wielkosc elementu podrzednego - item | item mial po 2px marginu
        var iloscItem = $(".out").length;    //ilosc elementow - itemow
        var iloscWrzedzie = parseInt(wPudelko/ wItem);  // ilosc elementow jakie moga sie zmiescic w rzedzie
        var oItemy = iloscItem%iloscWrzedzie; //ilosc elementow w ostatnim rzedzie
        if(oItemy){  //jesli ostatni rzadz cos zawiera , jesli nie to nic nie trzeba dodawac
            var bItemy = iloscWrzedzie-oItemy;   //obliczenie ile pustych elementow
        }else{
            var bItemy =0;  // 0 pustych elementow
        }
        var bItemyDodane = $(".out2").length; //aktualna ilosc pustych elementow
        var obl = bItemy-bItemyDodane;
        if(obl < 0){
            for(var i=0; i>obl;i--){  //usuwanie elementow pustow
                $('.out2').remove();
            }
        }else if(obl > 0){
            for(var i=0; i<obl;i++){  //dodawanie pustych elementow
                $('.tab').append('<div class="out2"><div class="film shadow"></div><div class="badge roz badge-light"></div><div class="badge rat badge-light"></div></div>');
            }
        }
    }
    //koniec algorytm flex

   //hover na desktopie  a click na phonie
    const $dropdown = $(".dropdown");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";
        $(window).on("load resize", function() {
            if (this.matchMedia("(min-width: 992px)").matches) {
                $dropdown.hover(
                    function() {
                        const $this = $(this);
                        $this.addClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "true");
                        $this.find($dropdownMenu).addClass(showClass);
                    },
                    function() {
                        const $this = $(this);
                        $this.removeClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "false");
                        $this.find($dropdownMenu).removeClass(showClass);
                    }
                );
                $dropdown.click(
                    function() {
                        const $this = $(this);
                        $this.addClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "true");
                        $this.find($dropdownMenu).addClass(showClass);
                    }
                );
            } else {
                $dropdown.off("mouseenter mouseleave");
            }
        });
        //podazanie lini
    $( window ).resize(function() {
        if($(window).outerWidth() > 992){
            follow()
            $(".line").css("display","block");
            $( ".nav-tabs > li" ).removeClass("nav-itemP");
        }else{
            $(".line").css("display","none");
            $( ".nav-tabs > li" ).addClass("nav-itemP");
        }
    });
    if($(window).outerWidth() > 992){
        follow()
    }else{
        $( ".nav-tabs > li" ).addClass("nav-itemP");
    }
    $( ".nav-tabs > li" ).click(function() {
        if($(window).outerWidth() > 992){
            $( ".nav-tabs > li" ).removeClass("active");
            $(this).toggleClass("active");
            follow();
        }
    });
    function follow() {
        var foundActive = false,
            activeElement, linePosition = 0,
            menuLine = $(".line"),
            lineWidth,defaultPosition, defaultWidth;
        $(".menuLine > ul > li").each(function() {
            if ($(this).hasClass('active')) {
                activeElement = $(this);
                foundActive = true;
                console.log("mam");
            }
        });
        if (foundActive === false) {
            activeElement = $(".menuLine > ul > li").first();
        }
        defaultWidth = lineWidth = activeElement.width();
        defaultPosition = linePosition = activeElement.position().left;
        menuLine.css("width", lineWidth);
        menuLine.css("left", linePosition);
        $(".menuLine > ul > li").hover(function() {
                activeElement = $(this);
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            },
            function() {
                menuLine.css("left", defaultPosition);
                menuLine.css("width", defaultWidth);
            });
    }
});