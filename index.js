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
    const commitButton = newForm.querySelector('.submit-button');
    commitButton.onclick = (event) => {
            event.preventDefault();
            showModal();
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

function showModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = "block";
    const modal = document.querySelector('.modal');
    modal.style.display = "block";


    const modalCloseButton = modal.querySelector('.close-button');
    modalCloseButton.onclick = (event) => {
        overlay.style.display = "none";
        modal.style.display = "none";
    }
}

const commitButtons = document.getElementsByClassName('submit-button');
for (const button of commitButtons) {
    button.onclick = (event) => {
        event.preventDefault();
        showModal();
    }
}
