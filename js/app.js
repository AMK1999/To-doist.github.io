

//select the elements:
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names:
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variable:
let LIST, id;

//get items from local storage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else{
    //if data isent empty
    LIST = [];
    id = 0;
}

//load the items to the user interface:
function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage:
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});



//Showing todays date:
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us",options);

//adding to do function
function addToDo(toDo,id,done,trash){

    if(trash){
        return toDo;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="0"></i>
                        <p class="text" ${LINE} style="margin-top: 6px;">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="0"></i>
                    </li>
                     `;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
//addToDo("drink coffee");

//adding items to the list using enter key
document.addEventListener("keyup",function(even){
    if (even.keyCode == 13) {

        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            //add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//compleat to do:
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}
//remove todo:
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click",function(event){
    const element = event.target;//return the clicked element inside the list
    const elementjob = element.attributes.job.value;//complete or delete

    if (elementjob == "complete") {
        completeToDo(element);
    }
    else if(elementjob == "delete"){
        removeToDo(element);
    }
    //add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));


})