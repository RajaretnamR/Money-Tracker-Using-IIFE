

//Item Controller

const itemCtrl = (function(){
    //constructor
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

        }


    }
    
    
})()
// console.log(itemCtrl.getItem())


//UI Controller :

     const UICntrl = (function(){
        return{
            populateItemList:function(items){
                // console.log(items);
                let html ="";
                items.forEach(function(item){
                    // console.log(item)

                    html += `
                             <li class="collection-item">
                                <strong>Shopping</strong> :
                                <em>3000 RS</em>
                                <a href="#!" class="secondary-content">
                                    <i class="fa-solid fa-pencil"></i>
                                </a>
                            </li> 
                          `;
                });

                document.querySelector("#item-list").innerHTML = html;
            }
        }
     })();



//App Controler :
  const app = (function(){

    return{
        start:function(){
            const items =  itemCtrl.getItem()

            // console.log(items)
            if(items.length > 0){
                UICntrl.populateItemList(items)
            }
        }
    }
  })()


app.start()

