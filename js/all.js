const apiUrl = "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c"
var dropDownList = document.querySelector("#dropDownList");
var data = "";
var dropDownUl = document.querySelector(".dropDownUl");
var sectorArr = [
    "前金區",
    "新興區",
    "鹽埕區",
    "左營區",
    "楠梓區",
    "鼓山區",
    "旗津區",
    "苓雅區",
    "三民區",
    "前鎮區",
    "小港區",
    "鳳山區",
    "鳥松區",
    "大社區",
    "仁武區",
    "大樹區",
    "岡山區",
    "燕巢區",
    "梓官區",
    "永安區",
    "彌陀區",
    "橋頭區",
    "田寮區",
    "茄萣區",
    "阿蓮區",
    "路竹區",
    "湖內區",
    "那瑪夏區",
    "桃源區",
    "茂林區",
    "六龜區",
    "美濃區",
    "旗山區",
    "甲仙區",
    "內門區",
    "杉林區",
    "林園區",
    "大寮區",

]
for (var i =0; i< sectorArr.length; i++) {
    var liNode = document.createElement('li');
    liNode.textContent = sectorArr[i];
    dropDownUl.appendChild(liNode);
}
// var btn = document.querySelector(".result-btn");
// var height = document.querySelector("#height");
// var weight = document.querySelector("#weight");
// var ulNode = document.querySelector(".records");

// btn.addEventListener('click', addData, false);
// height.addEventListener('keydown', enterPress, false);
// weight.addEventListener('keydown', enterPress, false);
// // var ul = document.querySelector(".list");
// // var data = JSON.parse(localStorage.getItem("listData"));
// // var text = document.querySelector(".text");

// // if(!data){data = []};

// // updateList(data);

dropDownList.addEventListener('click', showList, false);

function showList(params) {
    showOrHide();
    getTravelInfo();
    
}

function showOrHide(){
    console.log("show or hide");
    if (dropDownUl.style.display == ""){
        dropDownUl.style.display = "block";
        
    } else {
        dropDownUl.style.display = "";
    }
    
}

function setData(d){
    data = d.data.XML_Head.Infos.Info;
}

function getTravelInfo() {
    fetch(apiUrl)
    .then((res) => {
        const data = res.json();
        return data;
    })
    .then((data) => {
        setData(data);
    });
}

// // ul.addEventListener('click',deleteData,false);

// // text.addEventListener('keydown',enterPress,false);

// function countBMI(heightValue, weightValue){
//     heightValue /= 100;
//     return Math.round((weightValue / (heightValue * heightValue)) * 100) / 100;
// }

// function createNode(switchClass, heightValue, weightValue, BMIValue, ulLength) {

//     const textMap = {
//         "color-ideal":"理想",
//         "color-light":"過輕",
//         "color-heavy":"過重",
//         "color-light-fat":"輕度肥胖",
//         "color-mod-fat":"中度肥胖",
//         "color-heavy-fat":"重度肥胖",
//     }

//     var liNode = document.createElement("li");
//     liNode.classList.add("dataNum-" + ulLength);
//     var divNode = document.createElement("div");

//     divNode.classList.add("color");
//     divNode.classList.add(switchClass);
//     liNode.appendChild(divNode);

//     divNode = document.createElement("div");
//     divNode.textContent = textMap[switchClass];
//     liNode.appendChild(divNode);

//     divNode = document.createElement("div");
//     span1 = document.createElement("span");
//     span2 = document.createElement("span");
//     span1.classList.add("first");
//     span2.classList.add("second");
//     span1.textContent = "BMI ";
//     span2.textContent = BMIValue;
//     divNode.appendChild(span1);
//     divNode.appendChild(span2);
//     liNode.appendChild(divNode);

//     divNode = document.createElement("div");
//     span1 = document.createElement("span");
//     span2 = document.createElement("span");
//     span1.classList.add("first");
//     span2.classList.add("second");
//     span1.textContent = "Weight ";
//     span2.textContent = heightValue + "cm";
//     divNode.appendChild(span1);
//     divNode.appendChild(span2);
//     liNode.appendChild(divNode);

//     divNode = document.createElement("div");
//     span1 = document.createElement("span");
//     span2 = document.createElement("span");
//     span1.classList.add("first");
//     span2.classList.add("second");
//     span1.textContent = "Height ";
//     span2.textContent = weightValue + "kg";
//     divNode.appendChild(span1);
//     divNode.appendChild(span2);
//     liNode.appendChild(divNode);

//     divNode = document.createElement("div");
//     divNode.textContent = getDate();
//     divNode.classList.add("first");
//     divNode.classList.add("date");
//     liNode.appendChild(divNode);

//     return liNode;
// }

// function addData(e){

//     let BMIValue = countBMI(height.value, weight.value);
//     let ulLength = ulNode.getElementsByTagName('li').length;

//     if (ulLength >= 6) {
//         var rmNode = document.querySelector(".records > li:nth-child(1)");
//         ulNode.removeChild(rmNode);
//     }

//     if (BMIValue < 18.5) {
//         // 過輕
//         var liNode = createNode("color-light", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);

//     } else if (18.5 <= BMIValue  && BMIValue < 24) {
//         // 理想
//         var liNode = createNode("color-ideal", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);

//     } else if (24 <= BMIValue  && BMIValue < 27) {
//         // 過重
//         var liNode = createNode("color-heavy", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);
//     } else if (27 <= BMIValue  && BMIValue < 30) {
//         // 輕度肥胖
//         var liNode = createNode("color-light-fat", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);
//     } else if (30 <= BMIValue  && BMIValue < 35) {
//         // 中度肥胖
//         var liNode = createNode("color-mod-fat", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);
//     } else{
//         // 重度肥胖
//         var liNode = createNode("color-heavy-fat", height.value, weight.value, BMIValue, ulLength);
//         ulNode.appendChild(liNode);
//     }

//     // data.push(text.value);
//     // localStorage.setItem("listData", JSON.stringify(data));
//     // text.value = "";
//     // updateList(data);
// }

// // function updateList(list){

// //     var str = '';

// //     for (var i = 0; i < list.length; i++) {
// //         str += '<li><a href="#" data-index=' + i + ' />刪除</a> <span>' + list[i] + '</span></li>';
// //     }
// //     ul.innerHTML = str;
// // }

// // function deleteData(e) {
// //     if(e.target.nodeName !== "A"){return}

// //     data.splice(e.target.dataset.index, 1);
// //     localStorage.setItem("listData", JSON.stringify(data));
// //     updateList(data);
// // }

// function enterPress(e){
//     if(e.keyCode == 13){addData()}
// }

// function getDate(e) {
//     let dateLength = dateCol.length;
//     let date = new Date();

//     const formatDate = (date)=>{
//         let day = date.getDate();
//         let month = date.getMonth();
//         let year = date.getFullYear();
        
//         if (month < 9){
//             month = "0" + (month+1);
//         } else {
//             month +=1;
//         }

//         let formatted_date =  month + "-" + day + "-" + year;
//         return formatted_date;
//     }

//     let formatted_date = formatDate(date);

//     return formatted_date;
// }