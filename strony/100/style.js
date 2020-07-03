$(document).ready(function() {
    var max = 100;
    var wynik = 0;
    var koniec = false;
    var turagracza = 1;
    //wczytanie
    $("#wynik").text(wynik);
    $("#tura").children("span").text(turagracza);

    $(".btn-i").click(function() {
        if (!koniec) {
            var dodaj = parseInt($(this).children("span").text());

            if ((wynik + dodaj) >= max) {
                koniec = true;
                if (turagracza == 1) {
                    var wygral = 2;
                    $("header").removeClass("bg-info");
                    $("header").addClass("bg-danger");
                } else {
                    var wygral = 1;
                    $("header").removeClass("bg-danger");
                    $("header").addClass("bg-info");
                }
                $("#wynik").addClass("koniec");
                $("#wynik").text("WYGRAŁ GRACZ NR: " + wygral);
                $("#tura").removeClass("d-block");
                $("#tura").addClass("d-none");
            } else {
                wynik += dodaj;
                $("#wynik").text(wynik);
                if (turagracza == 1) {
                    turagracza = 2;
                    $("#tura").removeClass("bg-success");
                    $("#tura").addClass("bg-primary");
                    $("header").removeClass("bg-info");
                    $("header").addClass("bg-danger");
                } else {
                    turagracza = 1;
                    $("#tura").removeClass("bg-primary");
                    $("#tura").addClass("bg-success");
                    $("header").removeClass("bg-danger");
                    $("header").addClass("bg-info");
                }
                $("#tura").children("span").text(turagracza);
            }
        }
    });
    $("#reset").click(function() {
        reset();
    });

    function reset() {
        wynik = 0;
        koniec = false;
        turagracza = 1;
        $("#tura").removeClass("d-none");
        $("#tura").addClass("d-block");
        $("#tura").children("span").text(turagracza);
        $("#tura").removeClass("bg-primary");
        $("#tura").addClass("bg-success");
        $("header").removeClass("bg-danger");
        $("header").addClass("bg-info");
        $("#wynik").text(wynik);
        $("#wynik").removeClass("text-danger");
        $("#wynik").removeClass("koniec");
    }



});
