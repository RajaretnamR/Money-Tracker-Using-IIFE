

//Item Controller => items data handle (add/update/delete/total)

const itemCtrl = (function(){

    //Item constructor :
    const Item = function(name , id , money){
        this.name = name;
        this.id = id;
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

            money = Number(money);

            //Create a New Item :
            newItem = new Item(name, ID, money)

            
            //Add to item to array :
            data.items.push(newItem);
            
            // console.log(newItem)
            return newItem;
            
             
        }


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
            

            //Indha function UI open aanoan Update,delete,back indha 3 btns hide ah irukanum adhukaga : 
            clearEditState:function(){
                document.querySelector(".add-btn").style.display ="inline";
                document.querySelector(".update-btn").style.display ="none";
                document.querySelector(".delete-btn").style.display ="none";
                document.querySelector(".back-btn").style.display ="none";
            },

            getInputItem:function(){
                return{
                    name:document.querySelector("#item-name").value.trim(),
                    money:parseInt(document.querySelector("#item-money").value.trim()),

                }
            },

            addListItem:function(newItem){
                // console.log(newItem)

                const li =document.createElement("li");

                li.className = "collection-item";

                li.id = ` item-${newItem.id}`;

                li.innerHTML = `
                 <strong>${newItem.name}</strong> :
                                <em>${newItem.money} RS</em>
                                <a href="#!" class="secondary-content">
                                   <i class="fa-solid fa-pencil edit-item"></i>
                                </a>
                
                
                `;

                //insert into the UL :
                document.querySelector("#item-list").appendChild(li);
            }
        }
     })();



//App Controler => rules & event handling (start the app, connect rooms)
  const app = (function(){

     const loadEventListerners = function(){

        //Add item panuradhuuku create panura function :
        document.querySelector(".add-btn").addEventListener("click" , itemAddSubmit);
     }

     const itemAddSubmit = function(e){
         e.preventDefault();
        //  console.log("hello macha Iam clicked ")

        // item & money enter panna item UI la add aaganum adhukaga :
        const input = UICntrl.getInputItem();
        // console.log(input)

        //Validation Alert msg kaga :
        if(input.name==="" || input.money===""){
            alert("Dei! Edhachu Ni value kudukanum da ??!!")
        }else{
            console.log(input);

            //Add btn Click panna Items kulla na kudukura new Item add aaganum UI la :
            const newItem = itemCtrl.addItem(input.name , input.money);

            // Add item TO UI :
            UICntrl.addListItem(newItem);

            
        }



     }




    //Clear the Button :
     UICntrl.clearEditState();

    return{
        start:function(){
            const items =  itemCtrl.getItem()

            // console.log(items)
            if(items.length > 0){
                UICntrl.populateItemList(items)
            }
            loadEventListerners();
        }
    }
  })()
app.start()

