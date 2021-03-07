const image = document.querySelector('.col-fluid');
const frameContainer = document.querySelector('#frame');
const frameButtons = frameContainer.querySelectorAll(".frame-button")

frameButtons.forEach((btn) =>{

    btn.addEventListener("click", function(e){
        const frame = btn.querySelector('.frame-sample').id
        previewImage.className = previewImage.className.replace(/\bfra.*?\b/g, '');
        previewImage.classList.add(frame)

    })
})