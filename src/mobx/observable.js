import Reaction from './reaction';
//深度代理
let deepProxy = (val,handler)=>{
    if(typeof val !=='object') return val;
    //{name:'liu',age:{num:1}} 应该从里往外代理
    //从后往前依次实现代理功能 
    for(let key in val){
        val[key]=deepProxy(val[key],handler);
    }
    return new Proxy(val,handler());
}
//创建代理
let createOberservable = (val)=>{
    //声明一个专门用来代理的对象
    let handler = () =>{
        let reaction = new Reaction();
        return {
            get(target,key){
                reaction.collect();
                return Reflect.get(target,key);
            },
            set(target,key,value){
                if(key === 'length') return true;
                let r =  Reflect.set(target,key,value)
                reaction.run();
                return r;
            }
        }
    }
    return deepProxy(val,handler);
};
let observable = (target,key,descritor) =>{
    if(typeof key ==='string'){//是通过装饰器实现的，先把装饰的对象对象进行深度代理
        let v = descritor.initializer();
        v = createOberservable(v);
        let reaction = new Reaction();
        return{
            enumerable:true,
            configurable:true,
            get(){
                reaction.collect();
                return v;
            },
            set(value){
                v = value;
                reaction.run();
            }
        }

    }
    //需要将这个对象 进行代理操作 创建成可观察对象
    return createOberservable(target);
};

export default observable;