import { observable,autorun,configure,action,computed} from "mobx";
//configure({enforceActions:true});
import {observer} from 'mobx-react';
//observable 把普通的数据变成可观察的数据 Object.defineProperty proxy 给对象设置代理
import React,{ Component  } from "react";
import ReactDom from 'react-dom';
 
class Store{
    @observable num = 1;

    @computed get type(){
        return this.num%2 ? '奇数' : '偶数';
    }
    @action add = () =>{
        this.num +=1;
    }
};
let store = new Store();

@observer
class Counter extends Component{
    render(){
        return(
            <div>
                {this.props.store.num}
                <button onClick={()=>{
                    this.props.store.add();
                }}>+</button>
                {this.props.store.type}
            </div>
        )
    }
};
ReactDom.render(<Counter store={store}></Counter>,window.root);
// observe 可以监控数据的变化
// when 当xxx时 执行某个方法
//spy ....






















//computed 属性计算 是原生的
// class Person{
//     //类的装饰器
//     @observable name = 'liu';
//     @observable age = '9';
//     get getAllName(){
//         return this.name + '-' + this.age;
//     }
//     @acton.bound add = () =>{ //可以把this绑死
//         this.age +=1;
//     }
// };

// let p = new Person;

// autorun(()=>{
//     console.log(p.getAllName)
// });
// p.name = 'ha';
// p.add();
// console.log(p.name);

//装饰器

//1.方法装饰器 原型上的方法
// class Person{
//     @say
//     say(){
//         console.log('哈哈');
//     }
// }
//所用的target 指的是类的原型
// function say(target,key,descriptor) {
//     let oldSay = descriptor.value;
//     console.log(target,key,descriptor);
//     descriptor.value=function (){
//         console.log('start');
//         oldSay();
//         console.log('end');
//     }
// };
// let a = new Person();
// a.say();

//2.属性装饰
// class Circle{
//     @readonly PI = 3.14
// }
// function readonly(target,key,descriptor){
//     descriptor.writable = false;
//     console.log(target,key,descriptor);     
// }
// let c = new Circle();
//c.PI = 100;
//3.类装饰器
// @add
// class My {

// };
// function add(target){ //修饰类的时候 target就是类
//     target.flag = 'ok';

// };
// console.log(My.flag);

// let o =  observable([]);
// o.name = 'heool';
// console.log(o);

//自动运行 会先运行一次

// autorun(()=>{
//     console.log(o.length);//在这里肯定会调用get方法
// })
// o.push(1);
//收集依赖 o.name = autorun;

//es7  语法 Object.defineProperty getter setter
//一层墙 可以再中途干你想干的事
// function fn(){
//     alert(1);
// }
// Object.defineProperty 不支持监控数据(只能监控已有的属性)
// new Proxy 就是代理
// let obj ={a:1};
// let o =  new Proxy(obj,{
//     set(target,key,value){
//         return Reflect.set(target,key,value);
//     },
//     get(target,key){
//         return Reflect.get(target,key);
//     }
// });
// o.a=12313;
// console.log(o.a);