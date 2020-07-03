//Menu szablon
var menu = `<div class="start-menu pt-5 pb-1 p-2" id="menu">
        <div class="container-fluid">
            <div class="row">
                <div class="col-7 bg-white p-2 c flex-column justify-content-between align-items-start"
                     style="font-size: 14px">
                    <div class="w-100">
                        <div class="left-side-item pl-1"><i class="fab fa-chrome mr-2" style="width: 16px"></i>Gugle
                            Chrom
                        </div>
                        <div class="left-side-item pl-1"><i class="fab fa-discord mr-2" style="width: 16px"></i>Diskuerd
                        </div>
                        <div class="left-side-item pl-1"><i class="fas fa-folder mr-2" style="width: 16px"></i>Menedżer
                            plików
                        </div>
                        <div class="left-side-item pl-1"><i class="fab fa-edge mr-2" style="width: 16px"></i>Mikrosof
                            Edz
                        </div>
                        <div class="left-side-item pl-1"><i class="fas fa-music mr-2" style="width: 16px"></i>Muzyka
                        </div>
                        <div class="left-side-item pl-1"><i class="far fa-play-circle mr-2" style="width: 16px"></i>Odtwarzacz
                            Wideo
                        </div>
                        <div class="left-side-item pl-1"><i class="fas fa-calculator mr-2" style="width: 16px"></i>Kalkulator
                        </div>
                        <div class="left-side-item pl-1"><i class="far fa-sticky-note mr-2" style="width: 16px"></i>Notatnik
                        </div>
                    </div>
                    <div class="border-bottom mt-2 w-100"></div>
                    <div class="w-100 wszystkie"><i class="fas fa-caret-right pl-1" style="width: 16px;"></i>Wszystkie
                        programy
                    </div>
                </div>
                <div class="col-5 right-sideSM">
                    <div class="right-side-item">Użytkownik</div>
                    <div class="right-side-item">Dokumenty</div>
                    <div class="right-side-item">Obrazy</div>
                    <div class="right-side-item">Muzyka</div>
                    <div class="border border-secondary"></div>
                    <div class="right-side-item">Komputer</div>
                    <div class="border border-secondary"></div>
                    <div class="right-side-item">Panel Sterowania</div>
                    <div class="right-side-item">Ustawienia</div>
                    <div class="right-side-item">Uruchom</div>
                </div>
            </div>
            <div class="row">
                <div class="col-7 p-2 wysz">
                    <div class="wysz-in"><input type="text" placeholder="Wyszukaj programy i pliki"></div>
                </div>
                <div class="col-5 c justify-content-start power-menu">
                    <div class="c power-options">
                        <div class="power-zam">Zamknij</div>
                        <div class="power-st"><i class="fas fa-chevron-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
//OKNO szablon
var okno = `<div class="pasek c justify-content-between">
                    <div class="funkcyjne">
                        <i class="far fa-window-minimize c okno--zminimalizuj"></i>
                        <i class="far fa-window-maximize c okno--rozszerz"></i>
                        <i class="fas fa-times c okno--zamknij"></i>
                    </div>
            </div>
            <div class="tresc"></div>`;
var menuStan = 0;
// oknoF();
//Menu star lewy dolny
$('.start').click(function (e) {
    e.stopPropagation();
    if (menuStan) {
        $(".start-menu").remove();
        menuStan = 0;
    } else {
        $('.bottom-bar').prepend(menu);
        menuStan = 1;
    }
});
//Gdy klikniecie poza menu to zamkniecie go
$(document).click(function (e) {
    var elem = $(e.target).attr('class');
    if ((elem.indexOf("start-menu") < 0) & (elem.indexOf("col-5") < 0) & (elem.indexOf("col-7") < 0) & (elem.indexOf("wszystkie") < 0)) {
        $('.start-menu').remove();
        menuStan = 0;
    }
    if (elem.indexOf("icon") < 0){
        $('.programy').remove();
        otwarte = 0;
    }
});
// ikony paska dolnego
//czy pokazany pasek zminimalizowanych
var otwarte= 0;
$('.icon').click(function (e) {
    e.stopPropagation();
    var ikonawybor = $(this).attr('wybor');
    ikonawybor2 = '.'+ikonawybor;
    var czyCosjestZM = $('.zminimalizowane');
    var zm = 0;
    // console.log(czyCosjestZM);
    $(czyCosjestZM).each(function() {
        var zmAt = $(this).attr('id');
        if (zmAt.indexOf(ikonawybor) > -1){
            zm = 1;
            return;
        }
    });
    //czy są jakies zminimalizowane
    if(!zm){
        tworzenieOkna(ikonawybor);
    }else{
        if(!otwarte){
            var offsetIkona = $(this).offset();
            var progelement = document.createElement('div');
            $(progelement).addClass('programy');
            $(progelement).attr('id',ikonawybor);
            $('.main').find("[idy='" + ikonawybor + "']").each(function( index ) {
                var oknoID = $(this).attr("id");
                //tworzenie pojedynczego prog
                var proglista = document.createElement('div');
                $(proglista).addClass('prog-item');
                $(proglista).attr('id',oknoID);
                $(proglista).text(oknoID);
                progelement.appendChild(proglista);
            });
            var dodaj =  document.createElement('div');
            $(dodaj).addClass('dodawanieOkna');
            $(dodaj).html('<i class="fas fa-plus"></i>');
            $(dodaj).attr('id',ikonawybor);
            progelement.prepend(dodaj);

            $(progelement).css({
                'position': 'absolute',
                'top': offsetIkona.top,
                'left': offsetIkona.left,
                'transform': 'translateY(-100%)'
            });
            $('.main').append(progelement);
            prog();
            otwarte = 1;
        }else{
            $('.programy').remove();
            otwarte = 0;
        }
    }

});
function prog() {
    $('.prog-item').click(function () {
        var jakiProg = $(this).attr("id");
        var progotw = $("#"+jakiProg);
        progotw.show();
        $(progotw).removeClass('zminimalizowane');
        progotw.css("z-index", "3000");
        $(".tresc").parent().css("z-index", "100");
        znajdzOkno2(progotw);
    });
    $('.dodawanieOkna').click(function () {
        var jakieOkno = $(this).attr("id");
        tworzenieOkna(jakieOkno);
    });
}
function tworzenieOkna(wybor){
    for (i = 0; i > -1; i++) {
        var napis = '#'+wybor+i;
        var znajdz = $(napis).length;
        if (znajdz === 0) {
            var znalezione = wybor + i;
            var htmlObject = document.createElement('div');
            $(htmlObject).attr("id",znalezione);
            $(htmlObject).addClass("okno");
            $(htmlObject).attr('idy',wybor);
            $(htmlObject).css("z-index", "3000");
            htmlObject.innerHTML = okno;
            $(htmlObject).find('.pasek').prepend('<div class="ml-2" style="color:rgb(70,70,255);">'+wybor +'</div>');
            $('.main').append(htmlObject);
            stanRoz = 0;
            oknoF();
            return;
        }
    }
}

//pokazanie okna
var stanRoz = 0;
function oknoF() {
    $(".pasek").click(function () {
        $(".pasek").parent().css("z-index", "100");
        $(this).parent().css("z-index", "3000");
        if (stanRoz) {
            zmniejszOknoPoKlikniecuwPasek(this);
            $(this).find('.fa-window-restore').addClass('fa-window-maximize').removeClass('fa-window-restore');
        }
    });
    $(".tresc").mousedown(function () {
        $(".tresc").parent().css("z-index", "100");
        $(this).parent().css("z-index", "3000");
    });
    $(".okno").draggable({
        containment: '.main',
        handle: '.pasek'
    }).resizable({
        containment: ".main",
        handles: 'n,ne,nw,e,se,s,sw,w,wn',
    });
    $('.okno--zamknij').click(function (e) {
        e.stopPropagation();
        var ktoreOkno = $(this).closest(".okno");
        ktoreOkno.remove();
        znajdzOkno(ktoreOkno);

    });
    $('.okno--rozszerz').click(function (e) {
        e.stopPropagation();
        if (!stanRoz) {
            rozszerzOkno(this);
        } else {
            zmniejszOkno(this);
        }
    });
    $('.okno--zminimalizuj').click(function (e) {
        e.stopPropagation();
        var zmini = $(this).closest(".okno");
        var idzmini = zmini.attr('idy');
        // console.log(idzmini);
        $(zmini).addClass('zminimalizowane').hide();
        var znalezionaIkona = $('.main').find("[wybor='" + idzmini + "']");
        // console.log(znalezionaIkona);
        $(znalezionaIkona).css('background','linear-gradient(180deg, rgba(255,255,255,0) 0px,rgba(0,0,0,0) 47px,rgba(20,20,255,0.9))');
    });
}
function znajdzOkno2(a) {
    var czyZmieniacKolor = 1;
    var idzam2 = $(a).attr('idy');
    $('.main').find("[idy='" + idzam2  + "']").each(function() {
        var sprawdzenieidy= $(this).attr('class');
        var luknij = sprawdzenieidy.indexOf('zminimalizowane');
        if(luknij > -1){
            czyZmieniacKolor = 0;
        }
    });
    if(czyZmieniacKolor){
        var znajdzIkone2 = $('.main').find("[wybor='" + idzam2 + "']");
        znajdzIkone2.css('background','transparent');
    }
}
function znajdzOkno(a) {
    var idzam = $(a).attr('idy');
    var czyJakiesokno = $('.main').find("[idy='" + idzam + "']").length;
    if(!czyJakiesokno){
        var znajdzIkone = $('.main').find("[wybor='" + idzam + "']");
        znajdzIkone.css('background','transparent');
    }
}
function zmniejszOkno(a) {
    $(a).removeClass('fa-window-restore');
    $(a).addClass('fa-window-maximize');
    zmniejszOknoPoKlikniecuwPasek(a);
}

function zmniejszOknoPoKlikniecuwPasek(a) {
    var oknoAplikacji2 = $(a).closest(".okno");
    oknoAplikacji2.css({
        'width': '1000px',
        'height': '600px',
        'top': '0',
        'left': '0'
    });
    oknoAplikacji2.draggable('enable');
    stanRoz = 0;
}

function rozszerzOkno(a) {
    $(a).removeClass('fa-window-maximize');
    $(a).addClass('fa-window-restore');
    var oknoAplikacji = $(a).closest(".okno");
    oknoAplikacji.css({
        'width': '100%',
        'height': 'calc(100% - 50px)',
        'top': '0',
        'left': '0'
    });
    oknoAplikacji.draggable('disable');
    stanRoz = 1;
}




