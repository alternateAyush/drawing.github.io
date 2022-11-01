var board = document.getElementById("board");
var jboard = $("#board");
var menu = document.getElementById("menu");
var jmenu = $("#menu");
var jpointer = $("#pointer");
var menuItems = document.getElementsByClassName("menu-items");
var r, g, b;
var flag = false;
var pencilColor;
// var pencilColor = "transparent";
var stroke = 8;

function buildBoard() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 254) + 1;
  // menuItems[0].style.color="red";
  var w = window.innerWidth;
  var h = window.innerHeight;
  var baseColor = `rgb(${r},${g},${b})`;
  jboard.css({
    height: `${h - 40}px`,
    width: `${w - 40}px`,
    borderColor: baseColor,
  });
  jmenu.css({
    height: `34px`,
    width: `${w - 50}px`,
    borderColor: baseColor,
  });
  jpointer.css({
    color: baseColor,
  });
  $("#demo").css({
    backgroundColor: baseColor,
    border: `1px solid ${baseColor}`,
  });
  pencilColor = baseColor;
}

function getMousePosition(event) {
  return {
    mouseX: event.x,
    mouseY: event.y,
  };
}

function draw(mouseX, mouseY) {
  var boardBound = board.getBoundingClientRect();
  if (
    mouseX < boardBound.right - 30 &&
    mouseX > boardBound.left+10 &&
    mouseY > boardBound.top + 41 &&
    mouseY < boardBound.bottom - 30
  ) {
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor = pencilColor;
    $("#demo").css("background-color", pencilColor);
    newDiv.style.height = `${stroke}px`;
    newDiv.style.width = `${stroke}px`;
    // newDiv.style.borderColor = `rgb(${r},${g},${b})`;
    (newDiv.style.top = `${mouseY - boardBound.y-10}px`),
      (newDiv.style.left = `${mouseX - boardBound.x-10}px`),
      newDiv.classList.add("draw-lines");
    board.append(newDiv);
  }
}

function getPosAndDraw(event) {
  var mouse = getMousePosition(event);
  draw(mouse.mouseX, mouse.mouseY);
}

function startDrawing(event) {
  var boardY = board.getBoundingClientRect().top + 31;
  flag = !flag;
  if (flag) {
    if (event.y > boardY) {
      document.addEventListener("mousemove", getPosAndDraw);
    } else {
      flag = !flag;
    }
    // endDrawing = setInterval(getMousePosition,10);
  } else {
    // clearInterval(endDrawing);
    document.removeEventListener("mousemove", getPosAndDraw);
  }
}

function handleMenu(event) {
  event.target.style.opacity = "1";
  setTimeout(() => {
    event.target.style.opacity = "0.8";
  }, 50);
  if (event.target == menuItems[0]) {
    pencilColor = "rgb(255,255,255)";
  } else if (event.target == menuItems[1]) {
    pencilColor = "rgb(0,0,0)";
  } else if (event.target == menuItems[2]) {
    if (stroke < 100) {
      stroke += 2;
    }
  } else if (event.target == menuItems[3]) {
    if (stroke > 2) {
      stroke -= 2;
    }
  } else if (event.target == menuItems[4]) {
    $(".draw-lines").remove();
  }
}

function pointerMove(event) {
  var mouse = getMousePosition(event);
  if (
    mouse.mouseX > 0 &&
    mouse.mouseY > 20 &&
    mouse.mouseY < window.innerHeight &&
    mouse.mouseX < window.innerWidth - 30
  ) {
    jpointer.css({
      top: `${mouse.mouseY - 20}px`,
      left: `${mouse.mouseX + 10}px`,
    });
  }
}

buildBoard();
board.addEventListener("click", startDrawing);
document.addEventListener("mousemove", pointerMove);
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", handleMenu);
}
$("#demo").on("click", buildBoard);
// document.addEventListener("mousemove", getMousePosition);

//------------------------------------------------------------------
var red = $("#r-value");
var green = $("#g-value");
var blue = $("#b-value");

function getColor()
{
  var rVal=0,gVal=0,bVal=0;
  if(red.val())
  {
    rVal=red.val();
  }
  if(green.val())
  {
    gVal=green.val();
  }
  if(blue.val())
  {
    bVal=blue.val();
  }
  newColor = `rgb(${rVal},${gVal},${bVal})`;
  pencilColor=newColor;
  $("#demo").css('background-color',newColor);
}
$("#get-color").on('click',getColor);
