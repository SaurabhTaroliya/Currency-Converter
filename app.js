
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
let dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")



// for (let code in countryList) {
//     console.log(code, countryList[code])
// }

for (const select of dropdowns) {
    for (let code in countryList) {
        // let select = document.querySelector(".From")
        let newOption = document.createElement("option")
        newOption.innerText = code
        newOption.value = code
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }else if (select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)        
    }
    
    select.addEventListener("change", (event) =>{
        updateFlag(event.target)
    })
}

const updateFlag = (element) =>{
    // console.log(element)
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (event) => {
    event.preventDefault() // Now page is not refresh automatic after click on button
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    // console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr, toCurr);
    let response = await fetch(BASE_URL);
    let data = await response.json()
    console.log(data);
    // console.log(data.usd);
    // console.log(toCurr);
    
    // console.log(data.usd[toCurr]);
    let rate = Number(data.usd[toCurr.value.toLowerCase()]) / Number(data.usd[fromCurr.value.toLowerCase()]);
    console.log(typeof rate, typeof amtVal);
    let finalMessage = Number(amtVal) * rate
    msg.innerText = finalMessage;
    
    
})