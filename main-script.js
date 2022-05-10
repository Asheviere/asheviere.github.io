let curScreen = 1;

function switchToScreen(screen) {
  $(`#screen${curScreen}`).fadeOut(300 * (curScreen / 1.3), () => {
    $(`#screen${screen}`).fadeIn(300 * (curScreen / 1.3));

    curScreen = screen;
  });
}

function prev() {
  switchToScreen(curScreen - 1);
}

function next() {
  switchToScreen(curScreen + 1);
}