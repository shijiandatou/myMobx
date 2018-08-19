import autorun from "./autorun";

export default function observer(target){
    let cwm = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function(){
        cwm && cwm.call(this);
        autorun(()=>{ //只要依赖的数据更新了 就会调用强制跟新的方法
            this.render();
            this.forceUpdate();
        })
    };
}