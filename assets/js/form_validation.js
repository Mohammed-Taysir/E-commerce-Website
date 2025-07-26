
export function formValidation(formSelector) {
    const loginForm = document.querySelector(formSelector);
    console.log(loginForm);

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        if (e.target.username.value.length === 0) {
            isValid = false;
            document.querySelector(`${formSelector} .error-message`).textContent = "Username is requiered";
            document.querySelector(`${formSelector} .error-message`).parentElement.classList.remove("d-none");
            return;
        }

        if (e.target.password.value.length === 0) {
            isValid = false;
            document.querySelector(`${formSelector} .error-message`).textContent = "Password is requiered";
            document.querySelector(`${formSelector} .error-message`).parentElement.classList.remove("d-none");
            return;
        }



    }
}