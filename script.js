

function setupSpinner(list) {
    const size = list.length;
    const rotation = Math.floor(360 / size);
    const spinner = document.getElementById('spinner');

      //Setup Spinner colours
    let bg = "conic-gradient( from -90deg";
    for(let i = 0; i < size; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        let slice =  100 / size;
        if(i != 0) 
            slice+= slice * i;
        //console.log(slice);
        bg+= ", #" + randomColor + " 0% " + slice + "%";

    }

    bg+= " )";
    spinner.style.background = bg;

    for(let i = 0; i < size; i++) {
        const value = list[i];
        let element = document.createElement('li');

    /* Styles */ 
    //element.style.position = "relative";

    
    /* Size & Rotation */
    let width = getComputedStyle(document.documentElement).getPropertyValue('--half-radius');
    let height = getComputedStyle(document.documentElement).getPropertyValue('--half-radius');



    //element.style.width = width;
    //element.style.height = height;
    let sliceOffset = Math.floor(180 / size);
    let currentRotation = ((rotation * i) * -1) - sliceOffset;

    element.style.transformOrigin = "center left";

    let transformStr = "translate(50%, 0%) rotate(" + currentRotation + "deg)";
    element.style.transform = transformStr;
    element.style.MozTransform = transformStr;


    element.style.zIndex = "100";


    /* Display */
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";



    /* Inner Element */
    let innerElement = document.createElement('div');
    innerElement.innerHTML = "" + value;

    element.appendChild(innerElement);

    spinner.appendChild(element);
    }

}

function setupWheel() {
    let list = ["1",
    "2", "3", "4","5", "6"];
    setupSpinner(list);
}


function determineWinner() {
    const ticker = document.getElementById('ticker');
    let tickerBox = ticker.getBoundingClientRect();


    let list = document.getElementById('spinner').getElementsByTagName('li');
    for(let i = 0; i < list.length; i++) {
        let elBox = list[i].getBoundingClientRect();

        if(
            tickerBox.x < elBox.x + elBox.width
            &&
            tickerBox.x + tickerBox.width > elBox.x
            &&
            tickerBox.y < elBox.y + elBox.height
            &&
            tickerBox.y + tickerBox.height > elBox.y
        )
        {
            return list[i].innerText;
        }

        
    }

}

function spinWheel() {
    const spinner = document.getElementById('spinner');
    spinner.style.animationPlayState = "paused";


    /*
    const spinnerValues = window.getComputedStyle(spinner, null);

    let transformValues = spinnerValues.getPropertyValue("transform");
    transformValues = transformValues.split('(')[1], 
    transformValues = transformValues.split(')')[0],
    transformValues = transformValues.split(',');
    let rotationValue = Math.round(Math.asin(transformValues[1]) * (180 / Math.PI));
    console.log(rotationValue); */
    let min = 10800;
    let max = 18000;

    let rotationValue = Math.ceil(Math.random() * ((max - min) + min + 1));
    rotationValue+= rotationValue;

    spinner.style.transform = "rotate(" + -rotationValue + "deg)";


    
    spinner.addEventListener("transitionend", () => {
        const winscreen = document.getElementById('winscreen');
        winscreen.style.zIndex = "200";
        winscreen.style.opacity = "100";

        let winner = determineWinner();
        
        const winnerElement = document.getElementById('winner');
        winnerElement.innerHTML = winner + " won!";
    });




}

function removeFromList() {

}

function exitWinScreen() {
    const winscreen = document.getElementById('winscreen');
    winscreen.style.zIndex = "-200";
    winscreen.style.opacity = "0";
}




setupWheel();