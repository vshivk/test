import {
    UI_ELEMENTS
} from "./view.js";

let data = JSON.parse(localStorage.getItem('data')) || [];
let sortedByAlphabet = false;

const fetchPeople = async () => {
    UI_ELEMENTS.IS_LOADING.classList.remove('not-visible');
    UI_ELEMENTS.NO_DATA.classList.add('not-visible');
    try {
        const response = await fetch('https://swapi.dev/api/people');
        const json = await response.json();
        data = json.results;
        localStorage.setItem('data', JSON.stringify(data));
        renderTable();
    } catch (error) {
        alert(error.message);
    }
    UI_ELEMENTS.IS_LOADING.classList.add('not-visible');
};

const clearTable = () => {
    localStorage.removeItem('data');
    data = [];
    renderTable();
};

const removeRow = (index) => {
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    renderTable();
};

const sortByColumn = (column) => {
    sortedByAlphabet = !sortedByAlphabet;
    if (sortedByAlphabet) {
        data.sort((a, b) => a[column].localeCompare(b[column]));
    } else {
        data.sort((a, b) => b[column].localeCompare(a[column]));
    }
    localStorage.setItem('data', JSON.stringify(data));
    renderTable();
};

const renderTable = () => {
    if (data.length === 0) {
        UI_ELEMENTS.NO_DATA.classList.remove('not-visible');
        UI_ELEMENTS.TABLE.classList.add('not-visible');
        UI_ELEMENTS.TABLE.innerHTML = '';
    } else {
        UI_ELEMENTS.NO_DATA.classList.add('not-visible');
        UI_ELEMENTS.TABLE.classList.remove('not-visible');
        UI_ELEMENTS.TABLE.innerHTML = `
            <tr class="table-thead">
                <th onclick="sortByColumn('name')">Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th onclick="sortByColumn('hair_color')">Hair color</th>
                <th onclick="sortByColumn('skin_color')">Skin color</th>
            </tr>
            ${data.map((item, index) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.height}</td>
                    <td>${item.mass}</td>
                    <td>${item.hair_color}</td>
                    <td>${item.skin_color}</td>
                    <td>
                        <button onclick="removeRow(${index})">Remove</button>
                    </td>
                </tr>
            `).join('')}
        `;
    }
};

UI_ELEMENTS.LOAD_BTN.addEventListener('click', fetchPeople);
UI_ELEMENTS.CLEAR_BTN.addEventListener('click', clearTable);

renderTable();

