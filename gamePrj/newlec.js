class Context{
    #fruits;
    constructor(){
            this.#fruits=null;
        }   


    get fruits(){
        return this.#fruits;
    }
    set fruits(value){
        this.#fruits =value;
    }


}

export default new Context();//객체를 보낼때 x의 값만 보내주면 