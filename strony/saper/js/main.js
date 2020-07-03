class Board {
  constructor(width, height, mines, boxes, check) {
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.tab = new Array(height);
    for (let i = 0; i < height; i++) {
      this.tab[i] = [];
    }
    const _w = this.width;
    const _h = this.height;
    const _mines = this.mines;
    const _check = check;
    this.makeBoard = () => {
      const tempBoxes = document.createDocumentFragment();
      for (let i = 0; i < _h; i++) {
        for (let j = 0; j < _w; j++) {
          this.tab[i][j] = 0;
          let box = document.createElement("div");
          box.classList.add("box");
          box.dataset.idx = i;
          box.dataset.idy = j;
          box.dataset.idp = `${i< 10 ? "0"+i : i}${j< 10 ? "0"+j : j}`;
          boxes.appendChild(box);
        }
      }
      this.drawMines();
      this.drawHints();
      return tempBoxes;
    };
    this.drawMines = () => {
      for (let i = 0; i < _mines; i++) {
        const drawx = Math.floor(Math.random() * _h);
        const drawy = Math.floor(Math.random() * _w);
        if (this.tab[drawx][drawy] == 0) this.tab[drawx][drawy] = "*";
        else i--;
      }
    };
    this.drawHints = () => {
      let minX = 0,
        maxX = _h - 1,
        minY = 0,
        maxY = _w - 1;
      for (let i = 0; i < _h; i++) {
        for (let j = 0; j < _w; j++) {
          if (this.tab[i][j] === "*") {
            let x = i,
              y = j;
            //sprawdzenie czy lewy róg
            const startX = parseInt(`${x <= minX ? x : x - 1}`);
            //sprawdzenie czy prawy róg
            const stopX = parseInt(`${x >= maxX ? x : x + 1}`);
            //sprawdzenie czy dolny róg
            const startY = parseInt(`${y <= minY ? y : y - 1}`);
            //sprawdzenie czy górny róg
            const stopY = parseInt(`${y >= maxY ? y : y + 1}`);
            //sprawdzenie do okoła
            for (let k = startX; k <= stopX; k++) {
              for (let l = startY; l <= stopY; l++) {
                if (!(k == x && l == y) & this.tab[k][l] !== "*") this.tab[k][l]++;
              }
            }
          }
        }
      }
    };
    this.appendBoard = (boxes, board, ) => {
      board.style.width = `${_w*35}px`;
      board.style.height = `${_h*35}px`;
      boxes.appendChild(this.makeBoard());
      return true;
    }
  }
  getTable() {
    return this.tab;
  }
  getMines(tab, max1, max2, x, y, win) {
    const table = tab;
    let minX = 0,
      maxX = max2 - 1,
      minY = 0,
      maxY = max1 - 1;
    minX = parseInt(minX);
    maxX = parseInt(maxX);
    minY = parseInt(minY);
    maxY = parseInt(maxY);
    for (let k = minX; k <= maxX; k++) {
      for (let l = minY; l <= maxY; l++) {
        const squareColor = document.querySelector(`[data-idp="${k< 10 ? "0"+k : k}${l< 10 ? "0"+l : l}"]`);
        if (table[k][l] == "*" & (squareColor.dataset.idp != `${x< 10 ? "0"+x : x}${y< 10 ? "0"+y : y}`)) {
          squareColor.innerHTML = "";
          squareColor.style.transition = ".5s ease-in-out";
          squareColor.style.transform = "rotate(180deg)";
          if (win == "Wygrana!") {
            squareColor.style.background = 'url("img/winmine.png")';
          } else {
            squareColor.style.background = 'url("img/mine.png")';
          }
          squareColor.style.color = "black";
        }
      }
    }
  }
}
class checkClick {
  checkTab(tab, x, y, maxX, maxY, end, game) {
    const gameClass = game;
    const choice = tab[x][y];
    const square = document.querySelector(`[data-idp="${x< 10 ? "0"+x : x}${y< 10 ? "0"+y : y}"]`);
    const endClass = end;

    function chwin() {
      square.classList.add("open");
      const win = endClass.checkWin();
      if (win) game.end("Wygrana!");
    }
    if (choice == "*") {
      square.style.color = "black";
      square.style.transition = ".7s ease-in-out";
      square.style.background = 'url("img/minered.png")';
      return [x, y];
    } else if (choice == 0 && !square.hasChildNodes()) {
      chwin();
      this.saveSpace(tab, x, y, maxX, maxY, endClass, gameClass);
      this.doColor(choice, square);
      return false;
    } else {
      chwin();
      this.doColor(choice, square);
    }
  }
  saveSpace(tab, x, y, max1, max2, end, game) {
    const gameClass = game;
    const table = tab;
    const x2 = parseInt(x);
    const y2 = parseInt(y);
    const endClass = end;
    let minX = 0,
      maxX = max2 - 1,
      minY = 0,
      maxY = max1 - 1;
    minX = parseInt(minX);
    maxX = parseInt(maxX);
    minY = parseInt(minY);
    maxY = parseInt(maxY);

    const startX = parseInt(`${x2 <= minX ? x2 : x2 - 1}`);
    //sprawdzenie czy prawy róg
    const stopX = parseInt(`${x2 >= maxX ? x2 : x2 + 1}`);
    //sprawdzenie czy dolny róg
    const startY = parseInt(`${y2 <= minY ? y2 : y2 - 1}`);
    //sprawdzenie czy górny róg
    const stopY = parseInt(`${y2 >= maxY ? y2 : y2 + 1}`);
    //sprawdzenie do okoła
    for (let k = startX; k <= stopX; k++) {
      for (let l = startY; l <= stopY; l++) {
        const squareColor = document.querySelector(`[data-idp="${k< 10 ? "0"+k : k}${l< 10 ? "0"+l : l}"]`);

        function chwin() {
          squareColor.classList.add("open");
          const win = endClass.checkWin();
          if (win) {
            gameClass.end("Wygrana!");
            return 0;
          } else {
            return 1;
          }
        }
        if (table[k][l] == "0" && !squareColor.hasChildNodes()) {
          this.doColor(table[k][l], squareColor);
          table[k][l] = "9";
          squareColor.dataset.show = "true";
          if (!chwin()) break;
          this.saveSpace(table, k, l, max1, max2, endClass, gameClass);
        } else if (table[k][l] == "*" || squareColor.hasChildNodes()) {

        } else {
          this.doColor(table[k][l], squareColor);
          if (!chwin()) break;
        }
      }
    }
  };
  doColor(choice, square) {
    if (choice !== 0 && choice !== "9") square.textContent = choice;
    if (choice == "1") square.style.color = "#00FF26";
    else if (choice == "2") square.style.color = "#0062FF";
    else if (choice == "3") square.style.color = "#FF9914";
    else if (choice == "4") square.style.color = "red";
    else if (choice == "5") square.style.color = "maroon";
    else if (choice == "6") square.style.color = "fuchsia";
    else if (choice == "7") square.style.color = "purple";
    else if (choice == "8") square.style.color = "black";
    else square.style.color = "gray";
    square.style.backgroundColor = "#060212";
  }
  markField(tab, x, y, stat) {
    const flagElement = document.querySelector(`[data-idp="${x< 10 ? "0"+x : x}${y< 10 ? "0"+y : y}"]`);
    const statMin = stat;
    if (!flagElement.hasChildNodes()) {
      if (flagElement.hasAttribute("data-show")) {} else {
        const img = document.createElement("img");
        img.setAttribute("src", "img/mark.png");
        img.style.pointerEvents = "none";
        img.dataset.mark = "flag";
        flagElement.appendChild(img);
        statMin.updateStats("-");
      }
    } else {
      if (flagElement.firstChild.nodeType === Node.ELEMENT_NODE) {
        if (flagElement.firstElementChild.dataset.mark == "flag") {
          flagElement.firstElementChild.dataset.mark = "question";
          flagElement.firstElementChild.setAttribute("src", "img/question.png");
        } else if (flagElement.firstElementChild.dataset.mark == "question") {
          flagElement.firstElementChild.remove();
          statMin.updateStats("+");
        } else {

        }
      } else {

      }
    }
  }
  openAround(tab, x, y, max1, max2, end, game) {
    const gameClass = game;
    const table = tab;
    const x2 = parseInt(x);
    const y2 = parseInt(y);
    const endClass2 = end;
    let minX = 0,
      maxX = max2 - 1,
      minY = 0,
      maxY = max1 - 1;
    minX = parseInt(minX);
    maxX = parseInt(maxX);
    minY = parseInt(minY);
    maxY = parseInt(maxY);

    const startX = parseInt(`${x2 <= minX ? x2 : x2 - 1}`);
    //sprawdzenie czy prawy róg
    const stopX = parseInt(`${x2 >= maxX ? x2 : x2 + 1}`);
    //sprawdzenie czy dolny róg
    const startY = parseInt(`${y2 <= minY ? y2 : y2 - 1}`);
    //sprawdzenie czy górny róg
    const stopY = parseInt(`${y2 >= maxY ? y2 : y2 + 1}`);
    //sprawdzenie do okoła
    let sumMARK = 0;
    const clickElem = document.querySelector(`[data-idp="${x< 10 ? "0"+x : x}${y< 10 ? "0"+y : y}"]`);

    for (let k = startX; k <= stopX; k++) {
      for (let l = startY; l <= stopY; l++) {
        const elemchk = document.querySelector(`[data-idp="${k< 10 ? "0"+k : k}${l< 10 ? "0"+l : l}"]`);
        if (elemchk.hasChildNodes()) {
          if (elemchk.firstChild.nodeType === Node.ELEMENT_NODE) {
            sumMARK++;
          }
        }
      }
    }
    if (parseInt(clickElem.textContent) == sumMARK) {
      for (let k = startX; k <= stopX; k++) {
        for (let l = startY; l <= stopY; l++) {
          const squareColor = document.querySelector(`[data-idp="${k< 10 ? "0"+k : k}${l< 10 ? "0"+l : l}"]`);
          const leftSpaces = endClass2.getLeft();

          function chwin() {
            squareColor.classList.add("open");
            const Dwin = endClass2.checkWin();
            if (Dwin) {
              gameClass.end("Wygrana!");
              return 0;
            } else {
              return 1;
            }
          }
          if (table[k][l] == "0" && !squareColor.hasChildNodes()) {
            this.doColor(table[k][l], squareColor);
            table[k][l] = "9";
            squareColor.dataset.show = "true";
            if (!chwin()) break;
            this.saveSpace(table, k, l, max1, max2, endClass2, gameClass);
          } else if (table[k][l] == "*" && !squareColor.hasChildNodes()) {
            if (leftSpaces > 1) {
              gameClass.end("Koniec gry :/", k, l);
            }
          } else if (table[k][l] == "*" && squareColor.hasChildNodes()) {

          } else {
            this.doColor(table[k][l], squareColor);
            if (!chwin()) break;
          }
        }
      }
    } else {
      let spacesAnim = [];
      for (let k = startX; k <= stopX; k++) {
        for (let l = startY; l <= stopY; l++) {
          const squareColor = document.querySelector(`[data-idp="${k< 10 ? "0"+k : k}${l< 10 ? "0"+l : l}"]`);
          if (squareColor.classList.contains("open")) {

          } else {
            spacesAnim.push(squareColor);
          }
        }
      }
      spacesAnim.forEach((e) => {
        e.style.transition = ".4s ease-in-out transform"
        e.style.transform = "translate(1px,-20px)";
        e.style.border = "1px inset white";
        setTimeout(() => {
          e.style.transform = "translate(0,0)";
          e.style.border = "1px outset rgb(0, 0, 0)";
        }, 200);
      });
    }
  }
}
class checkEnd {
  constructor(free) {
    this.free = free
  }
  checkWin() {
    const opened = document.querySelectorAll(".open").length;
    if (this.free == opened) {
      return true;
    } else {
      return false;
    }
  }
  getLeft() {
    const opened = document.querySelectorAll(".open").length;
    return this.free - opened;
  }

}
class statisctics {
  constructor(m) {
    this.m = parseInt(m);
    this.c = 0;
  }
  addStats() {
    const bottom = `<div class="stats-item stat1">
    Poz. Miny: <span class="mines">${this.m}</>
    </div>
    <div class="timer">0.00s</div>
    <div class="stats-item stat2">Kliknięcia: <span class="clicks">${this.c}</span></div>
    `;
    const bottomElement = document.createElement("div");
    bottomElement.classList.add("stats");
    bottomElement.classList.add("c");
    bottomElement.innerHTML = bottom;
    document.querySelector(".main").appendChild(bottomElement);
  }
  updateStats(a) {
    if (a == "-") {
      this.m--;
    } else {
      this.m++;
    }
    document.querySelector(".mines").textContent = this.m;
  }
  updateClick() {
    this.c++;
    document.querySelector(".clicks").textContent = this.c;
  }
}
class Game {
  constructor(x, y, m) {
    this.board = document.querySelector(".board");
    this.boxes = document.querySelector(".boxes");
    this.checkClick = new checkClick();
    this.saperBoard = new Board(x, y, m, this.boxes, this.end, this.checkClick);
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.m = parseInt(m);
    this.statsClass = new statisctics(this.m);
    this.freeSpace = (this.x * this.y) - this.m;
    this.checkEnd = new checkEnd(this.freeSpace);
    this.s = 0;
    this.start();
    this.idT;

  }
  start() {
    const added = this.saperBoard.appendBoard(this.boxes, this.board);
    this.statsClass.addStats(this.m);
    const timer = document.querySelector(".timer");
    //czas
    let s = 0;
    let active = false;
    const update = () => {
      s++;
      timer.textContent = `${(s / 100).toFixed(2)}s`;
    }
    //koniec czas
    if (added) {
      this.boxesDivs = document.querySelectorAll(".box");
      this.boxesDivs.forEach((e) => {
        e.addEventListener("click", (e) => {
          this.statsClass.updateClick();
          const idx = e.target.dataset.idx;
          const idy = e.target.dataset.idy;
          if (!e.target.hasChildNodes()) {
            const loose = this.checkClick.checkTab(this.saperBoard.getTable(), idx, idy, this.x, this.y, this.checkEnd, this);
            if (loose) {
              this.end("Koniec gry :/", loose[0], loose[1]);
            } else {
              if (!active) {
                this.idI = setInterval(update, 10)
                active = !active;
              }
              e.target.classList.add("open");
              const win = this.checkEnd.checkWin();
              if (win) this.end("Wygrana!", NULL, NULL);
            }
          } else {
            this.checkClick.openAround(this.saperBoard.getTable(), idx, idy, this.x, this.y, this.checkEnd, this);
          }
        });
        e.addEventListener('contextmenu', (e) => {
          this.statsClass.updateClick();
          e.preventDefault();
          this.checkClick.markField(this.saperBoard.getTable(), e.target.dataset.idx, e.target.dataset.idy, this.statsClass);
          return false;
        }, false);
      });
    }
  }
  end(res, x, y) {
    clearInterval(this.idI);
    this.saperBoard.getMines(this.saperBoard.getTable(), this.x, this.y, x, y, res);
    const endGame = document.createElement("div");
    const resetButton = document.createElement("div");
    resetButton.classList.add("resetButton");
    resetButton.textContent = "Zagraj Ponownie";
    endGame.classList.add("end");
    endGame.textContent = res;
    endGame.appendChild(resetButton);
    this.boxes.style.pointerEvents = "none";
    this.board.appendChild(endGame);
    const resetButtonB = document.querySelectorAll(".resetButton");
    resetButtonB.forEach(element => {
      element.addEventListener("click", () => {
        this.reset();
      });
    });
  }
  reset() {
    this.boxes.innerHTML = "";
    this.board.style.width = "auto";
    this.board.style.height = "auto";
    document.querySelectorAll(".end").forEach(item => {
      item.remove();
    });
    this.boxes.style.pointerEvents = "auto";
    document.querySelector(".stats").remove();
    insert();
  }
}

function insert() {
  const main = document.querySelector(".main");
  const fragOptions = document.createDocumentFragment("div");
  const options = document.createElement("div");
  options.classList.add("options");
  const option = document.createElement("div");
  const option2 = document.createElement("div");
  const option3 = document.createElement("div");
  option.classList.add("option");
  option2.classList.add("option");
  option3.classList.add("option");
  option.dataset.idt = 0;
  option2.dataset.idt = 1;
  option3.dataset.idt = 2;
  option.textContent = "Łatwy";
  option2.textContent = "Średni";
  option3.textContent = "Trudny";
  options.appendChild(option);
  options.appendChild(option2);
  options.appendChild(option3);
  fragOptions.appendChild(options);
  main.appendChild(fragOptions);

  const alloption = document.querySelectorAll(".option");
  alloption.forEach((e) => {
    e.addEventListener("click", function () {
      if (this.dataset.idt == 0) {
        const game = new Game(8, 8, 10);
      } else if (this.dataset.idt == 1) {
        const game = new Game(16, 16, 40);
      } else if (this.dataset.idt == 2) {
        const game = new Game(30, 16, 99);
      } else {
        alert("BŁĄD NIEPRAWIDŁOWY POZIOM TRUDNOŚCI")
      }
      document.querySelector(".options").remove();
    });
  });

}
insert();