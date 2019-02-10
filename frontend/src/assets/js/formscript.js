var inputs = document.querySelectorAll('input[type="text"], input[type="datepicker"], input[type="file"], input[type="textarea"], input[type="password"], input[type="email"], input[type="number"]');
infoTooltip = document.querySelectorAll('.info-tooltip'), body = document.querySelector('body');

//Inputs underline animation
if (inputs) {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].previousElementSibling.classList.add('floating-label');
        inputs[i].addEventListener('focusin', function () {
            this.previousElementSibling.classList.add('label-active');
        })
        inputs[i].addEventListener('focusout', function () {
            if (!(this.value == '')) {
                this.classList.add('input-active');
            }
            else if (this.value == '') {
                this.classList.remove('input-active');
                this.previousElementSibling.classList.remove('label-active');
            }
            else {
                this.previousElementSibling.classList.remove('label-active');
            }
        })
    }
}

//Required inputs
if (inputs) {
    for (var m = 0; m < inputs.length; m++) {
        if (inputs[m].hasAttribute('required')) {
            inputs[m].previousElementSibling.classList.add('label-required');
        }
    }
}

function sample(){
    console.log(1);
    alert("hi");
}