

function setupSpinner(list) {
    const size = list.length;
    const rotation = 360 / size;
    const spinner = document.getElementById('spinner');

      //Setup Spinner colours
    let conicRotation = rotation * -2;
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

    return spinner;
}

function setupWheelNodes(spinner, list) {
    const size = list.length;
    const rotation = 360 / size;
    let nodeRotations = [];
    for(let i = 0; i < size; i++) {
        const value = list[i];
        let element = document.createElement('li');

        /* Styles */ 

        /* Size & Rotation */
        let width = getComputedStyle(document.documentElement).getPropertyValue('--half-radius');
        let height = getComputedStyle(document.documentElement).getPropertyValue('--half-radius');

        let sliceOffset = Math.floor(180 / size);
        let currentRotation = ((rotation * i) * 1) + sliceOffset;

        nodeRotations.push(currentRotation);

        console.log(value + " " + currentRotation);

        element.style.transformOrigin = "center right";

        let xTranslate = (size % 2 == 0) ? "translate(50%, 0)" : "translate(-50%, 0)";
        let transformStr = xTranslate + " rotate(" + currentRotation + "deg)";
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
    return nodeRotations;
}

function determineWinner(rotationOffset, rotationList) {
    const sliceOffset = 360 / rotationList.length;
    const ticker = document.getElementById('ticker');
    let tickerBox = ticker.getBoundingClientRect();

    let winner = 1000;
    let winnerPos = 0;
    let compareValue = (360 - rotationOffset) + 180;
    if(compareValue > 360) {
        compareValue-= 360;
    }
    console.log(compareValue);
    for(let i = 0; i < rotationList.length; i++) { 
        let curr = Math.abs(rotationList[i] - compareValue);
        if(curr < winner)
        {
            console.log("curr:" + curr + " < " + winner);
            winner = curr;
            winnerPos = i;
        }     
    }

    const spinnerList = document.getElementById('spinner').getElementsByTagName('li');

    return spinnerList[winnerPos].innerText;

}

function spinWheel(list) {
    const spinner = document.getElementById('spinner');
    spinner.style.animationPlayState = "paused";

    let min = 2600;
    let max = 5000;

    var rotationValue = Math.ceil(Math.random() * 360 + Math.random() * ((max - min) + min + 1));
    rotationValue+= rotationValue;

    spinner.style.transform = "rotate(" + rotationValue + "deg)";
    
    spinner.addEventListener("transitionend", () => {
        const winscreen = document.getElementById('winscreen');
        winscreen.style.zIndex = "200";
        winscreen.style.opacity = "100";

        let winner = determineWinner(rotationValue % 360, list);
        
        const winnerElement = document.getElementById('winner');
        winnerElement.innerHTML = winner + " won!";
    });




}

function setupWheel() {
    let list = ["1",
    "2", "3", "4","5", "6", "7","8","9","10","11"];
    const spinner = setupSpinner(list);
    const nodeRotations = setupWheelNodes(spinner, list);

    const spinButton = document.getElementById('spin');
    spinButton.addEventListener("click", function() {
        spinWheel(nodeRotations);
    });

    /*

    let list2 = document.getElementById('spinner').getElementsByTagName('li');
    for(let i = 0; i < list2.length; i++) {
        let curr = list2[i];
        let transformValues = window.getComputedStyle(curr, null).getPropertyValue("transform");
        transformValues = transformValues.split('(')[1], 
        transformValues = transformValues.split(')')[0],
        transformValues = transformValues.split(',');

        let rotationValue = Math.round(Math.asin(transformValues[1]) * (180 / Math.PI));
        console.log(curr.innerText + " " + (rotationValue));
    } */


}

function exitWinScreen() {
    const winscreen = document.getElementById('winscreen');
    winscreen.style.zIndex = "-200";
    winscreen.style.opacity = "0";
}




setupWheel();