let totalOrderCount = 1;
let currentOrderCount = 1;

function createForm() {
    const form = document.createElement('form');
    form.innerHTML = `<fieldset class="beverage">
        <h4 class="beverage-count">Напиток №${totalOrderCount}</h4>
        <button type="button" class="close-button" id="closeButton">X</button>
        <label class="field">
          <span class="label-text">Я буду</span>
          <select>
            <option value="espresso">Эспрессо</option>
            <option value="capuccino" selected>Капучино</option>
            <option value="cacao">Какао</option>
          </select>
        </label>
        <div class="field">
          <span class="checkbox-label">Сделайте напиток на</span>
          <label class="checkbox-field">
            <input type="radio" name="milk" value="usual" checked />
            <span>обычном молоке</span>
          </label>
          <label class="checkbox-field">
            <input type="radio" name="milk" value="no-fat" />
            <span>обезжиренном молоке</span>
          </label>
          <label class="checkbox-field">
            <input type="radio" name="milk" value="soy" />
            <span>соевом молоке</span>
          </label>
          <label class="checkbox-field">
            <input type="radio" name="milk" value="coconut" />
            <span>кокосовом молоке</span>
          </label>
        </div>
        <div class="field">
          <span class="checkbox-label">Добавьте к напитку:</span>
          <label class="checkbox-field">
            <input type="checkbox" name="options" value="whipped cream" />
            <span>взбитых сливок</span>
          </label>
          <label class="checkbox-field">
            <input type="checkbox" name="options" value="marshmallow" />
            <span>зефирок</span>
          </label>
          <label class="checkbox-field">
            <input type="checkbox" name="options" value="chocolate" />
            <span>шоколад</span>
          </label>
          <label class="checkbox-field">
            <input type="checkbox" name="options" value="cinnamon" />
            <span>корицу</span>
          </label>
        </div>
      </fieldset>`;
    const closeButton = form.querySelector('.close-button');
    closeButton.onclick = (event) => {
        closeOrder(closeButton);
    }
    return form;
}

function addOrder() {
    totalOrderCount += 1;
    currentOrderCount += 1;

    const form = createForm();
    document.body.appendChild(form);
}
const button = document.body.querySelector('.add-button');
button.onclick = addOrder;
const closeButton = document.body.querySelector('.close-button');
closeButton.onclick = (event) => {
    closeOrder(closeButton);
}

function closeOrder(closeButton) {
    if (currentOrderCount !== 1) {
        currentOrderCount -= 1;
        const fieldSet = closeButton.parentElement;
        if (fieldSet) {
            fieldSet.remove();
        }
    }
}
function formatText(number) {
    if (number >= 10 && number <= 20) {
        return 'напитков';
    }
    if (number % 10 === 1) {
        return 'напиток';
    }
    if (number % 10 >= 2 && number % 10 <= 4) {
        return 'напитка';
    }

    return 'напитков';
}

function showModal() {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = "block";
    const modal = document.querySelector('.modal');
    modal.style.display = "block";

    const paragraph = modal.querySelector('p');
    paragraph.textContent = `Вы заказали ${currentOrderCount} ${formatText(currentOrderCount)}`;

    const modalCloseButton = modal.querySelector('.close-button');
    modalCloseButton.onclick = (event) => {
        overlay.style.display = "none";
        modal.style.display = "none";
    }

    const table = modal.querySelector('table');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    const allForms = document.querySelectorAll('form');
    for (const form of allForms) {
        const tRow = document.createElement('tr');

        const select = form.querySelector('select');
        const currentDrink = select.options[select.selectedIndex].textContent;
        const td = document.createElement('td');
        td.textContent = currentDrink;
        tRow.appendChild(td);

        const td2 = document.createElement('td');
        const milk = form.querySelector('input[type="radio"]:checked');
        td2.textContent = milk.value;
        tRow.appendChild(td2);

        const td3 = document.createElement('td');
        const options = form.querySelectorAll('input[type="checkbox"]:checked');
        td3.textContent = Array.from(options).map(opt => opt.value).join(', ');
        tRow.appendChild(td3);
        table.appendChild(tRow);
    }
    modal.appendChild(table);
}

const commitButton = document.querySelector('.submit-button');
commitButton.onclick = (event) => {
    event.preventDefault();
    showModal();
}
