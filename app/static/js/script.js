const button = document.querySelector('#primary');
let previewImage = document.querySelector('.preview-image > img');
const imageInput = document.querySelector('.image-upload')
let preview = document.querySelector('.preview-image');
const save = document.querySelector('#save')
let open = document.querySelector('#open');
const effectName = document.getElementsByName("effect");
const effectButtons = document.querySelectorAll(".effect-label");
const effectInputs = document.querySelectorAll(".effect-input");
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.bg-chocolate > .nav-tabs');
const tabPanes = navbar.querySelectorAll('.nav-link');
const imageColumn = navbar.querySelector('#col-image');
const textCharacter = document.querySelector(".text-character");

let originImage = null;
let originImagebase64 = null;

sideNavHandler()
toggleAllEditAccordion('hide')
previewImage.addEventListener('load', function (e) {
    toggleAllEditAccordion('show')
    if (!originImage) {
        originImagebase64 = previewImage.src
        originImage = originImagebase64.split("base64,")[1]
    }
    toggleAllEffectAccordion()
    save.removeAttribute("disabled")



})

function toggleAllEditAccordion(toggleType) {
    const accordionEdit = document.querySelector('#edit')
    const cardHeaders = accordionEdit.querySelectorAll('.card')
    if (toggleType === 'hide') {
        cardHeaders.forEach((item) => (
            item.querySelector(".card-header").style.cursor = 'not-allowed',
            item.querySelector(".card-header").style.backgroundColor = 'lightgrey',
            item.querySelector(".card-header").removeAttribute("data-target")
        ))
    } else {
        cardHeaders.forEach((item) => {
            const cardHeader = item.querySelector(".card-header");
            const dataTarget = cardHeader.getAttribute('aria-controls');
            return (
                cardHeader.style.cursor = 'pointer',
                cardHeader.style.backgroundColor = 'white',
                cardHeader.setAttribute("data-target", `#${dataTarget}`)
            )

        })
    }
}

function toggleAllEffectAccordion() {
    effectButtons.forEach((item) => (
        item.removeAttribute("disabled"),
        item.classList.remove('disabled'),
        item.addEventListener('click', getRadioButton)

    ))
    effectInputs.forEach((item) => (
        item.removeAttribute("disabled"),
        item.classList.remove('disabled')
    ))
}

open.addEventListener('click', function(){
    imageInput.click();
})


imageInput.addEventListener('change', function(input){
    if(input.target.files && input.target.files[0]){
        const fileReader = new FileReader()
        fileReader.onload = function(e){
            previewImage.setAttribute('src', e.target.result)
            preview.style.display = 'flex'
            imageInput.style.display = 'none'

        }
        fileReader.readAsDataURL(input.target.files[0])
    }
})

function sideNavHandler() {
    tabPanes.forEach((item) => {
        item.addEventListener('click', function(){
            if (!item.id === 'text-tab') {
                textCharacter.style.display = 'none'
            }
        })
        
    })
    
}


save.addEventListener("click", function(){
    html2canvas(document.querySelector('.col-image')).then(function (canvas) {
        saveAs(canvas.toDataURL(), 'file-name.png');
    });
})

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}
