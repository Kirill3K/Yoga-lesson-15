function form() {
    let message = { 
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        secondForm = document.getElementById('form'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
    
    let sendForm = (mainForm) => {
        mainForm.addEventListener('submit', function(event) {
            let input = this.getElementsByTagName('input');
            event.preventDefault();
            mainForm.appendChild(statusMessage);

            let formData = new FormData(mainForm);

			let postData = (data) => {

				return new Promise(function(resolve, reject) {
					let request = new XMLHttpRequest();

					request.open('POST', 'server.php');

					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					let obj = {};  
					data.forEach((value, key) => {
						obj[key] = value;
					});

					let sendData = JSON.stringify(obj);

					request.onreadystatechange = function() {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4 && request.status == 200) {
							resolve();
						} else {
							reject();
						}
					}

					request.send(sendData);
				});

            } // Конец postData
            
            let clearInput = () => {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
            }
        }
            postData(formData)
            .then(()=> {statusMessage.innerHTML = message.loading;
            })
            .then(()=> {
                statusMessage.innerHTML = message.success;
            })
            .catch(()=> statusMessage.innerHTML = message.failure)
            .then(clearInput);

        });
    }
    sendForm(form);
    sendForm(secondForm);

    let validationPhone = document.querySelectorAll('input[type=tel]');

    validationPhone.forEach((item) => {
        item.addEventListener('input', function() {
            if (!(/^\+?[()\d -]*$/.test(this.value))) {
                this.value = this.value.slice(0, -1);
            }
        });
    });
}

module.exports = form;