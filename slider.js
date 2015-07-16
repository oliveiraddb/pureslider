(function() {

var
items = [],
length = /*items.length*/4,
currentSlide = 0,
container = document.querySelector('#container'),
slider = document.createElement('div'),
wrapper = document.createElement('div'),
width = /*args.width || */getComputedStyle(container).width || "1000px",
height = "200px",
time = /*args.width || */3000,
interval = 0;
direction = /*args.direction || */"top",
sliding = false,
finishSliding = function(){
  sliding = false;
  slider.removeEventListener("transitionend", finishSliding, false);
},
stopSlider = function(){ clearInterval(interval); },
beginSlider = function(){ interval = setInterval(nextSlide, time); },
mostraSlide = function(slideNumber) {
  if(sliding) return;
  sliding = true;
  slider.addEventListener("transitionend", finishSliding, false);
  slider.style[direction] = slideNumber*-parseFloat(direction==="left"?width:height, 10)+"px";
},
nextSlide = function() {
  if(currentSlide === length-1) currentSlide = -1;
  if(!sliding) mostraSlide(++currentSlide);
},
previousSlide = function () {
  if(currentSlide === 0) currentSlide = length;
  if(!sliding) mostraSlide(--currentSlide);
},
commandButton = function (direction, size, color) {
  var
  button = document.createElement('div'),
  borders = ['borderLeft','borderRight', "borderBottom"],
  style = button.style;

  style.width = 0;
  style.height = 0;
  style.cursor = "pointer";
  style.margin = "auto";

  switch (direction) {
    case "up":
      borders = ['borderLeft','borderRight', "borderBottom"];
      break;
    case "down":
      borders = ['borderLeft','borderRight', "borderTop"];
      break;
    case "left":
      borders = ['borderTop','borderBottom', "borderRight"];
      break;
    case "right":
      borders = ['borderTop','borderBottom', "borderLeft"];
      break;
  }

  style[borders[0]] = size+" solid transparent";
  style[borders[1]] = size+" solid transparent";
  style[borders[2]] = size+" solid "+(color || "#000");

  return button;
},
previous = commandButton(direction==="left"?"left":"up","5px"),
next = commandButton(direction==="left"?"right":"down","5px");

wrapper.style.width = width;
wrapper.style.height = height;
wrapper.style.overflow = "hidden";
wrapper.style.margin="auto";

for(var i = 0; i < length; i++){
  items[i] = slider.appendChild(document.createElement("div"));
  items[i].style.width=width;
  items[i].style.height=height;
  items[i].style.float="left";
  items[i].style.display="inline";
}

wrapper.appendChild(slider);

items[0].style.backgroundColor = "green";
items[1].style.backgroundColor = "blue";
items[2].style.backgroundColor = "red";
items[3].style.backgroundColor = "yellow";

slider.style[direction] = "0px";
slider.style.position="relative";
slider.style.transition = "all 1s ease 0s";

if(direction === "left"){
  previous.style.float =
  wrapper.style.float =
  next.style.float = "left";

  slider.style.height = height;
  slider.style.width = parseFloat(width, 10)*length+"px";
} else {
  slider.style.width = width;
  slider.style.height = parseFloat(height, 10)*length+"px";
}

container.appendChild(previous);
container.appendChild(wrapper);
container.appendChild(next);

next.addEventListener("click", nextSlide);
previous.addEventListener("click", previousSlide);

beginSlider();
})();
