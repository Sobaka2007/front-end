document.addEventListener('DOMContentLoaded', function () {
    let textFields = document.querySelectorAll('textarea');
    let textField = textFields[0];
    let resultField = textFields[1];
    let button = document.querySelector('button');
    let switcher = document.querySelector('.switch');
    let intField = document.querySelector('input[type="number"]');
    let reverse = false
    let text = "";
    let input_key = 1
    const url = "http://127.0.0.1:5002/encrypt";
    let params = {

        input_text: text, input_key: input_key
    }



    switcher.addEventListener('click', function () {
        reverse = !reverse
        if (reverse) {
            intField.classList.add('reverse');
            textField.classList.add('reverse');
            resultField.classList.add('reverse');
            button.classList.add('reverse');
            button.textContent = "Decrypt"
        }
        else {
            intField.classList.remove('reverse');
            textField.classList.remove('reverse');
            resultField.classList.remove('reverse');
            button.classList.remove('reverse');
            button.textContent = "Encrypt"
        }z

    })


    textField.addEventListener('input', function () {

        text = textField.value;
        if (text) {
            button.disabled = false;
        }
        else {
            button.disabled = true;
        }




    })
    intField.addEventListener('change', function () {

        input_key = intField.value;
        if (intField.value <= 0) {
            intField.value = 1
            input_key = 1
        }

    })

    button.addEventListener('click', function () {
        button.disabled = true;
        if ( reverse ) {
            button.textContent = "Decrypting..."
            input_key = -input_key
        }
        else {
            button.textContent = "Encrypting..."
            input_key = Math.abs(input_key)
        }
        setTimeout(function () {
            params = {

                input_text: text, input_key: input_key

            }
            const queryString = new URLSearchParams(params).toString();
            const fullUrl = `${url}?${queryString}`
            fetch(fullUrl)
                .then(response => response.json())
                .then(data => {
                    button.disabled = false;
                    if ( reverse ) {
                        button.textContent = "Decrypt"
                    }
                    else {
                        button.textContent = "Encrypt"
                    }
                    resultField.value = data.encrypted_text
                })
                .catch(error => {

                    resultField.value = error
                })

        }, 1000)


    })
})

