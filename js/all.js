const apiUrI = "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c"
// const apiUrI = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
var dropDownList = document.querySelector("#dropDownList");
var dropDownUl = document.querySelector(".dropDownUl");
var triangle = document.querySelector('.dIcon');
var dDis = document.querySelector(".dDis");
var mainH2 = document.querySelector(".main > h2");
var ulList = document.querySelector(".ulList");
var hotUl = document.querySelector(".hotUl");
var changePage = document.querySelector(".changePage");
var mainFooter = document.querySelector(".mainFooter");
var dic = JSON.parse(localStorage.getItem("listData")) || {};
var selectedSection = document.querySelector('.main > h2');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

window.addEventListener('load', getInfoAndRenderDropDownList(), false);

document.body.addEventListener('click', hideList, false);
dropDownList.addEventListener('click', showList, false);
dropDownUl.addEventListener('click', liEvent, false);

hotUl.addEventListener('click', hotChange, false);

changePage.addEventListener('click', switchPage, false);

prev.addEventListener('click', switchPage, false);
next.addEventListener('click', switchPage, false);

function hotChange(e) {
    if (e.target.nodeName == "LI") {
        let dic = JSON.parse(localStorage.getItem("listData"));
        dDis.textContent = e.target.textContent;
        mainH2.textContent = e.target.textContent;

        renderPage(e.target.textContent, 1);
        // render changepage footer
        renderMainFooter(dic[e.target.textContent].length);
    }

}

function liEvent(e) {
    if (e.target.nodeName == "LI") {
        let dic = JSON.parse(localStorage.getItem("listData"));
        dDis.textContent = e.target.textContent;
        mainH2.textContent = e.target.textContent;

        renderPage(e.target.textContent, 1);
        // render changepage footer
        renderMainFooter(dic[e.target.textContent].length);
        dropDownUl.classList.remove("opened");
    }
}

function showList(e) {
    e.stopPropagation();

    if(dropDownUl.classList.contains("opened")){
        triangle.style.transform = "rotate(0deg)"
        dropDownUl.style.display = "";
        dropDownUl.classList.remove("opened");
        return;
    }

    dropDownUl.classList.add('opened');
    triangle.style.transform = "rotate(180deg)"
    dropDownUl.style.display = "block";

}

function hideList(e) {
    triangle.style.transform = "rotate(0deg)"
    dropDownUl.style.display = "";

}

function getTravelInfo(){
    //fetch result and store in localstorage
    return fetch(apiUrI)
    .then((res) => {
        const data = res.json();
        return data;
    })
    .then((data) => {       
        createListData(data.data.XML_Head.Infos.Info);
    });
};

async function getInfoAndRenderDropDownList() {
    const ret1 = await getTravelInfo();
    const ret2 = createLiDropDown();
}

function createListData(records) {
    let dicData = {};
    
    let re = new RegExp('..區');

    for (let record of records) {
        let zone = re.exec(record.Add)[0]

        if (zone in dicData) {
            dicData[zone].push(record);
        } else{
            dicData[zone] = [record];
        }
    }

    localStorage.setItem("listData", JSON.stringify(dicData));
}

function createLiDropDown() {
    //this is for defining the dropdownlist element

    let dicData = JSON.parse(localStorage.getItem("listData"));
    let list = Object.keys(dicData);
    let listLength = list.length;

    for (let i =0; i < listLength; i++) {

        var liNode = document.createElement('li');
        liNode.textContent = list[i];
        dropDownUl.appendChild(liNode);
    }
}

function createNode(data, target) {

    const imgArr = ["images/icons_clock.png","images/icons_pin.png","images/icons_phone.png"]

    function addInner(time, addr, tel) {
        var valueArr = [time, addr, tel]
        var divNode11 = document.createElement('div');

        for (var i =0; i<3; i++){
            var divNode = document.createElement('div');  
            var imgNode = document.createElement('img'); 
            imgNode.setAttribute('src', imgArr[i]);
            if(i==0){
                imgNode.classList.add('imgFix');
            }
            var pNode = document.createElement('p'); 
            pNode.textContent = valueArr[i];
            divNode.appendChild(imgNode);
            divNode.appendChild(pNode);
            divNode11.appendChild(divNode);
        }
        
        return divNode11;
    }

    // 票價資訊
    tickitInfo = data.Ticketinfo;

    var liNode = document.createElement('li');
    // liNode.classList.add('li-'+i);
    var divRoot = document.createElement('div');
    var divNode = document.createElement('div');
    divNode.style.background = 'url('+data.Picture1+')';
    var spNode1 = document.createElement('span');
    var spNode2 = document.createElement('span');
    spNode1.classList.add('sp-1');
    spNode2.classList.add('sp-2');

    // 景點名稱
    spNode1.textContent = data.Name;

    spNode2.textContent = target;
    divNode.appendChild(spNode1);
    divNode.appendChild(spNode2);
    liNode.appendChild(divNode);

    //next part
    divRoot = document.createElement('div');
    divRoot.classList.add('content');

    // create three divs  => 開放時間, 地址, 電話
    divRoot.appendChild(addInner(data.Opentime, data.Add, data.Tel));

    divNode = document.createElement('div');  
    var imgNode = document.createElement('img'); 
    imgNode.setAttribute('src', "images/icons_tag.png");
    var pNode = document.createElement('p');
    pNode.textContent = tickitInfo;
    divNode.appendChild(imgNode);
    divNode.appendChild(pNode);

    divRoot.appendChild(divNode);
    liNode.appendChild(divRoot);

    return liNode;
    
}

function renderMainFooter(length) {

    str = '';

    for (var i = 0; i < length / 6; i++) {
        str += '<li data-index='+ i +'>'+ (i+1) +'</li>';
    }

    mainFooter.style.display = "flex";
    changePage.innerHTML = str;
    
    changeFocus(0);
    changePrevNext(0);
}

function changeFocus(index) {
    let length = changePage.getElementsByTagName('li').length;

    for (let i = 0; i < length; i++){

        var liNode = document.querySelector(`.changePage > li:nth-child(${parseInt(i)+1})`)
 
        if(i == index){
            liNode.classList.add('focus');
        }else{
            liNode.classList.remove('focus');
        }
    }
}

function changePrevNext(index) {
    let length = changePage.getElementsByTagName('li').length;

    if(length == 0){
        prev.style.display = 'none';
        next.style.display = 'none';
        
    } else {
        prev.style.display = 'block';
        next.style.display = 'block';
    }

    if(length == 1){
        prev.classList.add('cantSelect');
        next.classList.add('cantSelect');
        return
    }

    if (index == 0) {
        prev.classList.add('cantSelect');
        next.classList.remove('cantSelect');
    } else if (index == length-1) {
        prev.classList.remove('cantSelect');
        next.classList.add('cantSelect');
    }
}

function renderPage(target, count) {

    ulList.innerHTML = "";

    let targetArr = JSON.parse(localStorage.getItem("listData"))[target];
    // console.log(targetArr);
    for(let i = (count - 1) * 6; i < targetArr.length && i < count * 6;i++){
        let liNode = createNode(targetArr[i], target);
        ulList.appendChild(liNode);
    }
}

function switchPage(e) {

    let arr = changePage.getElementsByTagName('li');
    let nIdx = findFocusClassIndex(arr);
    let target = selectedSection.textContent;


    if (e.target.nodeName == "LI") {

        if (parseInt(nIdx)+1 == e.target.textContent)  {return}
        
        renderPage(target, e.target.textContent);
        changeFocus(e.target.dataset.index);
        changePrevNext(e.target.dataset.index);

    } else if (e.target.nodeName == "SPAN") {

        if (arr.length == 1) {return}
 
        let nNode = document.querySelector(`.changePage > li:nth-child(${parseInt(nIdx)+1})`);
        
        if (e.target.textContent == ' < prev' && nIdx != 0){
            let nextNode = document.querySelector(`.changePage > li:nth-child(${parseInt(nIdx)})`);
            nNode.classList.remove('focus');
            nextNode.classList.add('focus');
            renderPage(target, parseInt(nIdx));
        } else if (e.target.textContent == 'next > ' && nIdx != arr.length - 1) {
            let nextNode = document.querySelector(`.changePage > li:nth-child(${parseInt(nIdx)+2})`);
            nNode.classList.remove('focus');
            nextNode.classList.add('focus');
            renderPage(target, parseInt(nIdx)+2);
        }

        nIdx = findFocusClassIndex(arr);

        if (nIdx == 0) {
            prev.classList.add('cantSelect');
            next.classList.remove('cantSelect');
        } else if (nIdx == arr.length - 1) {
            prev.classList.remove('cantSelect');
            next.classList.add('cantSelect');
        } else {
            prev.classList.remove('cantSelect');
            next.classList.remove('cantSelect');
        }
    }
}

function findFocusClassIndex(arr) {

    let nIdx;

    for (let i =0; i < arr.length; i++) {
        if(arr[i].classList.contains('focus')) {
            nIdx = arr[i].dataset.index;
            return nIdx;
        }
    }
}

const resizeObserver = new ResizeObserver(entries => {

    for (let entry of entries) {
        
        let liNodes = document.querySelectorAll('.content > div:nth-child(1) > div:nth-child(3) > p');
        let divNodes = document.querySelectorAll('.content > div:nth-child(2)');

        for (let i=0; i< liNodes.length; i++) {

            divNodes[i].style.top = liNodes[i].offsetTop+'px';
        }

    }
  
    console.log('Size changed');
  });
  
  resizeObserver.observe(ulList);