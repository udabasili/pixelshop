const cropAccordion = document.querySelector('#crop-accordion');
const rotateAccordion = document.querySelector('#rotate-accordion');
const collapseOne = document.querySelector('#collapseOne');
const applyCrop = document.querySelector('#apply-crop');
const applyRotate = document.querySelector('#apply-rotate');
const applyResize = document.querySelector('#apply-resize');
const reset = document.querySelector('#reset');
const editCloseButtons = document.querySelectorAll('#edit-close-button');
const flipHorizontal = document.querySelector('#flip-horizontal');
const flipVertical = document.querySelector('#flip-vertical');
const rotateRight = document.querySelector('#rotate-right');
const rotateLeft = document.querySelector('#rotate-left');
const brightnessInput = document.querySelector('#brightness-input');
let brightnessLabel = document.querySelector('#brightness-label').querySelector('.value');
const contrastInput = document.querySelector('#contrast-input');
let contrastLabel = document.querySelector('#contrast-label').querySelector('.value');
const sharpnessInput = document.querySelector('#sharpness-input');
let sharpnessLabel = document.querySelector('#sharpness-label').querySelector('.value');
const saturationInput = document.querySelector('#saturation-input');
const saturationLabel = document.querySelector('#saturation-label').querySelector('.value');
const height = document.querySelector('#height');
const width = document.querySelector('#width');
const show = collapseOne.classList.contains("show")
let cropper; 

$(document).click(function (event) {
    var $target = $(event.target);
    if (!$target.closest('.text-box').length &&
        $('.text-box').is(":visible")) {
        $('.resizers').hide();
    }
});


function closeButtonHandler(e) {
    const parent = e.target.parentNode.parentNode.parentNode.parentNode
    parent.classList.remove('show')
    cropper.destroy()

}

editCloseButtons.forEach((b) => (
    b.addEventListener('click', closeButtonHandler)

))

/**CROP */
cropAccordion.addEventListener('click', function (e) {
    if (!cropper || !cropper.ready){
        cropper = new Cropper(previewImage, {
            background: false,
            aspectRatio: 321 / 180,

        })
    }
    cropper.crop()

})




applyCrop.addEventListener('click', function (e) {
    loader.style.display = 'block'
    const result = cropper.getCroppedCanvas().toDataURL()
    collapseOne.classList.remove('show')
    previewImage.src = result;
    originImagebase64 = result;
    originImage = originImagebase64.split("base64,")[1]
    cropper.destroy()
    loader.style.display = 'none'


})


/*ROTATE ACCORDION */
rotateAccordion.addEventListener('click', function (e) {
    if (!cropper || !cropper.ready) {
        cropper = new Cropper(previewImage, {
            background: false,
            aspectRatio: 321 / 180,
            ready() {
                this.cropper.clear()
            }
        })
    }




})

rotateRight.addEventListener('click', function (e) {
    cropper.rotate(90)

})

rotateLeft.addEventListener('click', function (e) {
    cropper.rotate(-90)

})

flipHorizontal.addEventListener('click', function (e) {
    cropper.scaleX(-1)

})

flipVertical.addEventListener('click', function (e) {
    cropper.scaleY(-1)

})


applyRotate.addEventListener('click', function (e) {
    loader.style.display = 'block'
    const result = cropper.getCroppedCanvas().toDataURL()
    previewImage.src = result;
    originImagebase64 = result;
    originImage = originImagebase64.split("base64,")[1]
    const parent = e.target.parentNode.parentNode.parentNode.parentNode
    parent.classList.remove('show')
    cropper.destroy()
    loader.style.display = 'none'

})


/**RESIZE ACCORDION */
applyResize.addEventListener('click', function (e) {
    loader.style.display = 'block'
    let heightValue = height.value
    let widthValue = width.value
    let measurement = {
        widthValue,
        heightValue
    }
    const value = e.target.value;
    contrastLabel.innerHTML = value
    let response = originImagebase64
    axios.post('/resize', {
            response,
            measurement
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const image = res.data.res;
            let result = image.split('\'')[1]
            previewImage.style.width = widthValue + 'px'
            previewImage.style.height = heightValue + 'px'
            previewImage.setAttribute("src", "data:image/png;base64," + result)
            loader.style.display = 'none'

        })
        .catch(err => console.error(err))
})


/**OTHERS */
brightnessInput.addEventListener('change', function (e) {
    let response = originImage
    let contrast = Number(contrastLabel.innerHTML);
    let sharpness = Number(sharpnessLabel.innerHTML);
    let saturation = Number(saturationLabel.innerHTML);
    if(contrast || sharpness || saturation){
        response = previewImage.src
        response = response.split("base64,")[1]
    }
    loader.style.display = 'block'
    const value = e.target.value;
    brightnessLabel.innerHTML = value
    let factorial= (Number(value) + 50) / 50
    axios.post('/others/brightness', {
            response,
            factorial
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const image = res.data.res;
            let result = image.split('\'')[1]
            previewImage.setAttribute("src", "data:image/png;base64," + result)
            loader.style.display = 'none'

        })
        .catch(err => console.error(err));
    
    
})

contrastInput.addEventListener('change', function (e) {
    let response = originImage
    let brightness = Number(brightnessLabel.innerHTML);
    let sharpness = Number(sharpnessLabel.innerHTML);
    let saturation = Number(saturationLabel.innerHTML);
    if (brightness || sharpness || saturation) {
        response = previewImage.src
        response = response.split("base64,")[1]
    }
    loader.style.display = 'block'
    const value = e.target.value;
    contrastLabel.innerHTML = value
    let factorial = (Number(value) + 50) / 50

    axios.post('/others/contrast', {
            response,
            factorial
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const image = res.data.res;
            let result = image.split('\'')[1]
            previewImage.setAttribute("src", "data:image/png;base64," + result)
            loader.style.display = 'none'

        })
        .catch(err => console.error(err));
})

sharpnessInput.addEventListener('change', function (e) {
    loader.style.display = 'block'
    const value = e.target.value;
    sharpnessLabel.innerHTML = value
    let factorial = (Number(value) + 50) / 50
    let response = originImage
    let contrast = Number(contrastLabel.innerHTML);
    let brightness = Number(brightnessLabel.innerHTML);
    let saturation = Number(saturationLabel.innerHTML);
    if (contrast || brightness || saturation) {
        response = previewImage.src
        response = response.split("base64,")[1]
    }

    axios.post('/others/sharpness', {
            response,
            factorial
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const image = res.data.res;
            let result = image.split('\'')[1]
            previewImage.setAttribute("src", "data:image/png;base64," + result)
            loader.style.display = 'none'

        })
        .catch(err => console.error(err));
})

saturationInput.addEventListener('change', function (e) {
    loader.style.display = 'block'
    const value = e.target.value;
    saturationLabel.innerHTML = value
    let response = originImage
    let contrast = Number(contrastLabel.innerHTML);
    let brightness = Number(brightnessLabel.innerHTML);
    let sharpness = Number(sharpnessLabel.innerHTML);
    if (contrast || brightness || sharpness) {
        response = previewImage.src
        response = response.split("base64,")[1]
    }
    let factorial = (Number(value) + 50) / 50

    axios.post('/color/saturation', {
            response,
            factorial
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            const image = res.data.res;
            let result = image.split('\'')[1]
            previewImage.setAttribute("src", "data:image/png;base64," + result)
            loader.style.display = 'none'

        })
        .catch(err => console.error(err));
})



reset.addEventListener('click', function (params) {
    
    brightnessLabel.innerHTML = 0;
    sharpnessLabel.innerHTML = 0;
    saturationLabel.innerHTML = 0;
    contrastLabel.innerHTML = 0;
    brightnessInput.value = 0;
    saturationInput.value = 0;
    sharpnessInput.value = 0;
    contrastInput.value = 0;
    previewImage.setAttribute("src", originImagebase64)

})