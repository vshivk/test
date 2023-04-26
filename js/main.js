const loadBtn = document.getElementById('load-btn')
const clearBtn = document.getElementById('clear-btn')
const table = document.getElementById('table')
const noData = document.getElementById('no-data')

let data = []

async function loadData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
    data = await response.json();
    renderTable()
}

function clearTable() {
    data = []
    renderTable()
}

function renderTable() {
    if (data.length === 0) {
        noData.style.display = 'block'
        table.innerHTML = ''
    } else {
        noData.style.display = 'none'
        table.innerHTML = '<tr><th>Name</th><th>Body</th><th>Email</th></tr>' + data.map(comment => `<tr><td>${comment.name}</td><td>${comment.body}</td><td>${comment.email}</td></tr>`).join('')
    }
}

loadBtn.addEventListener('click', loadData)
clearBtn.addEventListener('click', clearTable)

renderTable()