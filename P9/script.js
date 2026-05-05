// function getWeather() {
//     let city = document.getElementById("city").value.trim().toLowerCase();
//     console.log(city);

//     if (city === "") {
//         alert("please enter city")
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "data.json", true);

//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             let data = JSON.parse(xhr.responseText);
//             console.log("data", data);
//             let output = document.getElementById("output");

//             if (data[city]) {
//                 let weather = data[city];

//                 output.innerHTML = `
//                     <h3>${city}</h3>
//                     <p>Temperature: ${weather.temperature}</p>
//                     <p>Humidity: ${weather.humidity}</p>
//                     <p>Condition: ${weather.condition}</p>
//                 `;
//             } else {
//                 output.innerHTML = `<p style="color:red;">City not found</p>`;
//             }
//         }
//     }

//     xhr.send()
// }


function getWeather() {
    let city = document.getElementById("city").value.trim().toLowerCase();

    if (city === "") alert("please enter city")

    fetch("data.json")
        .then(function (response) {
            console.log("res : ",response)
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let output = document.getElementById("output");

            if (data[city]) {
                let weather = data[city];

                output.innerHTML = `
                                <h3>${city}</h3>
                                <p>Temperature: ${weather.temperature}</p>
                                <p>Humidity: ${weather.humidity}</p>
                                <p>Condition: ${weather.condition}</p>
                            `;
            } else {
                output.innerHTML = `<p style="color:red;">City not found</p>`;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}