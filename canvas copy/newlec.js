class Context{

    #enemies;
    constructor(){
            this.#enemies=null;
        }   


    get enemies(){
        return this.#enemies;
    }
    set enemies(value){
        this.#enemies =value;
    }


}

export default new Context();//객체를 보낼때 x의 값만 보내주면 