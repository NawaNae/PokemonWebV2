
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
    set select(id)
    {
        let select=this.getIndexById(id)
        if(typeof select!="undefined")
            this.indexNow=select;
    }
    get select()
    {
        return this[this.indexNow];
    }
    get indexNow()
    {
        return this._indexNow;
    }
    getIndexById(id)
    {
        var i=0;
        for(;i<this.length;i++)
            if(id==this[i].id)
                return i;
        return undefined;
    }
    getElementById(id)
    {
        return  this.find(element=> element.id==id);
    }
}
NawaNawa.buttonEnableChecker=function ()
{
    let content=this.querySelector(".pageContent");
    if(content)
    {
        if(!content.dataset.nextpagesrc)
            if(!button.classList.contains("disable"))
                button.classList.add("disable");
        if(content.dataset.lastpagesrc)
            if(theOtherButton.classList.contains("disable"))
            theOtherButton.classList.remove("disable");
    }
}
NawaNawa.nextPageListener=
function(e)
{
    if(this.classList.contains("disable"))
    return;
    let pages=this.parentElement.querySelector(".pages");
    let theOtherButton=this.parentElement.querySelector(".lastPageButton");
    let content=pages.querySelector(".pageContent");
    let button=this;
    $(pages).hide().load(content.dataset.nextpagesrc,function(){
        let content=this.querySelector(".pageContent");
        if(content)
        {
            if(!content.dataset.nextpagesrc)
                if(!button.classList.contains("disable"))
                    button.classList.add("disable");
            if(content.dataset.lastpagesrc)
                if(theOtherButton.classList.contains("disable"))
                theOtherButton.classList.remove("disable");
        }
    }).fadeIn('500');
}
NawaNawa.lastPageListener=
function(e)
{
    if(this.classList.contains("disable"))
        return;
    let pages=this.parentElement.querySelector(".pages");
    let theOtherButton=this.parentElement.querySelector(".nextPageButton");
    let content=pages.querySelector(".pageContent");
    let button=this;
    $(pages).hide().load(content.dataset.lastpagesrc,function(){
        let content=this.querySelector(".pageContent");
        if(content)
        {
            if(!content.dataset.lastpagesrc)
                if(!button.classList.contains("disable"))
                    button.classList.add("disable");
            if(content.dataset.nextpagesrc)
                if(theOtherButton.classList.contains("disable"))
                theOtherButton.classList.remove("disable");
        }
    }).fadeIn('500');
}

/*initialize */

NawaNawa.pageList=new NawaNawa.Classes.PageList();

(()=>{
 let list= Array.from(document.querySelectorAll("article"));
 for(var i=0;i<list.length;i++)
     NawaNawa.pageList.push(list[i]);
$(".nextPageButton").on("click",NawaNawa.nextPageListener);
$(".lastPageButton").on("click",NawaNawa.lastPageListener);
})();
window.onhashchange=
function(e)
{

    if(location.hash)
    {
        getVariable();
        e.preventDefault();
    }
    else{}
}
function getVariable()
{
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    var HashStr0 = HashStr[0];
    HashStr=HashStr.substring(1, document.location.hash.length)
    HashStr0 = HashStr0.toLowerCase();
    HashStr0 += HashStr;
    if (HashStr0 != '') 
        NawaNawa.pageList.select = HashStr0;
}
