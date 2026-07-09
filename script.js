const startBtn = document.getElementById("StartButton");
const graph = document.getElementById("Graph");

let values = [];

//delay before starting arrangement

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));

}

// calling API values

async function fetchValues() {

    const response = await fetch(
        "https://randomuser.me/api/?results=10&inc=dob"
    );

    const data = await response.json();

    values = data.results.map(user => user.dob.age);

    console.log("API Values:", values);
}

function createGraph() {
    graph.innerHTML = "";

    values.forEach(value => {
        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value * 4 + "px";

        bar.innerText = value;

        graph.appendChild(bar);
    })
}

// bubble sort logic

async function bubbleSort() {

    const bars = document.getElementsByClassName("bar");


    for (let i = 0; i < values.length - 1; i++) {

        for (let j = 0; j < values.length - i - 1; j++) {


            // Highlighting compared bars

            bars[j].classList.add("compare");

            bars[j + 1].classList.add("compare");


            await sleep(700);


            // Compare values

            if (values[j] > values[j + 1]) {


                // Swaping values

                let temp = values[j];

                values[j] = values[j + 1];

                values[j + 1] = temp;


                // Swaping bar heights

                let tempHeight = bars[j].style.height;

                bars[j].style.height =
                    bars[j + 1].style.height;

                bars[j + 1].style.height =
                    tempHeight;


                // Swaping  displayed numbers

                let tempText = bars[j].innerText;

                bars[j].innerText =
                    bars[j + 1].innerText;

                bars[j + 1].innerText =
                    tempText;


                await sleep(500);
            }


            // Remove comparison color

            bars[j].classList.remove("compare");

            bars[j + 1].classList.remove("compare");

        }


        // Marks sorted bar

        bars[values.length - i - 1]
            .classList.add("sorted");
    }


    bars[0].classList.add("sorted");
}
// calling function before the graph event

async function startProgram() {

    startBtn.disabled = true;

    await fetchValues();
    
    createGraph();

    await sleep(2000);

    await bubbleSort();

    startBtn.disabled = false;
}
// checking the action from user


startBtn.addEventListener("click", startProgram);
