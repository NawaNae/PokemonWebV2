/**
 * 處理函數
 * @example http://url.....#A=5&B=10&C=15 經過getVariable可解析變數名稱及value 得到Varible={ID:A,Value:5}及其他B、C並處理換頁
 */
function getVariable() {
   // var SearchStr = document.location.search.substring(1, document.location.search.length);
    var HashStr = document.location.hash.substring(1, document.location.hash.length);
    if (HashStr != '') 
        HashStr.split('&').forEach(HashVariableCallBack);//將各個拆開的變數字串處理
}
/*
function SearchVariableCallBack(val, ind) {
    var sp = val.split('=');//head=index
    var Variable={
        ID:sp[0],//head
        Value:sp[1]//index
    }
    var eleList = document.querySelectorAll('.' + Variable.ID);
    if (eleList.length > 0)
        Array.from(eleList).forEach(
            function (ele, index)
            {
                if (!ele.classList.contains(Variable.Value))
                    GETRequest(Variable.Value, function (txt) {
                        ele.innerHTML = txt.responseText;
                    });
            }
        );
}*/

function HashVariableCallBack(val, ind) {
    var sp = val.split('=');//head=Folder1/Folder2/index
    var Variable = {
        ID: sp[0],//head
        Path: sp[1],//Folder1/Folder2/index
        Folder: sp[1].slice(0, sp[1].lastIndexOf(sp[1].split('/')[sp[1].split('/').length - 1])-1),//Folder1/Folder2
        Value: sp[1].split('/')[sp[1].split('/').length - 1] //index
    }
    var eleList = document.querySelectorAll('.' + Variable.ID);
    if (eleList.length > 0)
    {
        eleList.forEach
            (
            function (ele, index)
            {
                LoadToObj(Variable.Path, ele.querySelector('.content'), commentBox(ele));//Load系列函數並非內建
                
                //GETRequestToObjHtml(Variable.Path, ele.querySelector('.content'));
            }
            );
    }
    else
    {
        var window;
        if (isset(jQuery))
            window = createFullAeroWindowJQLoad(Variable.Path, Variable.ID);//Load系列函數並非內建
        else
            window = createFullAeroWindowA(Variable.Path, Variable.ID);//Load系列函數並非內建
        window.classList.add(Variable.ID);
        window.classList.add(Variable.Path);

    }
    
   /* if (document.getElementById(Variable.ID).className != Variable.Value + " " + Variable.ID) {
      	$("#" + Variable.ID).html('<div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div>	</div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>');
        $("#" + Variable.ID).load("pages/" +Variable.Path + "." + Variable.ID,"",function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
   		   {		   
		   appendFixedObject(Variable);
		   }
 		   if(statusTxt=="error")
    	  {alert("Error: "+xhr.status+": "+xhr.statusText);}});
        document.getElementById(Variable.ID).className = Variable.Value + " " + Variable.ID;
    }*/
}