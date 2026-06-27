function loadDataset() {

    // Dataset directly inside JS

    const data = [

        {
            race: "African-American",
            sex: "Male",
            age: 24,
            priors_count: 5,
            two_year_recid: 1
        },

        {
            race: "African-American",
            sex: "Female",
            age: 29,
            priors_count: 2,
            two_year_recid: 0

        },

        {
            race: "African-American",
            sex: "Male",
            age: 35,
            priors_count: 6,
            two_year_recid: 1
        },

        {
            race: "Caucasian",
            sex: "Male",
            age: 30,
            priors_count: 1,
            two_year_recid: 0
        },

        {
            race: "Caucasian",
            sex: "Female",
            age: 27,
            priors_count: 0,
            two_year_recid: 0
        },

        {
            race: "Caucasian",
            sex: "Male",
            age: 40,
            priors_count: 2,
            two_year_recid: 1
        }
    ];

    analyzeData(data);
}

function analyzeData(data) {

    let african = 0;
    let caucasian = 0;

    let africanRecid = 0;
    let caucasianRecid = 0;

    let male = 0;
    let female = 0;

    data.forEach(row => {

        // Race Analysis

        if(row.race === "African-American") {

            african++;

            if(row.two_year_recid == 1)
                africanRecid++;
        }

        if(row.race === "Caucasian") {

            caucasian++;

            if(row.two_year_recid == 1)
                caucasianRecid++;
        }

        // Gender Analysis

        if(row.sex === "Male")
            male++;

        if(row.sex === "Female")
            female++;
    });

    // Calculate Rates

    const africanRate =
        ((africanRecid / african) * 100).toFixed(2);

    const caucasianRate =
        ((caucasianRecid / caucasian) * 100).toFixed(2);

    // Bias Score

    const biasScore =
        Math.abs(africanRate - caucasianRate).toFixed(2);

    // Risk Level

    let risk = "LOW";
    let fairness = "FAIR";

    if(biasScore > 20){

        risk = "HIGH";
        fairness = "BIASED";
    }

    else if(biasScore > 10){

        risk = "MEDIUM";
        fairness = "MODERATE";
    }

    // Update Dashboard

    document.getElementById("records").innerHTML =
        data.length;

    document.getElementById("biasScore").innerHTML =
        biasScore + "%";

    document.getElementById("riskLevel").innerHTML =
        risk;

    document.getElementById("fairness").innerHTML =
        fairness;

    // Recommendations

    document.getElementById("recommendations").innerHTML = `

        <li>Dataset analyzed successfully.</li>

        <li>Bias detection completed.</li>

        <li>Fairness metrics generated.</li>

    `;

    // Charts

    createRaceChart(
        africanRate,
        caucasianRate
    );

    createGenderChart(
        male,
        female
    );
}

function createRaceChart(aRate, cRate){

    const ctx =
        document.getElementById("raceChart");

    new Chart(ctx, {

        type: 'bar',

        data: {

            labels: [
                'African-American',
                'Caucasian'
            ],

            datasets: [{

                label: 'Recidivism Rate',

                data: [
                    aRate,
                    cRate
                ],

                backgroundColor: [
                    '#38bdf8',
                    '#818cf8'
                ]
            }]
        }
    });
}

function createGenderChart(male, female){

    const ctx =
        document.getElementById("genderChart");

    new Chart(ctx, {

        type: 'doughnut',

        data: {

            labels: [
                'Male',
                'Female'
            ],

            datasets: [{

                data: [
                    male,
                    female
                ],

                backgroundColor: [
                    '#06b6d4',
                    '#8b5cf6'
                ]
            }]
        }
    });
}