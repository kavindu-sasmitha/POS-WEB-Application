import { items } from "../db/DB.js";

const loadTable = () => {
  $("#itemTableBody").empty();
  items.forEach((item, i) => {
    $("#itemTableBody").append(
      `<tr>
        <td>${item.item_code}</td>
        <td>${item.name}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.qty}</td>
        <td>
          <button class="btn btn-sm btn-primary edit-item" data-index="${i}">Edit</button>
          <button class="btn btn-sm btn-danger delete-item" data-index="${i}">Delete</button>
        </td>
      </tr>`
    );
  });
};

$("#addItemForm").on("submit", function (e) {
  e.preventDefault();
  const index = $("#item-edit-index").val();
  const item = {
    item_code: $("#itemCode").val().trim(),
    name: $("#itemName").val().trim(),
    price: parseFloat($("#itemPrice").val()),
    qty: parseInt($("#itemQty").val()),
  };

  if (index === "") {
    if (items.some((i) => i.item_code === item.item_code)) {
      alert("Item code already exists!");
      return;
    }
    items.push(item);
  } else {
    items[index] = item;
  }

  $(this)[0].reset();
  $("#item-edit-index").val("");
  $("#addItemModal").modal("hide");
  loadTable();
  refreshItemDropdown();
});

$(document).on("click", ".edit-item", function () {
  const i = $(this).data("index");
  const item = items[i];
  $("#itemCode").val(item.item_code);
  $("#itemName").val(item.name);
  $("#itemPrice").val(item.price);
  $("#itemQty").val(item.qty);
  $("#item-edit-index").val(i);
  $("#addItemModal .modal-title").text("Edit Item");
  $("#addItemModal").modal("show");
});

$(document).on("click", ".delete-item", function () {
  if (confirm("Delete this item?")) {
    items.splice($(this).data("index"), 1);
    loadTable();
    refreshItemDropdown();
  }
});

loadTable();
