// async function loadEmployees() {
//     let res = await fetch("/api/employees");
//     let data = await res.json();

//     let container = document.getElementById("employees");

//     data.forEach(emp => {
//         let div = document.createElement("div");
//         div.className = "card";

//         div.innerHTML = `
//             <img src="${emp.image}" alt="${emp.name}">
//             <h3>${emp.name}</h3>
//             <p><b>Designation:</b> ${emp.designation}</p>
//             <p><b>Department:</b> ${emp.department}</p>
//             <p><b>Salary:</b> ₹${emp.salary}</p>
//         `;

//         container.appendChild(div);
//     });
// }


function loadEmployees() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/employees", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);

            let container = document.getElementById("employees");

            data.forEach(emp => {
                let div = document.createElement("div");
                div.className = "card";

                div.innerHTML = `
                    <img src="${emp.image}" alt="${emp.name}">
                    <h3>${emp.name}</h3>
                    <p><b>Designation:</b> ${emp.designation}</p>
                    <p><b>Department:</b> ${emp.department}</p>
                    <p><b>Salary:</b> ₹${emp.salary}</p>
                `;

                container.appendChild(div);
            })
        }
    }

    xhr.send()
}
loadEmployees();