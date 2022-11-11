document.getElementById("panda").addEventListener("click", panda);


var yupoo = false;

chrome.tabs.query({
    active: true,
    currentWindow: true
}, ([currentTab]) => {
    url = currentTab.url;
    if (url.includes('yupoo.com/album')) {
        yupoo = true;

    }
    else {
        yupoo = false;
    }

});



// get all links from the page
function getLinks() {
    var link = [];

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        link.push(links[i].href);
    }


    return link;

}

taobao = "";
wedian = "";

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0].url);
    console.log(tabs[0].id);
    my_tabid = tabs[0].id;

    chrome.scripting.executeScript(
        {
            target: { tabId: my_tabid },
            func: getLinks,
        },
        (results) => {
            liste = results[0].result;
            if (liste.length == 0) {
                alert("No links found");
            }
            for (var i = 0; i < liste.length; i++) {
                if (liste[i].includes("https://item.taobao.com/item.htm")) {
                    if (taobao == "") {
                        taobao = liste[i];
                    }
                }

                if (liste[i].includes(encodeURIComponent("https://weidian.com/item.html"))) {
                    if (wedian == "") {
                        wedian = liste[i];
                    }
                }

            }




        });
});


function panda() {

    if (yupoo == true) {
        if (taobao == "" && wedian == "") {
            alert("No taobao or weidian link found");
        }
        else if (taobao != "" && wedian == "") {

            url_encoded = encodeURIComponent(taobao);
            template = "https://www.pandabuy.com/product?ra=212&url=" + url_encoded + "&utm_source=url&utm_medium=pdb&utm_campaign=normal";
            window.open(template, '_blank');
        }

        else if (taobao == "" && wedian != "") {
            url_encoded = encodeURIComponent(wedian);
            template = "https://www.pandabuy.com/product?ra=212&url=" + url_encoded + "&utm_source=url&utm_medium=pdb&utm_campaign=normal";
            window.open(template, '_blank');
        }
        else if (taobao != "" && wedian != "") {
            url_encoded = encodeURIComponent(taobao);
            template = "https://www.pandabuy.com/product?ra=212&url=" + url_encoded + "&utm_source=url&utm_medium=pdb&utm_campaign=normal";
            window.open(template, '_blank');
        }
        else {
            alert("Error");
        }
    }
}