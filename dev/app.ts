// Ignore Typescript Errors because we don't have Teachable Machine Image type information - see readme!
declare let tmImage:any

class App {

    // the link to your model provided by Teachable Machine export panel
    private MODEL_FOLDER = "./model/"
    private model
    private webcam
    private labelDivs : HTMLElement[] = []
    private maxPredictions : number
    private startButton:HTMLElement

    constructor(){
        // start button
        this.startButton = document.querySelector("#start")! as HTMLElement
        this.startButton.addEventListener("click", () => this.init())
    }

    // Load the image model and setup the webcam
    async init() {
        this.startButton.remove()

        const modelURL = this.MODEL_FOLDER + "model.json"
        const metadataURL = this.MODEL_FOLDER + "metadata.json"

        // load the model and metadata
        this.model = await tmImage.load(modelURL, metadataURL)
        this.maxPredictions = this.model.getTotalClasses()

        // Convenience function to setup a webcam
        const flip = true // whether to flip the webcam
        this.webcam = new tmImage.Webcam(200, 200, flip) // width, height, flip
        await this.webcam.setup() // request access to the webcam
        await this.webcam.play()

        // append elements to the DOM
        document.getElementById("webcam-container")!.appendChild(this.webcam.canvas)
        const labelContainer = document.getElementById("label-container")! as HTMLElement
        for (let i = 0; i < this.maxPredictions; i++) {
            const div = document.createElement("div")
            this.labelDivs.push(div)
            labelContainer.appendChild(div)
        }

        // start the gameloop
        this.gameLoop()
    }

    // gameloop 60fps
    async gameLoop() {
        this.webcam.update()
        await this.predict()
        window.requestAnimationFrame(() => this.gameLoop())
    }

    // run the webcam image through the image model
    async predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await this.model.predict(this.webcam.canvas)
        for (let i = 0; i < this.maxPredictions; i++) {
            const classPrediction = prediction[i].className + " : " + prediction[i].probability.toFixed(2)
            this.labelDivs[i].innerHTML = classPrediction
        }
    }

}

new App()