let menuItem = ["Cheeseburger", "Nudeln", "Salat"];
let prices = [5.99, 4.99, 3.50]
let ingredients = ["100g Rindfleisch Brötchen und Sauce", "Spagetthi mit Tomatensauce", "Gemichter Bauernsalat"]


let amount = [];
let addedItemprices = [];
let addedItems = [];



function loadMenu() {
    document.getElementById('menuContainer').innerHTML = '';
    for (i = 0; i < menuItem.length; i++) {
        document.getElementById('menuContainer').innerHTML += `
        <div class="menuItem" id="menuItem${i}">
        <div class="item">
         <h3>${menuItem[i]}</h3><h3>${prices[i].toFixed(2).replace('.',',')}€</h3>
         <button href="#" onclick="addToBasket(${i})">+</button>
         </div>
        
         <p>${ingredients[i]}</p>
         
        
     </div>
        `;
    }

}


function addToBasket(i) {
    let position = addedItems.indexOf(menuItem[i]);
    if (position == -1) {
        
        amount.push(1);
        addedItems.push(menuItem[i]);
        addedItemprices.push(prices[i]);
        renderBasket();
        calculate();
    }
    else {
        amount[position] += 1;
        renderBasket();
        calculate();
    }
}

function renderBasket() {
    document.getElementById('basket').innerHTML = '';
    if (addedItems.length == 0) {
        document.getElementById('basket').innerHTML = 'Wähle leckere Gerichte von der Karte und bestelle dein Menü';
    }
    else {
        for (let i = 0; i < addedItems.length; i++) {
            let totalPrice  = amount[i] * addedItemprices[i];
            document.getElementById('basket').innerHTML += `
        <div>
        <div class="basketList">
        <h3>${amount[i]}x</h3>
        <h3>${addedItems[i]}</h3>
        <h3>${totalPrice.toFixed(2).replace('.',',')}€</h3>
        </div>
        <div class="adding">
            <button class="roundBtn" onclick="remove(${i})">-</button>
            <button class="roundBtn" onclick="add(${i})">+</button>
        </div>
    </div>
</div>
        `;
            calculate();
        }
    }
}

function add(i){

    amount[i] +=1;
    renderBasket();
    calculate();
}

function remove(i) {
    if (amount[i] == 1) {
        amount.splice(i, 1);
        addedItems.splice(i, 1);
        addedItemprices.splice(i, 1);
        renderBasket();
        calculate();
    }
    else {
        amount[i] -= 1;
        renderBasket();
        calculate();

    }
}

function calculate() {  
    let fees = 2.50;
    let startSumm=0;
    if (addedItems.length == 0) {
        let orderSumm = 0;
        updateButton(orderSumm);
        minimumOrder(orderSumm);
        document.getElementById('summ').innerHTML = `
        <tr>
        <td class="left">Zwischensumme</td>
        <td class="right">0€</td>
        </tr>
        <tr>
        <td class="left">Gesamt</td>
        <td class="right">0€</td>
         </tr>`;
    }

    

    else {
        for (let i = 0; i < addedItems.length; i++) {

            let orderSumm = startSumm +=amount[i] * addedItemprices[i];
            let totalSumm = orderSumm+fees;
            document.getElementById('summ').innerHTML = `
            <tr>
                <td class="left">Zwischensumme</td>
                <td class="right">${orderSumm.toFixed(2).replace('.',',')}€</td>
            </tr>
    
            <tr>
                <td class="left">Liefergebühren</td>
                <td class="right">${fees.toFixed(2).replace('.',',')}€</td>
            </tr>
    
            <tr class="topBorder">
                <td class="left"><b>Gesamt<b></td>
                <td class="right"><b>${totalSumm.toFixed(2).replace('.',',')}€<b></td>
            </tr>
           `;
            updateButton(orderSumm);
            minimumOrder(orderSumm);

        }
    }
}


function updateButton(orderSumm) {
    if (orderSumm < 30) {

        document.getElementById('orderBtn').innerHTML = `
        <button class="noOrderBtn">Bestellen</button>
        `;

    } else {
        document.getElementById('orderBtn').innerHTML = `
        <button class="orderBtn" onclick="location.href='success.html';">Bestellen</button>
        `;
    }

}
function minimumOrder(orderSumm) {
    let minpric1 = 30 - orderSumm;
    let minprice = (Math.round(minpric1 * 100) / 100).toFixed(2);
    if (addedItems.length==0) {
        document.getElementById('minOrder').innerHTML = ``;
        
    }
    else if (minprice > 0) {
        document.getElementById('minOrder').innerHTML = `
        <p class="minOrder">Der Mindestbestellwert liegt bei 30€ Sie müssen noch Waren im Wert von ${minprice}€ um zu bestellen</p>`;

    }
    else {
        document.getElementById('minOrder').innerHTML = ``;
    }


}

