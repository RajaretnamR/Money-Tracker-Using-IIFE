

//Item Controller => items data handle (add/update/delete/total)

const itemCtrl = (function(){

    //Item constructor :
    const Item = function(id, name , money){
        this.id = id;
        this.name = name;
        this.money = money;

    }

     // Private data
     const data ={
        items:[
            
            {id:0, name:"Clothes", money:1000},
            {id:1, name:"Food", money:3000},
            {id:2, name:"Bike Service", money:5000},
            
        ],
        totalMoney:0,
        currentItem:null
     };

     return { // Module pattern la return panuradhu ellamey Method ah dha irukanum :
        getItem:function(){
            return data.items; 

        },
        
        //AddItem kana Function Create panure inga :
        addItem: function(name, money){
            // console.log(name,money)

            let ID ;

            //Create a ID :

            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id +1;
            }else{
                ID=0;
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
        getTotalMoney: function() {
            let total = 0; // Intial ah 0

            if(data.items.length > 0){
                data.items.forEach(function(item){
                    total += item.money;

                    data.totalMoney = total;
                })
            }else{
                data.totalMoney = 0;
            }
            return total;
        },

        


    }
    
})()
// console.log(itemCtrl.getItem())


//UI Controller => UI la eppadi show panna
     const UICntrl = (function(){
        return{
            populateItemList:function(items){
                // console.log(items);

                let html =""; 
                items.forEach(function(item){
                    // console.log(item)

                    html += `
                            <li class="collection-item" data-id="${item.id}">
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
            showEditState:function(){
                document.querySelector(".add-btn").style.display ="none";
                document.querySelector(".update-btn").style.display ="inline";
                document.querySelector(".delete-btn").style.display ="inline";
                document.querySelector(".back-btn").style.display ="inline";
            },
            

            //Indha function UI open aanoan Update,delete,back indha 3 btns hide ah irukanum adhukaga : 
            clearEditState:function(){
                document.querySelector(".add-btn").style.display ="inline";
                document.querySelector(".update-btn").style.display ="none";
                document.querySelector(".delete-btn").style.display ="none";
                document.querySelector(".back-btn").style.display ="none";
            },

            //Item name & money enter pannona UI la show aaguraduku :
            getInputItem:function(){
                return{
                    name:document.querySelector("#item-name").value.trim(),
                    money:parseInt(document.querySelector("#item-money").value.trim()),

                }
            },


            // Once items ellamey enter aanona input fields clear aagirum adhukaga :
            clearInputState:function(newItem){
                name:document.querySelector("#item-name").value = "" ;
                money:document.querySelector("#item-money").value = ""
            },
            

            // Default ah iruka 3items ah thaadi nama new items add panna adhu show aaguradhkaaga :
            addListItem:function(newItem){
                // console.log(newItem)

                //Create a LI element :
                const li =document.createElement("li");

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

          // UI Controller la add this function
                showTotalMoney: function(totalMoney) {
                    document.querySelector('.total-money').innerText = totalMoney ;
            }

        }
     })();



//App Controler => rules & event handling (start the app, connect rooms)
  const app = (function(){

     const loadEventListerners = function(){
        //Add item panuradhuuku create panura function :
        document.querySelector(".add-btn").addEventListener("click" , itemAddSubmit);

        // Edit item Click 
        document.querySelector("#item-list").addEventListener("click" , itemEditClick);

     }

     const itemAddSubmit = function(e){
         e.preventDefault(); // epala Item ah add panureno apala page  refresh behaviour stop panuradhuku idu 
        //  console.log("hello macha Iam clicked ")

        // item & money enter panna item UI la add aaganum adhukaga :
        const input = UICntrl.getInputItem();
        // console.log(input)

        //Validation Alert msg kaga :
        if(input.name==="" || input.money===""){
            alert("Dei! Edhachu Ni value kudukanum da ??!!")
        }else{
            // console.log(input);

            //Add btn Click panna Items kulla na kudukura new Item add aaganum UI la :
            const newItem = itemCtrl.addItem(input.name , input.money);

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
     const itemEditClick = function(e){
        if(e.target.classList.contains("edit-item")){
            UICntrl.showEditState();
        }
     }   
        return{
            start:function(){

                //Clear the Button :
                UICntrl.clearEditState();

                const items =  itemCtrl.getItem()

                // console.log(items)
                if(items.length > 0){
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

