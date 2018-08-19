let nowFn = null; //nowFn 当前的autorun 方法
let counter = 0;
class Reaction{
    constructor(){
        this.id = ++counter; 
        this.store = {}; //存储当前可观察对象对应的 nowFn {id:[fn]}
    }
    run(){
        if(this.store[this.id]){
            this.store[this.id].forEach(element => {
                element();
            });
        }
    }
    collect(){
        //当前有需要绑定的函数 才进行绑定 没有的话就不用绑定
        if(nowFn){
            this.store[this.id] = this.store[this.id] || [];
            this.store[this.id].push(nowFn);
 
        }
    }
    //静态方法 只能通过class 进行调用
    static start(handler){
        nowFn = handler;
    }
    static end(){
        nowFn =null;
    }
};

//收集auto的方法，帮我们创建当前属性和auto关系
export default Reaction;