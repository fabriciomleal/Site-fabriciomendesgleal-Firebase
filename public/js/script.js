class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
        ]
    }

    //metodo para iniciar a validacao de todos os campos
    validate(form) {

    //resgata todas as validacoes
    let currentValidations = document.querySelectorAll('form .error-validation');

    if(currentValidations.length > 0) {
        this.cleanValidations(currentValidations);
    }

    //pegar os inputs
    let inputs = form.getElementsByTagName('input');

    //HTMLCollection -> array
    let inputsArray = [...inputs];

    //loop nos inputs e validacao mediante ao que for encontrado
    inputsArray.forEach(function (input) {

        //loop em todas as validacoes existentes
        for (let i = 0; this.validations.length > i; i++) {
            if(input.getAttribute(this.validations[i]) != null) {

                //limpando a string para virar um metodo
                let method = this.validations[i].replace('data-', '').replace('-', '');

                //valor do input
                let value = input.getAttribute(this.validations[i])

                //invocar o metodo
                this[method](input, value);

            }
        }    
    }, this);

    }

    //verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {
    
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    //verifica se um input passou do limite de caracteres
    maxlength(input, maxValue) {
    
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida emails
    emailvalidate(input) {
        //pattern de validacao de email
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um email válido`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    //valida se o campo tem apenas letras
    onlyletters(input) {
    
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo é igual ao outro
    equal(input, inputName) {
        
            let inputToCompare = document.getElementsByName(inputName)[0];
    
            let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
    
            if(input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }

    }
    //metodo para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        //verifica a quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');


        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //verifica se o input é requerido
    required(input) {
    
     let inputValue = input.value;

     if(inputValue === '') {
         let errorMessage = `Este campo é obrigatório`;

         this.printMessage(input, errorMessage);
     }
    
    }

    //remove todas as validacoes para fazer a checagem novamente
    cleanValidations(validations) {

        validations.forEach(el => el.remove());

    }

}

let forms = document.getElementById('sistema-login');
let submit = document.getElementById('btn-submit');


let validator = new Validator();

//evento que dispara as validacoes
submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(forms);

});

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    names: () => document.getElementById('name'),
}

function cadastrar() {

    firebase.auth().createUserWithEmailAndPassword(form.email().value, form.password().value).then(function () {
        alert('Bem-vindo ' + form.names().value);
        window.location.href = "index.html";
    }).catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert(error.message);
    });
}
