function createFloatingText(text, appendToSelector) {
  const id = Math.random().toString(36).substr(2, 9);
  
  const elem = $(`<p id="${id}" class="floatingtext">${text}</p>`)
  
  elem.appendTo(appendToSelector);

  const skew = elem.position().left + Math.floor(Math.random() * 60 - 30);

  $(`#${id}`).animate({top: (25 + (0.4 * skew)), opacity: 0, left: skew}, 2000, "linear",
    function() {
      $(this).remove();
    }
  );
}

class Game {
  constructor() {
    this.tick = 100;

    this.upgrades = {
      carrots: [10, 0.06, 0],
      bunnies: [69, 0.69, 0],
      hellbunny: [666, 6.9, 0],
      next: [6969, 0, 0],
    }

    this.love = 0;
    this.lps = 0;

    this.refreshCosts();

    for (const key in this.upgrades) {
      $(`#${key}`).on('click', () => this.tryBuy(key));
    }
  }

  refreshCosts() {
    for (const key in this.upgrades) {
      $(`#${key}-cost`).html(this.upgrades[key][0]);
      $(`#${key}-benefit`).html(this.upgrades[key][1]);
      $(`#${key}-amount`).html(this.upgrades[key][2]);
    }
  }

  tryBuy(item) {
    if (item === 'next') {
      return game.nextQuestion();
    }
    
    if (this.love >= this.upgrades[item][0]) {
      this.love -= this.upgrades[item][0];
      this.lps += this.upgrades[item][1];
      this.upgrades[item][0] = Math.floor(1.05 * this.upgrades[item][0]) + 1;
      this.upgrades[item][2]++;

      this.refreshCosts();
    }
  }

  doTick() {
    const newCount = this.love + (this.lps * (this.tick / 1000));

    let oldFloor = Math.floor(this.love);
    const newFloor = Math.floor(newCount);

    while (oldFloor < newFloor) {
      oldFloor++;
      this.clickBunny();
    }

    this.love = newCount;
    this.gameLoop();
  }

  gameLoop() {
    $("#love").html(Math.floor(this.love));
    $("#lps").html(this.lps.toFixed(2));
  }

  clickBunny(mouseClick = 'false') {
    if (!this.love && !this.lps && mouseClick) {
      this.loop = setInterval(() => this.doTick(), this.tick);
    } 

    createFloatingText('❤️', '#bunny');
    if (mouseClick) {
      this.love += 1 + Math.floor(this.upgrades.carrots[2] / 10);
      this.gameLoop();
    }
  }

  nextQuestion() {
    if (this.love > this.upgrades.next[0]) {
      clearTimeout(this.loop);
      next();
    }
  }
}

const game = new Game();

$('#bunny').on('click', () => game.clickBunny(true));