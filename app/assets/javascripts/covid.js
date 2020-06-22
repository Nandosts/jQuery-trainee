function sort_contries_by_cases (raw_data) {
    let len = raw_data.length,
        result = []
    for (let i = 0; i < len; i++){
        let value = raw_data[i].confirmed
        let j = 0
        while (j < result.length && result[j].confirmed > value){
            j++
        }
        result.splice(j, 0, raw_data[i])
    }
    return result
}

function get_data() {
    return $.ajax(
        {
            url: "https://covid19-brazil-api.now.sh/api/report/v1/countries"
        }
    )
}

function get_country_data(country) {
    return $.ajax(
        {
            url: "https://covid19-brazil-api.now.sh/api/report/v1/" + country
        }
    )
}

function fetch_cases (raw_data) {
    let result = []
    for (let i = 0; i < raw_data.length; i++){
        result.push(raw_data[i].cases)
    }
    return result
}

function fetch_label (raw_data) {
    let result = []
    for (let i = 0; i < raw_data.length; i++){
        result.push(raw_data[i].country)
    }
    return result
}

function fetch_deaths (raw_data) {
    let result = []
    for (let i = 0; i < raw_data.length; i++){
        result.push(raw_data[i].deaths)
    }
    return result
}

function fetch_recovered (raw_data) {
    let result = []
    for (let i = 0; i < raw_data.length; i++){
        result.push(raw_data[i].recovered)
    }
    return result
}

function fetch_country_data (raw_data) {
    return [raw_data.cases, raw_data.deaths, raw_data.recovered]
}

$(document).on('turbolinks:load', async function () {
    let ctx = document.getElementById('myChart').getContext('2d');
    let covid_data = await get_data();
    console.log(covid_data);
    covid_data = covid_data.data
    covid_data = sort_contries_by_cases(covid_data)
    console.log(covid_data)
    covid_data = covid_data.slice(0, 5)
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fetch_label(covid_data),
            datasets: [{
                label: 'Casos covid',
                data: fetch_cases(covid_data),
                backgroundColor: "darkslategray"
            },
                {
                    label: "Mortes",
                    data: fetch_deaths(covid_data),
                    backgroundColor: "black"
                }
                ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }

    });
});