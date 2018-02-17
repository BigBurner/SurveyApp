export class UserSurveys {
 
    constructor(public _id: string, public userId: string,public survId: string,public surqId: string, public suraId: string,public items: any[]){
 
    }
 
    addItem(item){
        this.items.push({
            title: item,
            checked: false
        });
    }
 
    removeItem(item){
 
        // for(i = 0; i < this.items.length; i++) {
        //     if(this.items[i] == item){
        //         this.items.splice(i, 1);
        //     }
        // }
 
    }
}