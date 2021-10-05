// const apiUrl = "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c"
const apiUrI = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
var dropDownList = document.querySelector("#dropDownList");
var dropDownUl = document.querySelector(".dropDownUl");
var triangle = document.querySelector('.dIcon');
var dDis = document.querySelector(".dDis");
var mainH2 = document.querySelector(".main > h2");
var ulList = document.querySelector(".ulList");
var hotUl = document.querySelector(".hotUl");
var changePage = document.querySelector(".changePage");
var mainFooter = document.querySelector(".mainFooter");
var dic = JSON.parse(localStorage.getItem("dicData")) || {};
var selectedSection = document.querySelector('.main > h2');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

window.addEventListener('load', getTravelInfo(),false);

document.body.addEventListener('click', hideList, false);
dropDownList.addEventListener('click', showList, false);
dropDownUl.addEventListener('click', liEvent, false);

hotUl.addEventListener('click', hotChange, false);

changePage.addEventListener('click', switchPage, false);

prev.addEventListener('click', switchPage, false);
next.addEventListener('click', switchPage, false);

function hotChange(e) {
    if (e.target.nodeName == "LI") {
        dDis.textContent = e.target.textContent;
        mainH2.textContent = e.target.textContent;

        createList(e.target.textContent);
    }

}

function createLiDropDown(list) {
    //this is for defining the dropdownlist element
    let listLength = list.length;
    let setionSet = new Set();

    for (let i =0; i < listLength; i++) {
        let candidate = list[i].Zone;

        if (setionSet.has(candidate)){
            continue;
        }

        setionSet.add(candidate);
        var liNode = document.createElement('li');
        liNode.textContent = candidate;
        dropDownUl.appendChild(liNode);
    }
}

function liEvent(e) {
    if (e.target.nodeName == "LI") {
        
        dDis.textContent = e.target.textContent;
        mainH2.textContent = e.target.textContent;
        createList(e.target.textContent);
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


function getTravelInfo() {
    //fetch result and store in localstorage
    fetch(apiUrI)
    .then((res) => {
        const data = res.json();
        return data;
    })
    .then((data) => {
        createLiDropDown(data.result.records);
        localStorage.setItem("listData", JSON.stringify(data.result));
    });
}

function createList(target) {
    let data = JSON.parse(localStorage.getItem("listData")).records;
    let dataLength = data.length;
    let dicSector = [];
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

    ulList.innerHTML = "";

    for (let i =0; i < dataLength; i++) {
        if (target == data[i].Zone) {

            tickitInfo = data[i].Ticketinfo;
            var liNode = document.createElement('li');
            // liNode.classList.add('li-'+i);
            var divRoot = document.createElement('div');
            var divNode = document.createElement('div');
            divNode.style.background = 'url('+data[i].Picture1+')';
            var spNode1 = document.createElement('span');
            var spNode2 = document.createElement('span');
            spNode1.classList.add('sp-1');
            spNode2.classList.add('sp-2');
            spNode1.textContent = data[i].Name;
            spNode2.textContent = target;
            divNode.appendChild(spNode1);
            divNode.appendChild(spNode2);
            liNode.appendChild(divNode);

            //next part
            divRoot = document.createElement('div');
            divRoot.classList.add('content');

            divRoot.appendChild(addInner(data[i].Opentime, data[i].Add, data[i].Tel));

            divNode = document.createElement('div');  
            var imgNode = document.createElement('img'); 
            imgNode.setAttribute('src', "images/icons_tag.png");
            var pNode = document.createElement('p');
            pNode.textContent = tickitInfo;
            divNode.appendChild(imgNode);
            divNode.appendChild(pNode);

            divRoot.appendChild(divNode);
            liNode.appendChild(divRoot);

            dicSector.push(liNode.innerHTML);
        }  
    }


    dic[target] = dicSector;
    
    localStorage.setItem("dicData", JSON.stringify(dic));
    renderMainFooter(dic[target].length);
    renderPage(target, 1);
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
    // console.log(length);

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

    let targetArr = JSON.parse(localStorage.getItem("dicData"))[target];
    
    for(let i = (count - 1) * 6; i<targetArr.length && i < count * 6;i++){
        let liNode = document.createElement('li');
        liNode.innerHTML = targetArr[i];
        ulList.appendChild(liNode);
    }
}

function switchPage(e) {

    if (e.target.nodeName == "LI") {
        let target = selectedSection.textContent;
        renderPage(target, e.target.textContent);
        changeFocus(e.target.dataset.index);
        changePrevNext(e.target.dataset.index);

    } else if (e.target.nodeName == "SPAN") {
        
        let arr = changePage.getElementsByTagName('li');
        let target = selectedSection.textContent;

        if (arr.length == 1) {return}

        let nIdx = findFocusClassIndex(arr);
 
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