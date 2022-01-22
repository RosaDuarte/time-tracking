const selection = document.querySelectorAll(".container-buttons>a");
const titles = document.querySelectorAll(".content-left>h4");
const current = document.querySelectorAll(".current");
const previous = document.querySelectorAll(".previous");

selection.forEach((selections) =>{
    selections.addEventListener("click", ()=>{
        selection.forEach((selections)=> selections.classList.remove("active"));
        selections.classList.add("active");

        fetch("data.json")
        .then(res => res.json())
        .then((data, index)=>{
            for (index = 0; index < data.length; index++){
                titles.forEach(title =>{
                    if(title.textContent === data[index].title){
                        for(let i=0, j=0; i<current.length, j<previous.length; i++, j++){
                            if(index == i){
                                let prevTimeText;
                                (selections.textContent === "Daily")?prevTimeText = "Day":
                                (selections.textContent === "Weekly")?prevTimeText = "Week":
                                prevTimeText = "Month"

                                current[i].textContent = `${data[index].timeframes[selections.textContent.toLocaleLowerCase()].current}hrs`;
                                previous[i].textContent = `Last ${prevTimeText} - ${data[index].timeframes[selections.textContent.toLocaleLowerCase()].previous}hrs`
                            }
                        }
                    }
                })
            }
        })
    })
})