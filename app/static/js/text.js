
const textBox = document.querySelector(".text-box");
const text = document.querySelector(".text");
const resizers = document.querySelectorAll(".resizer");
const resizer1 = document.querySelector(".resizer-1");
const resizer2 = document.querySelector(".resizer-2");
const resizer3 = document.querySelector(".resizer-3");
const resizer4 = document.querySelector(".resizer-4");
const fontSizes = document.querySelector(".font-sizes");
const buttonGroup = document.querySelector(".btn-group");
const fontColor = document.querySelector(".font-color");
const imageContainer = document.querySelector(".col-image");
const textContainer = document.querySelector("#text-edit");
//this gives the distance from the viewpoint to the left and top of the container

const topImageContainer = window.pageYOffset - imageContainer.getBoundingClientRect().top;
const leftImageContainer = window.pageXOffset - imageContainer.getBoundingClientRect().left;
const textCharactersLabel = buttonGroup.querySelectorAll('label')
const textButtons = textContainer.querySelectorAll('input')
const textCharactersValue = buttonGroup.querySelectorAll('input[type="checkbox"]')
const textTransform = document.querySelector('.btn-group.text-transform')
let dragged;

function handleAllResizable(){
    const min = 20;
    let startWidth = 0;
    let startHeight = 0;
    let startHorizontal = 0;
    let startVertical = 0;
    let mouseStartX = 0;
    let mouseStartY = 0;
     for (let i = 0; i < resizers.length; i++) {
         const currentResizer = resizers[i];
         /**Get the starting the top and left of rectangle, the starting width and the starting point of mouse */
         currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            startWidth = parseFloat(getComputedStyle(textBox).getPropertyValue('width').replace("px",""))
            startHeight = parseFloat(getComputedStyle(textBox).getPropertyValue('height').replace('px',''))
            startHorizontal = textBox.getBoundingClientRect().left;
            startVertical = textBox.getBoundingClientRect().top;
            mouseStartX = e.pageX;
            mouseStartY = e.pageY;
            window.addEventListener('mousemove', startResize)
            window.addEventListener('mouseup', stopResize)

        })
        /*Handle resizer elements moving from top clockwise */
        function startResize(e){
            if (currentResizer.classList.contains('resizer-1')) {
                /**
                 * When the mouse is moved to the left, its x position actually decreased therefor
                 if we move the mouse to the left, 
                 its x position always less than element’ s x position and they will produce a negative number
                 if we take current mouse postion minus start position.Thus,
                     if we subtract the element’ s 
                     old width with a negative number, meaning that the element width will increase and
                 if we drag the resizer to the right, the `mouseX`
                 will greater than the `elementX`
                 and
                 return a positive number
                 if we subtract `elementX`
                 from `mouseX`, therefore decline the element width.
                 */
                // the sign after the start width/ height indicated direction where right or down movement is increments
                
                const width =startWidth - (e.pageX - mouseStartX);
                const height = startHeight - (e.pageY - mouseStartY)
                if (width > min) {
                    textBox.style.width = width + 'px'
                    //add the previous left point to the current mouse point 
                    //subtract old mouse point, the leftimage since the conrdinate is relative to the image container not view point

                    textBox.style.left = startHorizontal + (
                        e.pageX - 
                        mouseStartX - 
                        //we are subtracting the center of the textbox due to the drag function below in the grad listener
                        (textBox.offsetWidth / 2) - 
                        leftImageContainer) + 'px' //since we are sizing relative the image container instead of window
                        //we have to componstate for the distance between the 
                }
                if (height > min) {
                    textBox.style.height = height + 'px';
                    textBox.style.top = startVertical + (
                        e.pageY - 
                        mouseStartY- 
                        (textBox.offsetHeight / 2) -
                        topImageContainer) + 'px'

                }
            } else if (currentResizer.classList.contains('resizer-2')){
                const width = startWidth + (e.pageX - mouseStartX);
                const height = startHeight - (e.pageY - mouseStartY)
                if (width > min) {
                    textBox.style.width = width + 'px'
                }
                if (height > min) {
                    textBox.style.height = height + 'px';
                    textBox.style.top = startVertical + (
                        e.pageY - 
                        mouseStartY - 
                        (textBox.offsetHeight / 2) -
                        topImageContainer) + 'px'

                }
            } else if (currentResizer.classList.contains('resizer-3')) {
                const height = startHeight + (e.pageY - mouseStartY);
                const width = startWidth - (e.pageX - mouseStartX)
                if (height > min) {
                    textBox.style.height = height + 'px'
                }

                if (width > min) {
                    textBox.style.width = width + 'px'
                    textBox.style.left = startHorizontal + (
                        e.pageX - 
                        mouseStartX -
                        (textBox.offsetWidth / 2) - 
                        leftImageContainer) + 'px'
                }

                
                
                
            } else{

                const width = startWidth + (e.pageX - mouseStartX);
                const height = startHeight + (e.pageY - mouseStartY)
                if (width > min) {
                    textBox.style.width = width + 'px'
                }
                if (height > min) {
                    textBox.style.height = height + 'px';

                }
            }
            
        }
         function stopResize() {
             window.removeEventListener('mousemove', startResize)
         }
     }

}




handleAllResizable()

imageContainer.addEventListener("dragover", function (event) {
    event.preventDefault();

}, false);

window.addEventListener('drop', function (event) {
    event.preventDefault()
    let left = (event.pageX) - (textBox.offsetWidth / 2) + 'px'
    let top = (event.pageY) - (textBox.offsetHeight / 2) + 'px'

    textBox.style.left = left 
    textBox.style.top = top
    


})

fontSizes.addEventListener('change', function(e){
    imageContainer.querySelector("#text").style.fontSize = (e.target.value) + "px";
})

fontColor.addEventListener('change', function (e) {
    imageContainer.querySelector("#text").style.color = e.target.value
})



textButtons.forEach((textButton) =>{
    return textButton.addEventListener("change", function(e){
        textCharacter.style.display = 'flex'
        textBox.style.display = 'flex'
        const children = textTransform.children
        text.style.fontFamily = e.target.value;
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            element.addEventListener("click", function(e){
                text.style.textTransform = e.target.id
            })            
        }
  


    })
})

textCharactersLabel.forEach((btn) => {
   
    btn.addEventListener('click', function (e) {        
        let input = btn.firstElementChild
        if(input.name === 'bold' ){
            imageContainer.querySelector("#text").style.fontWeight = !input.checked ? "bold" : 'normal';

        }
        if (input.name === 'italics') {
            imageContainer.querySelector("#text").style.fontStyle = !input.checked ? "italic" : 'normal';

        }
        if (input.name === 'underline') {
            imageContainer.querySelector("#text").style.textDecoration = !input.checked ? "underline" : 'none';

        }

    })
})

textCharactersLabel.forEach((btn) => {

    btn.addEventListener('click', function (e) {
        let input = btn.firstElementChild
        if (input.name === 'bold') {
            imageContainer.querySelector("#text").style.fontWeight = !input.checked ? "bold" : 'normal';

        }
        if (input.name === 'italics') {
            imageContainer.querySelector("#text").style.fontStyle = !input.checked ? "italic" : 'normal';

        }
        if (input.name === 'underline') {
            imageContainer.querySelector("#text").style.textDecoration = !input.checked ? "underline" : 'none';

        }

    })
})
