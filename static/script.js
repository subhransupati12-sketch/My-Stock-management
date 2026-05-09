// Expense Tracker JavaScript

// Form validation for Add Expense
function validateExpense() {

    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;

    if(amount === "" || amount <= 0){
        alert("Please enter a valid expense amount");
        return false;
    }

    if(description === ""){
        alert("Please enter description");
        return false;
    }

    return true;
}


// Confirm delete expense
function confirmDelete(){
    return confirm("Are you sure you want to delete this expense?");
}


// Calculate total expenses dynamically
function calculateTotal(){

    let table = document.getElementById("expenseTable");
    let total = 0;

    for(let i=1; i<table.rows.length; i++){

        let amount = parseFloat(table.rows[i].cells[1].innerHTML);

        total += amount;
    }

    document.getElementById("totalExpense").innerHTML = total;
}


// Run when page loads
window.onload = function(){

    if(document.getElementById("expenseTable")){
        calculateTotal();
    }
let ctx = document.getElementById('expenseChart').getContext('2d');

let chartData = {
    day: [200, 150, 100],
    month: [2000, 1500, 900],
    year: [24000, 18000, 12000]
};

let labels = ["Food", "Travel", "Other"];

let expenseChart = new Chart(ctx, {

    type: 'bar',

    data: {

        labels: labels,

        datasets: [{
            label: 'Expenses',
            data: chartData.day,
            backgroundColor: [
                '#3b82f6',
                '#22c55e',
                '#f59e0b'
            ]
        }]

    }

});

document.getElementById("chartType").addEventListener("change", function(){

    let value = this.value;

    expenseChart.data.datasets[0].data = chartData[value];

    expenseChart.update();

});
function showGraph(){

document.getElementById("graphSection").style.display = "block";

createChart();

}

function createChart(){

let ctx = document.getElementById('expenseChart').getContext('2d');

new Chart(ctx, {

type: 'bar',

data: {

labels: ['Food','Travel','Other'],

datasets: [{

label: 'Expense Summary',

data: [500,300,200],

backgroundColor: [

'#3b82f6',
'#22c55e',
'#f59e0b'

]

}]

}

});

}

};
let chart;

function createChart(data){

    let ctx = document.getElementById("expenseChart").getContext("2d");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Food", "Travel", "Other"],

            datasets: [{
                label: "Expense Amount",

                data: data,

                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#f59e0b"
                ]

            }]

        },

        options: {
            responsive:true,
            plugins:{
                legend:{
                    labels:{
                        color:"white"
                    }
                }
            },

            scales:{
                x:{
                    ticks:{ color:"white"}
                },
                y:{
                    ticks:{ color:"white"}
                }
            }
        }

    });

}

function updateChart(){

    let value = document.getElementById("timeFilter").value;

    let data;

    if(value === "day"){

        data = [200,150,100];

    }

    if(value === "month"){

        data = [2500,1800,900];

    }

    if(value === "year"){

        data = [30000,20000,12000];

    }

    createChart(data);

}
function showAnalytics(){
    window.location.href="/analytics";
}

window.onload = function(){
    createChart([200,150,100]);
}