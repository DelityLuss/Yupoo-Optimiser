

var el = document.getElementById("save_pass")
if (el) {
    el.addEventListener("click", getInfo);
}


function getPrice() {
    var title = document.getElementsByClassName("showalbumheader__gallerytitle")[0]

    // get the title of the album
    var title = title.innerText;

    // extract the first number of the title
    var price = title.match(/\d+/)[0];

    return price;
    

}


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0].url);
    console.log(tabs[0].id);
    my_tabid = tabs[0].id;

    chrome.scripting.executeScript(
        {
            target: { tabId: my_tabid },
            func: getPrice,
        },
        (results) => {

            var price = results[0].result;
            console.log(price);
            document.getElementById("url_input").value = price;

        });
});


function getInfo() {
    var yuan = document.getElementById("url_input").value;

    // Check if the input is empty
    if (yuan == "") {
        alert("Le champ est vide");
        return;
    }

    // Check if the input is a integer
    if (isNaN(yuan)) {
        alert("Le champ n'est pas un nombre");
        return;
    }

    var myHeaders = new Headers();
    myHeaders.append("apikey", "SLNXBkFSU6qNg4Yi8tebAvJctKSpJOYd");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=CNY&amount=" + yuan, requestOptions)
        .then(response => response.text())
        .then(result => showResult(result, yuan))
        .catch(error => console.log('error', error));

}


function showResult(result, yuan) {
    var result = JSON.parse(result);
    var euro = result["result"];
    var response = `${yuan} Yuan = <span style="color : tomato">${euro}</span> Euro`;
    document.getElementById("result").innerHTML = response;
}




