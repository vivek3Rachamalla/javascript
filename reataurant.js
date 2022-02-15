
document.querySelector("#item-input").addEventListener("keyup",
function(e){
    let char = document.querySelector("#item-input").value.toLowerCase();
    let items = document.querySelectorAll(".item-body");
    for(let i=0;i<items.length;i++){
        let itemName = items[i].querySelector('.item-body h2.item-name');
        if(itemName.innerHTML.toLowerCase().indexOf(char) > -1){
            items[i].style.display="";
        }else{
            items[i].style.display="none";
        }
    }

    e.preventDefault();
})

document.querySelector("#table-input").addEventListener("keyup",
function(e){
    let char = document.querySelector("#table-input").value.toLowerCase();
    let tables = document.querySelectorAll(".table-body");
    for(let i=0;i<tables.length;i++){
        let tableName = tables[i].querySelector('.table-body h2.table-name');
        if(tableName.innerHTML.toLowerCase().indexOf(char) > -1){
            console.log("helolo")
            tables[i].style.display="";
        }else{
            tables[i].style.display="none";
        }
    }

    e.preventDefault();
})



const menuItems = [
    {
        id : 1,
        name : "Chicken biryani",
        price : 250,
        category : "biryani"
    },
    {
        id : 2,
        name : "Veg Biryani",
        price : 300,
        category : "biryani"
    },
    {
        id : 3,
        name : "Butter Naan",
        price : 60,
        category : "main"
    },
    {
        id : 4,
        name : "Pizza",
        price : 200,
        category : "main"    
    },
];

for(let i=0;i<menuItems.length;i++){
    let menuList = document.querySelector('.menu-items');
    menuList.insertAdjacentHTML("beforeBegin",`
            <div class="item-body" id="item${menuItems[i]['id']}" draggable=true ondragstart="onDragStart(event,${menuItems[i]['id']})">
                <h2 class="item-name">${menuItems[i]['name']}</h2>
                <p>${menuItems[i]['price']}</p>
            </div>
  `);

}


const table = [
    {
        id : 1,
        name : "Table-1",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 2,
        name : "Table-2",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    },
    {
        id : 3,
        name : "Table-3",
        itemList : new Map(),
        price : 0,
        quantity : 0       
    }
    
];

for(let i=0;i<table.length;i++){
        let tableList = document.querySelector('.table');
        tableList.insertAdjacentHTML("beforeBegin",
                `<div class="table-body" id="table${table[i].id}" ondrop="drop(event)" ondragover="allowDrop(event)" data-bs-toggle="modal" data-bs-target="#myModal" onclick="renderOrderItems(event)">
                    <h2 class="table-name">${table[i]['name']}</h2>
                    <p id="table-totalPrice${table[i].id}">Total :&nbsp ${table[i]['price']}&nbsp Rs</p>
                    <p id="table-totalItems${table[i].id}">No of items : ${table[i]['quantity']} </p>
                </div>`

        );
}


var selectedItemId;
function onDragStart(ev,id){
    selectedItemId = id;
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(selectedItemId);
}

function drop(e){
    e.preventDefault();
    let tableId = e.target.id.match(/\d+/g);
    console.log("table id"+e.target.id)
    let items = table[tableId-1].itemList;
    console.log(table[tableId-1].itemList.size);
    if(items.size > 0 && items.get(selectedItemId)!=undefined){
        items.set(selectedItemId,items.get(selectedItemId)+parseInt(1));
    }else{
        items.set(selectedItemId,1);
    }
    table[tableId-1]['price'] += menuItems[selectedItemId-1]['price'];
    table[tableId-1]['quantity']++;
    document.getElementById("table-totalPrice"+tableId).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
    document.getElementById("table-totalItems"+tableId).textContent = "No of items :" +table[tableId-1]['quantity'];
    console.log(tableId);
}

function allowDrop(e) {
    e.preventDefault();
}

function renderOrderItems(e){

    document.querySelector('.table-details').style.display = "block";

    let tableId = e.target.id.match(/\d+/g); 
    
    document.querySelector('.modal-title').textContent = `Table-${tableId} | Order Details`


    if(table[tableId-1].quantity>0){
        let htmlString = "";
        htmlString += 
            `<tr>
                <th>S.No</th>
                <th>Item</th>
                <th>Price</th>
                <th>No of servings</th>
            </tr>`;
        let i = 1;

        for (const [key, value] of table[tableId-1].itemList.entries()) {
            if(i<=table[tableId-1]['itemList'].size){

                htmlString +=`
                <tr>
                    <td>${i}</td>
                    <td>${menuItems[key-1]['name']}</td>
                    <td>${menuItems[key-1]['price']}</td>
                    <td class="in"><input type=number id=quantity${key} class="quantity${key}" min=0  value="${value}" onchange="updateQuantity(${tableId},${key})"></td>
                </tr>`; 
                i++;
            }
        }
        document.getElementById("table-items").innerHTML = htmlString;
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }else{
        document.getElementById("table-items").innerHTML = `<div style="margin : 22px 159px;font-size:25px">Order&nbsp;list&nbsp;is&nbsp;empty</div>`;
        document.querySelector('#total-price').textContent = table[tableId-1].price;
    }
    document.querySelector('.closeButton').id = tableId;
}

function closeTableDetails(ev){
    document.querySelector('.table-details').style.display = "none";
}

function updateQuantity(tableId,itemId){
    let newQuantity = document.querySelector(".quantity"+itemId).value;
    if(newQuantity==0){
        deleteItem(tableId-1,itemId);
    }
    else{
        let oldQuantity = table[tableId-1].itemList.get(itemId);
        let price = menuItems[itemId-1].price;
        let oldPrice = (oldQuantity*price);
        let newPrice = (newQuantity*price);
        table[tableId-1].price += (newPrice-oldPrice);
        table[tableId-1].quantity += (newQuantity - oldQuantity);
        table[tableId-1].itemList.set(itemId,newQuantity);
    }
    document.getElementById("table-totalPrice"+(parseInt(tableId))).textContent = "Total : " + table[tableId-1]['price']+" Rs "; 
    document.getElementById("table-totalItems"+(parseInt(tableId))).textContent = "No of items :" +table[tableId-1]['quantity'];
    document.querySelector('#total-price').textContent = table[tableId-1].price;
}

function deleteItem(tableId,itemId){
    var count = table[tableId].itemList.get(itemId);
    price = menuItems[itemId-1].price;
    table[tableId].price -= price * count;
    table[tableId].quantity -= count;
    table[tableId].itemList.delete(itemId);
}

function generateBill(e){
    alert("your total bill is: "+document.querySelector("#total-price").innerHTML+"Rs")
}