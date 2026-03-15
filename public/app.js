const api = "/api/items";

async function fetchItems() {
  const res = await fetch(api);
  const items = await res.json();

  const list = document.getElementById("itemList");
  list.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.description}
      <button onclick="deleteItem('${item._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addItem() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });

  fetchItems();
}

async function deleteItem(id) {
  await fetch(`${api}/${id}`, {
    method: "DELETE"
  });

  fetchItems();
}

fetchItems();
