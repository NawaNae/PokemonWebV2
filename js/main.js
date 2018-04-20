
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
            this._indexNow=i;
            var id=this[i].id.toString();
            
            console.log()
            location.hash=id[0].toUpperCase()+id.substring(1,id.length);
        }
        else
            console.log("超出範圍");
    }
    set select(id)
    {

            let select=this.getIndexById(id)
            if(typeof select!="undefined")
            {
                this.indexNow=select;
                $('html').animate({scrollTop: $(this[this.indexNow]).offset().top-57}, 1000,()=>{NawaNawa.scrollLock=false;});
            }
        
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
/**
 * 尋找某元素的祖先
 *@argument oneQuery只包含#id 或 .className 或 tagname的單組選擇
 */
NawaNawa.ancestorSelector=function(oneQuery=".article",htmlElement)
{
    if(!htmlElement)
    {
        console.log("請填入htmlElement於第二個參數作為基準");
        return;
    }
    let type=oneQuery[0];
    let content="";
    htmlElement=htmlElement.parentElement;
    if(type=="."||type=="#")
         content=oneQuery.slice(1,oneQuery.length);
    else
   {
        content=oneQuery;
        type="";
    }
    if(type==".")//class
    { 
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.classList.contains(content))
                return htmlElement;
    }
    else if(type=="#")//id
    {
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.id==content)
                return htmlElement;
    }   
    else if(type=="")//tag
    {
        for(;htmlElement!=document.body;htmlElement=htmlElement.parentElement)
            if(htmlElement.tagName==content.toUpperCase())
                return htmlElement;
    }
    return undefined;

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
    let article=NawaNawa.ancestorSelector(".article",this);
    article.dataset.page++;
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
            $(pages).fadeIn('500');
        }
    });
}
NawaNawa.lastPageListener=
function(e)
{
    if(this.classList.contains("disable"))
        return;
    let article=NawaNawa.ancestorSelector(".article",this);
        article.dataset.page--;
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
            $(pages).fadeIn('500');
        }
    })
}

/*initialize */

NawaNawa.pageList=new NawaNawa.Classes.PageList();

(()=>{
 let list= Array.from(document.querySelectorAll("article"));
 for(var i=0;i<list.length;i++)
     NawaNawa.pageList.push(list[i]);
$(".nextPageButton").on("click",NawaNawa.nextPageListener);
$(".lastPageButton").on("click",NawaNawa.lastPageListener);
$(".playNow").on("click",()=>{window.open("https://nawanae.github.io/PokemonYellow/start.html","_blank")})
$(".gitHub").on("click",()=>{window.open("https://github.com/NawaNae/PokemonYellow","_blank")})
let inmagePreLoad=[(new Image()).src="image/directions.jpg",(new Image()).src="image/AB.jpg",(new Image()).src="image/select.jpg"];
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
