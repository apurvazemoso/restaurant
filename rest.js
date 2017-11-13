
var tableItems= [
  {
    "tableNumber":"Table-1",
    "billAmount" : 0,
    "items": 0,
    "products" : [],
    "quantity" : []
  },
  {
    "tableNumber":"Table-2",
    "billAmount" : 0,
    "items":0,
    "products" : [],
    "quantity" : []
  },
  {
    "tableNumber":"Table-3",
    "billAmount" : 0,
    "items":0,
    "products" : [],
    "quantity" : []
  },
  {
    "tableNumber":"Table-4",
    "billAmount" : 0,
    "items":0,
    "products" : [],
    "quantity" : []
  }
];


var menuitems = [
  {
    "dish": "Honey Chilli Potato",
    "price": 200
  },

  {  "dish": "Uttapam",
    "price": 100
  },

    {"dish": "Dosa",
    "price": 150
  },

  {  "dish": "Roti",
    "price": 20
  },

    {"dish": "Dal Makhani",
    "price": 120
  },

  {  "dish":"Assam Tea",
    "price": 55
  },
  {  "dish": "Veg Thali",
    "price": 240
  },

  {
    "dish": "Non Veg Thali",
    "price": 280
  },

  {  "dish":"Naan",
    "price": 40
  },

    {"dish": "Idly",
    "price": 80
  },

  {  "dish": "Veg Biryani",
    "price": 200
  }
];

function initial(){
    var foodtable = document.getElementById("foodmenu");
    for (var i = 0; i <menuitems.length; i++){
        var tr = "<tr id='food" + i + "' draggable = 'true' ondragstart='dragStart(event)''><td><b><h4>" + menuitems[i].dish + "</h4></td><td><h4>" + menuitems[i].price + "</h4></td></tr>"
        foodtable.innerHTML += tr;
    }

    var seattable = document.getElementById("tablemenu");
    for (var i = 0; i <tableItems.length; i++){
        var tr = "<div onclick = 'openModal(" + i + ")' id='seat" + i + "'ondrop='drop(event)' ondragover='allow(event)' class='tablediv tablemodal'><b><h4> " + tableItems[i].tableNumber + "</h4></b><h4> Items : " + tableItems[i].items + "</h4><h4> Total Amount : Rs. " + tableItems[i].billAmount + "</h4>"
        seattable.innerHTML += tr;
    }
}

function allow(ev) {
    ev.preventDefault();
}


function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function searchingTable() {
    
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchTable');
    filter = input.value.toUpperCase();
    var a1 = document.getElementById("tablemenu");
    var items = a1.getElementsByTagName('div');
        
    for (i = 0; i < items.length; i++) {
        ite = items[i].getElementsByTagName("h4")[0];
        if (ite.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function searching() {
    
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchMenu');
    filter = input.value.toUpperCase();
    var a1 = document.getElementById("foodmenu");
    var items = a1.getElementsByTagName('tr');
        
    for (i = 0; i < items.length; i++) {
        ite = items[i].getElementsByTagName("td")[0];
        if (ite.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function drop(ev) {
    ev.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var table = ev.target.id;
    if(table !== ''){
        tableItems[table.charAt(4)].billAmount += menuitems[data.charAt(4)].price;
        if(tableItems[table.charAt(4)].products.includes(menuitems[data.charAt(4)].dish)){
            var index = tableItems[table.charAt(4)].products.indexOf(menuitems[data.charAt(4)].dish);
            tableItems[table.charAt(4)].quantity[index]++;

        }
        else{
          tableItems[table.charAt(4)].products.push(menuitems[data.charAt(4)].dish);
          var index = tableItems[table.charAt(4)].products.indexOf(menuitems[data.charAt(4)].dish);
          tableItems[table.charAt(4)].quantity[index] = 1;
        }
        console.log(tableItems);
        tableItems[table.charAt(4)].items += 1;
        console.log(tableItems[table.charAt(4)]);
        var food = document.getElementById(data);
        var seattable = document.getElementById("tablemenu");
        seattable.innerHTML = '';   
        for (var i = 0; i <tableItems.length; i++){
        var tr = "<div onclick = 'openModal(" + i + ")' id='seat" + i + "'ondrop='drop(event)' ondragover='allow(event)' class='tablediv tablemodal'><b><h4> Table Number : " + tableItems[i].tableNumber + "</h4></b><h4> Items : " + tableItems[i].items + "</h4><h4> Total Amount : Rs. " + tableItems[i].billAmount + "</h4>";
        seattable.innerHTML += tr;
    }
    }
    else{
        alert('Drag Properly');
    }   
}

function openModal(i) {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    var c = "<tr><td>Item</td><td>Quantity</td><td>Total Price</td></tr>";
    for(var it = 0; it<tableItems[i].products.length; it++){
        c += "<tr><td>" + tableItems[i].products[it] + "</td><td><input id='inpu|" + it+"|"+i + "' type='number' onchange='change(event)' value = " + tableItems[i].quantity[it] + "></input></td><td><span id='inpuu|" + it+"|"+i + "'>" +  tableItems[i].quantity[it] *search(tableItems[i].products[it]).price + "</span></td></tr>";
    }

    document.getElementById("modalcontent").innerHTML = 
        "<div class='modaldiv'><b><h2 align='center'>Bill of Table Number : " + tableItems[i].tableNumber + "</h2></b><table style='width:100%'>" + c + "</table><h4> Total Amount : Rs. " + tableItems[i].billAmount + "</h4><button id='final' onclick='fin(" + i + ")'>Generate Bill/Close Session</button>";
}

function search(nameKey){
    for (var i=0; i < menuitems.length; i++) {
        if (menuitems[i].dish === nameKey) {
            return menuitems[i];
        }
    }
}

function change(ev){
    var r = ev.target.id;
var myarray = r.split('|');
var i = myarray[2];
var it = myarray[1];
var item = search(tableItems[i].products[it]);
tableItems[i].quantity[it] = document.getElementById(ev.target.id).value;
var c = "<tr><td>Item</td><td>Quantity</td><td>Total Price</td></tr>";
tableItems[i].billAmount = 0;
tableItems[i].items = 0;
    for(var itm = 0; itm<tableItems[i].products.length; itm++){
        tableItems[i].items += 1;
        tableItems[i].billAmount += tableItems[i].quantity[itm] * search(tableItems[i].products[itm]).price;
        c += "<tr><td>" + tableItems[i].products[itm] + "</td><td><input id='inpu|" + itm+"|"+i + "' type='number' onchange='change(event)' value = " + tableItems[i].quantity[itm] + "></input></td><td><span id='inpuu|" + itm+"|"+i + "'>" +  tableItems[i].quantity[itm] * search(tableItems[i].products[itm]).price + "</span></td></tr>";
    }
     document.getElementById("modalcontent").innerHTML = 
        "<div class='modaldiv'><b><h2 align='center'>Bill of Table Number : " + tableItems[i].tableNumber + "</h2></b><table style='width:100%'>" + c + "</table><h4> Total Amount : Rs. " + tableItems[i].billAmount + "</h4><button id='final' onclick='fin(" + i + ")'>Generate Bill/Close Session</button>";

/*<button id='final' onclick='fin(" + i + "')>Generate Bill/Close Session</button>";
*/
}

function fin(i){
    
    document.getElementById("modalcontent").innerHTML = "<h2> Bill Generated</h2><h3> Final pay rupees " + tableItems[i].billAmount + "</h3>";
    tableItems[i].items = 0;
    tableItems[i].billAmount = 0;
    tableItems[i].products = [];
    tableItems[i].quantity = [];
    
    var seattable = document.getElementById("tablemenu");
    document.getElementById("tablemenu").innerHTML = ""; 
    for (var i = 0; i <tableItems.length; i++){
        var tr = "<div onclick = 'openModal(" + i + ")' id='seat" + i + "'ondrop='drop(event)' ondragover='allow(event)' class='tablediv tablemodal'><b><h4> " + tableItems[i].tableNumber + "</h4></b><h4> Items : " + tableItems[i].items + "</h4><h4> Total Amount : Rs. " + tableItems[i].billAmount + "</h4>"
        seattable.innerHTML += tr;
    }
}