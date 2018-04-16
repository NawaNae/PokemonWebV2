/*
function setCookieAeroColor() {
    setCookie("AeroColor", r + "," + g + "," + b + "," + a, 100);
}
function getCookieAeroColor() {
    if ((colorStr = getCookie('AeroColor')) != '') {
        colorStr=unescape(colorStr);
        colorStr = colorStr.split(',');
        r = parseInt(colorStr[0]);
        g = parseInt(colorStr[1]);
        b = parseInt(colorStr[2]);
        a = parseFloat(colorStr[3]);
        setAeroCssColor(r, g, b, a);
    }
}
var r = 0, g = 0, b = 0, a = 0;
function loading()
{
    if (location.href == "http://www.cc.ntut.edu.tw/~t105590029/") { location.href += "#main=pages/index.content"; }
    //BackgroundRandom();
    var colorStr;
    getCookieAeroColor();
}


loading();

$(document).ready(function (e)
{
    
  //  $('body').css('background-image', 'url(' + BackGruondNow.URL + BackGruondNow.Name + '.' + BackGruondNow.Filetype + ')');
    var menu = createFullAeroWindowS('', '', 'Images/tanko.png', '000', 0, 0);
    menu.classList.add('menu');
    POSTRequest('php/menu.php', '', function (txt) { menu.querySelector('.content').innerHTML = txt.response; })
    menu.style.bottom = getStyle(document.querySelector('.workbar'),'height');
    menu.style.top = '';
    GetAncenstorAeroWindowCtrl(menu).min();

    menu.querySelector('.dragbar>img').style.display = 'none';
    getVariable();
    $(document).on('click', 'a', function (e) {
        if ($(this).attr("data-hash") != null) {
            e.preventDefault();
            window.location.hash = $(this).attr("data-hash");
        }
    });
    $(document).on('click', '.menu .icon.file', function (e) {
        if ($(this).attr("data-hash") != null) {
            e.preventDefault();
            window.location.hash = $(this).attr("data-hash");
        }
    });
    $(document).on('click', '.google.commentButton', function (e) {//G+按鈕事件
     e.preventDefault();
     commentBox(GetAncenstorAeroWindow(this));
     this.remove();
    });
});*/



/**
 * @see 本次重點
 * onhashchange事件handle 主要參考event handler
 * 可以用addeventlistener或JQ所提供的方法增加handler
 * 也可以直接用以下方式(但可能會造成其他原本的handler被detach)
 */
window.onhashchange = function () {
    if (location.hash) {
        getVariable();
    } else {
    }
}
/**
 * @see 本次重點
 */
/*function setAeroCssColor(R, G, B, A) {
    var styleObj;
    if (null == (styleObj = document.head.querySelector('.colorCss'))) {
        styleObj = document.createElement('style');
        styleObj.classList.add('colorCss');
        document.head.appendChild(styleObj);
    }
    styleObj.innerHTML = '.AeroGlass,.WorkBar{background-color:rgba(' + R + ',' + G + ',' + B + ',' + A + ');}'
}
function setColor(R, G, B, A, inputObj) {
    var colorSel;
    if (typeof inputObj != 'undefined')
        colorSel = inputObj.parentNode;
    else
        colorSel = document.querySelector('.colorSelect');
    colorSel.querySelector('.color').style.backgroundColor = 'rgba(' + R + ', ' + G + ', ' + B + ', ' + A + ')';
}*/