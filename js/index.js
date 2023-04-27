import {
    UI_ELEMENTS
} from "./view.js";

let DATA = JSON.parse(localStorage.getItem('data')) || [];
let SORTED_BY_COLUMN = false;

const setData = (NEW_DATA) => {
    DATA = NEW_DATA;
    return DATA;
}

const fetchPeople = async () => {
    UI_ELEMENTS.IS_LOADING.classList.remove('not-visible');
    UI_ELEMENTS.NO_DATA.classList.add('not-visible');
    try {
        const RESPONSE = await fetch('https://swapi.dev/api/people');
        const RESPONSE_JSON = await RESPONSE.json();
        setData(RESPONSE_JSON.results);
        localStorage.setItem('data', JSON.stringify(DATA));
        renderTable();
    } catch (error) {
        alert(error.message);
    }
    UI_ELEMENTS.IS_LOADING.classList.add('not-visible');
};

const clearTable = () => {
    localStorage.removeItem('data');
    setData([]);
    renderTable();
};

const removeRow = (index) => {
    DATA.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(DATA));
    renderTable();
};

const sortByColumn = (column) => {
    SORTED_BY_COLUMN = !SORTED_BY_COLUMN;
    const SORTED_DATA = DATA.slice().sort((a, b) => {
        if (column === "height" || column === "mass") {
            return SORTED_BY_COLUMN ? a[column] - b[column] : b[column] - a[column];
        } else {
            return SORTED_BY_COLUMN ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
        }
    });
    localStorage.setItem('data', JSON.stringify(SORTED_DATA));
    setData(SORTED_DATA);
    renderTable();
};

const renderTable = () => {
    const IS_EMPTY = DATA.length === 0;
    if (IS_EMPTY) {
        UI_ELEMENTS.NO_DATA.classList.remove('not-visible');
        UI_ELEMENTS.TABLE.classList.add('not-visible');
        UI_ELEMENTS.TABLE.innerHTML = '';
    } else {
        UI_ELEMENTS.NO_DATA.classList.add('not-visible');
        UI_ELEMENTS.TABLE.classList.remove('not-visible');
        UI_ELEMENTS.TABLE.innerHTML = `
            <tr class="table-thead">
                <th onclick="sortByColumn('name')">Name</th>
                <th onclick="sortByColumn('height')">Height</th>
                <th onclick="sortByColumn('mass')">Mass</th>
                <th onclick="sortByColumn('hair_color')">Hair color</th>
                <th onclick="sortByColumn('skin_color')">Skin color</th>
            </tr>
            ${DATA.map((item, index) => `
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
window.removeRow = removeRow;
window.sortByColumn = sortByColumn;
UI_ELEMENTS.LOAD_BTN.addEventListener('click', fetchPeople);
UI_ELEMENTS.CLEAR_BTN.addEventListener('click', clearTable);
renderTable();

