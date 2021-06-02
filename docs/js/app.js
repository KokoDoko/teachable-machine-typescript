"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class App {
    constructor() {
        this.MODEL_FOLDER = "./model/";
        this.labelDivs = [];
        this.startButton = document.querySelector("#start");
        this.startButton.addEventListener("click", () => this.init());
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startButton.remove();
            const modelURL = this.MODEL_FOLDER + "model.json";
            const metadataURL = this.MODEL_FOLDER + "metadata.json";
            this.model = yield tmImage.load(modelURL, metadataURL);
            this.maxPredictions = this.model.getTotalClasses();
            const flip = true;
            this.webcam = new tmImage.Webcam(200, 200, flip);
            yield this.webcam.setup();
            yield this.webcam.play();
            document.getElementById("webcam-container").appendChild(this.webcam.canvas);
            const labelContainer = document.getElementById("label-container");
            for (let i = 0; i < this.maxPredictions; i++) {
                const div = document.createElement("div");
                this.labelDivs.push(div);
                labelContainer.appendChild(div);
            }
            this.gameLoop();
        });
    }
    gameLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.webcam.update();
            yield this.predict();
            window.requestAnimationFrame(() => this.gameLoop());
        });
    }
    predict() {
        return __awaiter(this, void 0, void 0, function* () {
            const prediction = yield this.model.predict(this.webcam.canvas);
            for (let i = 0; i < this.maxPredictions; i++) {
                const classPrediction = prediction[i].className + " : " + prediction[i].probability.toFixed(2);
                this.labelDivs[i].innerHTML = classPrediction;
            }
        });
    }
}
new App();
//# sourceMappingURL=app.js.map