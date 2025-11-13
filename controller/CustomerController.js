import { customers } from "../db/DB.js";

const loadTable = () => {
  $("#customerTableBody").empty();
  customers.forEach((c, i) => {
    $("#customerTableBody").append(
      `<tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.contact}</td>
        <td>${c.address}</td>
        <td>
          <button class="btn btn-sm btn-primary edit-btn" data-index="${i}">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${i}">Delete</button>
        </td>
      </tr>`
    );
  });
};

$("#addCustomerForm").on("submit", function (e) {
  e.preventDefault();
  const index = $("#edit-index").val();
  const customer = {
    id: $("#customerId").val().trim(),
    name: $("#customerName").val().trim(),
    contact: $("#customerContact").val().trim(),
    address: $("#customerAddress").val().trim(),
  };

  if (index === "") {
    if (customers.some((c) => c.id === customer.id)) {
      alert("Customer ID already exists!");
      return;
    }
    customers.push(customer);
  } else {
    customers[index] = customer;
  }

  $(this)[0].reset();
  $("#edit-index").val("");
  $("#addCustomerModal").modal("hide");
  loadTable();
  refreshCustomerDropdown();
});

$(document).on("click", ".edit-btn", function () {
  const i = $(this).data("index");
  const c = customers[i];
  $("#customerId").val(c.id);
  $("#customerName").val(c.name);
  $("#customerContact").val(c.contact);
  $("#customerAddress").val(c.address);
  $("#edit-index").val(i);
  $("#addCustomerModal .modal-title").text("Edit Customer");
  $("#addCustomerModal").modal("show");
});

$(document).on("click", ".delete-btn", function () {
  if (confirm("Delete this customer?")) {
    customers.splice($(this).data("index"), 1);
    loadTable();
    refreshCustomerDropdown();
  }
});

$(document).on("show.bs.modal", "#addCustomerModal", () => {
  $("#addCustomerForm")[0].reset();
  $("#edit-index").val("");
  $("#addCustomerModal .modal-title").text("Add Customer");
});

loadTable();
