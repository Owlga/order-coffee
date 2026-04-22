let totalOrderCount = 1;
let currentOrderCount = 1;

function closeOrder(closeButton) {
    console.log(currentOrderCount);
    if (currentOrderCount !== 1) {
        currentOrderCount -= 1;
        const fieldSet = closeButton.parentElement;
        if (fieldSet) {
            const formToRemove = fieldSet.parentElement;
            formToRemove.remove();

        }
    }
}

function addOrder() {
    const form = document.querySelector('form');
    const newForm = form.cloneNode(true);
    const currentH = newForm.querySelector('h4');
    totalOrderCount += 1;
    currentOrderCount += 1;
    currentH.textContent = `Напиток №${totalOrderCount}`;

    const newButton = newForm.querySelector('.add-button');
    newButton.onclick = addOrder;

    const closeButton = newForm.querySelector('.close-button');
    closeButton.onclick = (event) => {
        closeOrder(closeButton);
    }

    document.body.appendChild(newForm);
}
const button = document.body.querySelector('.add-button');
button.onclick = addOrder;

const closeButtons = document.getElementsByClassName('close-button');
for (const button of closeButtons) {
    button.onclick = (event) => {
        closeOrder(button);
    }
}
