
const form = document.querySelector("form");
console.log(document.querySelectorAll("form input"))

form.onsubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("form input");
    let isValid = true;
    console.log(inputs)
    inputs.forEach(input => {
        if(input.value === "") {
            input.parentElement.innerHTML += `<p class = "text-danger">Please Fill This Field</p>`
            isValid = false;
        }
    })

    if(!isValid) {
        return;
    }
}