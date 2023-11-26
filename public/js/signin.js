function logar(){
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        console.log("sucesso", response);
        window.location.href = "home/home.html";
    }).catch(error => {
        alert(error.message)
        console.log("erro", error);
    });
};

function resetar(){
    firebase.auth().sendPasswordResetEmail(form.email().value).then(function() {
        alert('E-mail de redefinição de senha enviado');
    }).catch(function(error) {
        alert(error.message);
    });
}

const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
} 