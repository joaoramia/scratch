//PIXI.js Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;

//Create a Pixi stage and renderer and add the renderer.view to the DOM
let stage = new Container(),
    renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, {transparent: true});
document.body.appendChild(renderer.view);

//Create a 2d html5 canvas for the masking (cardcovers)
let maskCanvas = document.createElement("canvas");
document.body.appendChild(maskCanvas);
let maskCtx = maskCanvas.getContext("2d");
maskCanvas.width = window.innerWidth;
maskCanvas.height = window.innerHeight;

//Padding between cards on the canvas
let padding = 20;

//Boolean checking if user clicked and dragged
let drawing = false;

//load an images and run the `setup` function when it's done
loader
  .add([
    "../assets/card.jpg",
    "../assets/scratch.png",
    "../assets/cover.png"
    ])
  .load(setup);

//Generate the cards on PIXI.js stage and their covers on the 2d html5 canvas
function setup(){
  generateCards();
}

//Get card sizes according to the window size. It checks device orientation by getting the comparison of the width and height. It assumes squared cards
function getCardSizes(){
    if (window.innerWidth > window.innerHeight){
        return (window.innerHeight - 3 * padding) / 3;
    }
    else {
        return (window.innerWidth - 3 * padding) / 3;
    }
}

//Generate cards on PIXI.js stage and their covers on the 2d html5 canvas, by creating a sprite per card. This could be random on the actual game. Here it assumes it is always a 3x3 matrix
function generateCards(){
    let size = getCardSizes();
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){

            let card = new Sprite(resources["../assets/card.jpg"].texture);
            card.width = size;
            card.height = size;
            card.x = padding * (i + 0.5) + size * i;
            card.y = padding * (j + 0.5) + size * j;
            stage.addChild(card);

            let coverImage = new Image();
            coverImage.src = "../assets/cover.png";
            maskCtx.drawImage(coverImage, padding * (i + 0.5) + size * i, padding * (j + 0.5) + size * j, size, size);
        }
    }
    renderer.render(stage);
}

//Scratch function, it sets the 2d html5 canvas globalCompositeOperation to destination-out so the images drawn on it will have the 'eraser' effect, showing the actual card underneath their covers
function scratch(x, y){
    let scratch = new Image();
    scratch.src = '../assets/scratch.png';

    maskCtx.globalCompositeOperation = "destination-out";
    maskCtx.drawImage(scratch, x - 15, y - 15, 40, 40);
}

//Mousemove event for the scratching mechanism
document.addEventListener("mousemove", (e) => scratch(e.x, e.y));
