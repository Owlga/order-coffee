let totalOrderCount = 1;
let currentOrderCount = 1;

function addOrder() {
    const form = document.querySelector('form');
    const newForm = form.cloneNode(true);
    const currentH = newForm.querySelector('h4');
    totalOrderCount += 1;
    currentH.textContent = `Напиток №${totalOrderCount}`;
    const newButton = newForm.querySelector('.add-button');
    newButton.onclick = addOrder;
    document.body.appendChild(newForm);

}
const button = document.body.querySelector('.add-button');
button.onclick = addOrder;


