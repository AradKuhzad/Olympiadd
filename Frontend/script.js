const table = document.getElementById("ordersTable");
const form = document.getElementById("orderForm");

let editId = null;

const defaultOrders = [
  {
    id: 1001,
    customer: "آراد",
    product: "لپتاپ",
    quantity: 2,
    price: 1200,
    status: "انتظار",
    date: "2026-11-20"
  }
];

async function loadOrders() {
    try {
        const response = await fetch("orders.json")
       const orders = await response.json()
    } catch {
        orders = defaultOrders;
    }
    showOrders();
}


function showOrders() {
  table.innerHTML = "";

  let text = document.getElementById("search").value.toLowerCase();
  let status = document.getElementById("filter").value;

  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];

    let found = order.customer.toLowerCase().includes(text);

    if (found && (status === "All" || order.status === status)) {
      let row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.price}</td>
        <td>${order.status}</td>
        <td>${order.date}</td>
        <td><button onclick="editOrder(${order.id})">Edit</button></td>
      `;

      table.appendChild(row);
    }
  }

  document.getElementById("search").addEventListener("input", showOrders);
  document.getElementById("filter").addEventListener("change", showOrders);

  document.getElementById("addBtn").addEventListener("click", function() {
  editId = null;
  form.reset();
  form.classList.remove("hidden");
});

}

function editOrder(id) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      let order = orders[i];
      editId = id;

      document.getElementById("customer").value = order.customer;
      document.getElementById("product").value = order.product;
      document.getElementById("quantity").value = order.quantity;
      document.getElementById("price").value = order.price;
      document.getElementById("status").value = order.status;
      document.getElementById("date").value = order.date;

      form.classList.remove("hidden");
    }
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  let order = {
    customer: document.getElementById("customer").value,
    product: document.getElementById("product").value,
    quantity: Number(document.getElementById("quantity").value),
    price: Number(document.getElementById("price").value),
    status: document.getElementById("status").value,
    date: document.getElementById("date").value
  };

  if (editId === null) {
    order.id = orders.length + 1001;
    orders.push(order);
  } else {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === editId) {
        orders[i] = { ...order, id: editId };
      }
    }
  }

  form.reset();
  form.classList.add("hidden");
  showOrders();
});

document.getElementById("cancelBtn").addEventListener("click", function() {
  form.classList.add("hidden");
});

loadOrders();
