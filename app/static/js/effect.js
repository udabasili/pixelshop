

function getRadioButton(e) {
    const value = e.target.id;
    loader.style.display = 'block'
    let response = originImagebase64
    axios.post(`/effect/${value}`, {
            response,
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
}







