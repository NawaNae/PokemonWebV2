
var NawaNawa=NawaNawa||{};


NawaNawa.scrollLock=false;
NawaNawa.wheelListener=
function(e)
{
    if(NawaNawa.scrollLock)
    {    
        e.preventDefault();
        return ;
    }
    let diff=e.deltaY;
    if(diff>0)/*下滾 */
    {
        if(NawaNawa.pageList.indexNow<NawaNawa.pageList.length-1)
        {
          //  console.log("++");
            NawaNawa.pageList.indexNow++;
            NawaNawa.scrollLock=true;
        }
    }
    else if(diff<0)
    {
      //  console.log("--");
        if(NawaNawa.pageList.indexNow>0)
        {
            NawaNawa.pageList.indexNow--;
            NawaNawa.scrollLock=true;
        }
    }
}
document.addEventListener("wheel",NawaNawa.wheelListener);
NawaNawa.Classes=NawaNawa.Classes||{};
NawaNawa.Classes.PageList=
class PageList extends Array
{
    constructor(p)
    {
        if(typeof p!="undefined")
            super(p);
        else
            super();
        this._indexNow=0;
    }
    set indexNow(i)
    {
        if(i<this.length)
        {
            $('html').animate({scrollTop: $(this[i]).offset().top-57}, 1000,()=>{NawaNawa.scrollLock=false;});
            this._indexNow=i;
        }
        else
            console.log("超出範圍");
    }
    get indexNow()
    {
        return this._indexNow;
    }
}
/*initialize */

NawaNawa.pageList=new NawaNawa.Classes.PageList();

(()=>{
 let list= Array.from(document.querySelectorAll("article"));
 for(var i=0;i<list.length;i++)
     NawaNawa.pageList.push(list[i]);
})();

