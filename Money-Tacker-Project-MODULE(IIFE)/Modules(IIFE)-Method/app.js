

//  https://68a5a58f2a3deed2960e3edc.mockapi.io/web/data

//MOCK API controller :

const APICtrl = (function(){

    const API_URL = "https://68a5a58f2a3deed2960e3edc.mockapi.io/web/data";

    return {

        // GET method :
        async fetchItems(){
            //URL la irudhu data response vara varaikum wait panudhu :
            const res = await fetch(API_URL);

            // idhu vandha response ah JSON format ah mathudhu :
            return await res.json();
        },


        // add items on API :
            async addItem(item){

            //URL la irudhu data response vara varaikum wait panudhu :
            const res = await fetch(API_URL , {
                method : "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(item)
            });
            // idhu vandha response ah JSON format ah mathudhu :
            return await res.json();
        },
        
        // Update  items on API :
            async updateItem(item){

            //URL la irudhu data response vara varaikum wait panudhu :
            const res = await fetch(`${API_URL}/${item.id}` , {
                method : "PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(item)
            });
            // idhu vandha response ah JSON format ah mathudhu :
            return await res.json();
        },
        
        // Delete  items on API :
            async deleteItem(id){

            //URL la irudhu data response vara varaikum wait panudhu :
            const res = await fetch(`${API_URL}/${id}` , {
                method : "DELETE"
            })
        },

        async clearAllItems(){

            const items = await this.fetchItems();
            //  console.log(items)

            await Promise.all(items.map(items => this.deleteItem(items.id)));
        }

    }
})();



//Item Controller => items data handle (add/update/delete/total)
const itemCtrl = (function () {

    //Item constructor :
    const Item = function (id, name, money) {
        this.id = id;
        this.name = name;
        this.money = money;

    }

    // Private data
    const data = {
        items: [

            { id: 0, name: "Clothes", money: 1000 },
            { id: 1, name: "Food", money: 3000 },
            { id: 2, name: "Bike Service", money: 5000 },

        ],
        totalMoney: 0,
        currentItem: null
    };

    return { // Module   pattern la return panuradhu ellamey Method ah dha irukanum :
        getItem: function () {
            return data.items;

        },

        //AddItem kana Function Create panure inga :
        addItem: function (name, money) {
            // console.log(name,money)

            let ID;

            //Create a ID :

            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            money = Number(money); // Idhu vandhu money la namma type panuradhu number nu adhoa typeos show panuradhukaga :

            //Create a New Item :
            newItem = new Item(ID, name, money) // Enoda constructor function ah call panure ;


            //Add to item to array :
            data.items.push(newItem);

            // console.log(newItem)
            return newItem;


        },
        // Item Controller return section la add pannu
        getTotalMoney: function () {
            let total = 0; // Intial ah 0

            if (data.items.length > 0) {
                data.items.forEach(function (item) {
                    total += item.money;

                    data.totalMoney = total;
                })
            } else {
                data.totalMoney = 0;
            }
            return total;
        },

        // Edit icon ah click panna nadakura function :
        getItemByID: function (id) {

            let found = null;

            data.items.forEach(function (item) {
                if (item.id == id) {
                    found = item
                }
            });

            return found
        },

        setItems:function(items){
            data.items=items;
        },

        //Found aana item ah idhula set panite :
        setCurrentItem: function(item) {
            data.currentItem = item;
        },

        getCurrentItem: function () {
            return data.currentItem;
        },

        deleteItem: function (id) {

            // get ID's :
            const ids = data.items.map(function (item) {
                return item.id;
            });

            //get index :
            const index = ids.indexOf(id);

            //Doing a splice Method :
            data.items.splice(index, 1);
        },


        clearAllItems: function () {
            data.items = [];
        },


        updateItem: function (name, money) {

            //1st money string ah varum adha namma number ah convert pannuree :
            money = Number(money);

            let found = null;

            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name,
                        item.money = money

                    found = item;

                }
            })

            return found;
        }
    }

})()
// console.log(itemCtrl.getItem())


//UI Controller => UI la eppadi show panna
const UICntrl = (function () {
    return {
        populateItemList: function (items) {
            // console.log(items);

            let html = "";
            items.forEach(function (item) {
                // console.log(item)

                html += `
                            <li class="collection-item" id="item-${item.id}">
                                <strong>${item.name}</strong> :
                                <em>${item.money} RS</em>
                                <a href="#!" class="secondary-content">
                                   <i class="fa-solid fa-pencil edit-item"></i>
                                </a>
                            </li>
                          `;
            });

            document.querySelector("#item-list").innerHTML = html;
        },


        //Edit icon ah click panna Add btn hide aagum balance thre btns show aagum :
        showEditState: function () {
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },


        //Indha function UI open aanoan Update,delete,back indha 3 btns hide ah irukanum adhukaga : 
        clearEditState: function () {
            document.querySelector(".add-btn").style.display = "inline";
            document.querySelector(".update-btn").style.display = "none";
            document.querySelector(".delete-btn").style.display = "none";
            document.querySelector(".back-btn").style.display = "none";
        },

        //Item name & money enter pannona UI la show aaguraduku :
        getInputItem: function () {
            return {
                name: document.querySelector("#item-name").value.trim(),
                money: parseInt(document.querySelector("#item-money").value.trim()),

            }
        },


        // Once items ellamey enter aanona input fields clear aagirum adhukaga :
        clearInputState: function (newItem) {
             document.querySelector("#item-name").value = "";
             document.querySelector("#item-money").value = ""
        },


        // Default ah iruka 3items ah thaadi nama new items add panna adhu show aaguradhkaaga :
        addListItem: function (newItem) {
            // console.log(newItem)

            //Create a LI element :
            const li = document.createElement("li");

            //Create a className to Li :
            li.className = "collection-item";

            //Add ID To li
            li.id = `item-${newItem.id}`;

            //Insert an HTML :
            li.innerHTML = `
                               <strong>${newItem.name}</strong> :
                                <em>${newItem.money} RS</em>
                                <a href="#!" class="secondary-content">
                                   <i class="fa-solid fa-pencil edit-item"></i>
                                </a>
                `;

            //insert into the UL : 
            document.querySelector("#item-list").appendChild(li);
        },

        // UI Controller la  Item ah add pannona money update function :
        showTotalMoney: function (totalMoney) {
            document.querySelector('.total-money').innerText = totalMoney;
        },

        //Edit icon ah click panna UI la nadakura function :
        addItemToForm: function () {
            document.querySelector("#item-name").value = itemCtrl.getCurrentItem().name;
            document.querySelector("#item-money").value = itemCtrl.getCurrentItem().money;
        },

        //UI la dlt item ah click panna dlt aagura function :
        deletelistItem: function (id) {
            // console.log(id);

            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);

            item.remove();

        },

        //clearn Btn ah click panna nadakura function :
        clearItems: function () {

            //Method - 1 :
            const collection = document.querySelector("#item-list");
            collection.innerHTML = "";
        },


        //UI la update aaguradhkana Function :
        updateListItem: function (item) {
            // console.log(item); 

            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function (listItem) {

                const itemID = listItem.getAttribute("id");

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `

                                <strong>${item.name}</strong> :
                                <em>${item.money} RS</em>
                                <a href="#!" class="secondary-content">
                                   <i class="fa-solid fa-pencil edit-item"></i>
                                </a>
                        
                        `
                }
            })
        }

    }
})();



//App Controler => rules & event handling (start the app, connect rooms)
const app = (function () {

    // Inga enna enna Events Panna poromo adhula inga declare panure :
    const loadEventListerners = function () {
        //Add item panuradhuuku create panura function :
        document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

        // Edit item Click 
        document.querySelector("#item-list").addEventListener("click", itemEditClick);

        //back btn click panna back ponum :
        document.querySelector(".back-btn").addEventListener("click", backClick);

        //Clear btn click panna Items clr aaganum :
        document.querySelector(".clear-btn").addEventListener("click", itemClearSubmit);

        //Delete btn click panna dlt aaganum :
        document.querySelector(".delete-btn").addEventListener("click", itemDeleteSubmit);

        //Update btn click panna dlt aaganum :
        document.querySelector(".update-btn").addEventListener("click", itemUpdateSubmit);


    }

    //New item ah add panna Nadakura function :
    const itemAddSubmit = async function (e) {
        e.preventDefault(); // epala Item ah add panureno apala page  refresh behaviour stop panuradhuku idu 
        //  console.log("hello macha Iam clicked ")

        // item & money enter panna item UI la add aaganum adhukaga :
        const input = UICntrl.getInputItem();
        // console.log(input)

        //Validation Alert msg kaga :
        if (input.name === "" || input.money === "") {
            alert("Dei! Edhachu Ni value kudukanum da ??!!")
        } else {
            // console.log(input);

            const newItem = await APICtrl.addItem({
                name:input.name ,money:parseInt(input.money)
            })

            //Add btn Click panna Items kulla na kudukura new Item add aaganum UI la :
           itemCtrl.addItem(input.name, input.money);

            // Add item TO UI :
            UICntrl.addListItem(newItem);
 
            //  Step 3 - total calculate + show
            const totalMoney = itemCtrl.getTotalMoney();
            UICntrl.showTotalMoney(totalMoney);

            //Once ellamet UI la vandhona INput Fields la clear aaaganum :
            UICntrl.clearInputState();

        }
    }

    // Specific edit icon ah click panna nadkura function :
    const itemEditClick = function (e) {
        if (e.target.classList.contains("edit-item")) {

            const listID = e.target.parentElement.parentElement.id;
            // console.log(listID)

            //String ah array ah change panure :
            const listArr = listID.split("-");
            // console.log(listArr);

            // Get the actual Index ID:
            // const id = parseInt(listArr[1]);
            const id = listArr[1] ;
            // console.log(id);

            //get item :
            const itemToEdit = itemCtrl.getItemByID(id);

            itemCtrl.setCurrentItem(itemToEdit);

            UICntrl.addItemToForm();

            UICntrl.showEditState();

        }


    }

    //back btn ha click panna nadakura function :
    const backClick = function (e) {
        UICntrl.clearEditState();
        UICntrl.clearInputState();
    }

    //Dlt click panna nadakura event :
    const itemDeleteSubmit = async function () {

        //get the current item :
        const currentItem = itemCtrl.getCurrentItem();

        //Delete from the API :
        await APICtrl.deleteItem(currentItem.id);

        //Delete the current item:
        itemCtrl.deleteItem(currentItem.id);

        // console.log(currentItem)

        //Delete from the UI :
        UICntrl.deletelistItem(currentItem.id);

        //Get the total money : 
        const totalMoney = itemCtrl.getTotalMoney();

        //Update the total money into UI :
        UICntrl.showTotalMoney(totalMoney);

        //Clear a UI input :
        UICntrl.clearInputState();

        //clear the btn state :
        UICntrl.clearEditState();

    }

    //update btn ah click panna nadakura function :
    const itemUpdateSubmit = function () {

        //Get the wanted item as a object :
        const input = UICntrl.getInputItem()
        // console.log(input);

        const currentItem = itemCtrl.getCurrentItem();

        const updateItem = {
            id:currentItem.id,
            name:input.name ,
            money:parseInt(input.money)
        };

        //Update Item :
     itemCtrl.updateItem(input.name, input.money)

        // console.log(updateItem);

        //Update into UI :
        UICntrl.updateListItem(updateItem);

        //Get the total money : 
        const totalMoney = itemCtrl.getTotalMoney();

        //Update the total money into UI :
        UICntrl.showTotalMoney(totalMoney);

        //Clear a UI input :
        UICntrl.clearInputState();

        //clear the btn state :
        UICntrl.clearEditState();

    }

    //clear btn ah click panna nadakur function : 
    const itemClearSubmit = async function (e) {

        //Clear item Form API:
        await APICtrl.clearAllItems();


        itemCtrl.clearAllItems();

        //Clear all from UI :
        UICntrl.clearItems();

        //Get the total money : 
        const totalMoney = itemCtrl.getTotalMoney();

        //Update the total money into UI :
        UICntrl.showTotalMoney(totalMoney);
    }












    return {
        start: async function () {

            //Clear the Button :
            UICntrl.clearEditState();

            // const items = itemCtrl.getItem()

            const items = await APICtrl.fetchItems();
            // console.log(items)

            itemCtrl.setItems(items);


            if (items.length > 0) {
                UICntrl.populateItemList(items);

                //  Step 3 - total calculate + show
                const totalMoney = itemCtrl.getTotalMoney();
                UICntrl.showTotalMoney(totalMoney);
                // console.log(totalMoney)
            }
            loadEventListerners();
        }
    }
})()
app.start()

