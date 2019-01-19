/* 
    Modified Code from - https://ml5js.org/ (DevTools - find sketch.js and style.css)
    Video help - https://youtu.be/yNkAuWz5lnY
    All Images are from wikipedia
    Image Classification with ml5 Drag and Drop
    Date: Dec/28/2018
*/ 
const log = console.log;
const image = document.getElementById("image");
const dropContainer = document.getElementById("container");
const fileInput = document.getElementById("fileUploader");
const ImageSrc = "images/penguin.jpg"; //default image

const result = document.getElementById("result");
const probability = document.getElementById("probability");
const classifier = ml5.imageClassifier("Mobilenet", () => {});

["dragenter", "dragover"].forEach(eventName => {
    dropContainer.addEventListener(eventName, e => dropContainer.classList.add("highlight"))
});

["dragleave", "drop"].forEach(eventName => {
    dropContainer.addEventListener(eventName, e => dropContainer.classList.remove("highlight"))
});

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropContainer.addEventListener(eventName, preventDefaults)
});

dropContainer.addEventListener("drop", gotImage);

classifyImage();

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
};

function gotImage(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 1) {
        alert("Upload only one file");
    };

    const file = files[0];
    const imageType = /image.*/;
    if (file.type.match(imageType)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            image.src = reader.result;
            setTimeout(classifyImage, 100);
        };
    } 
};

function classifyImage() {
    classifier.predict(image, (err, results) => {
        if (err) {
            alert("Something went wrong");
        } else {
            let resultTxt = results[0].className;
            result.innerText = resultTxt;
            let prob = 100 * results[0].probability;
            probability.innerText = Number.parseFloat(prob).toFixed(2) + "%";
        };
    });
};

function handleFiles() {
    const curFiles = fileInput.files;
    if (curFiles.length === 0) {
        image.src = ImageSrc;
        setTimeout(classifyImage, 100);
    }; 
};

function clickUploader() {
    fileInput.click();
};