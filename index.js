// CODE BỞI TRUVN.COM
const domain = "127.0.0.1:5500";

const GET_E_bai = document.querySelector("#Main .context h3");
const GET_E_sub = document.querySelector("#Main .context h2");
const GET_E_context = document.querySelector("#Main .context h1");
const GET_E_baiStart = document.querySelector("#baiStart");
const GET_E_baiEnd = document.querySelector("#baiEnd");
const GET_E_pause = document.querySelector("#Main .btnEvent .pause");
const GET_E_repeat = document.querySelector("#Main .btnEvent .repeat");
const GET_E_counter = document.querySelector("#Main .counter");

const APP = {
    baiStar : 1,
    baiEnd : 1,

    view: function (
        bai = "すみません",
        katarana = "すみません",
        sub = "すみません"
    ) {
        GET_E_context.textContent = katarana;
        GET_E_sub.textContent = sub;
        GET_E_bai.textContent = bai;

        GET_E_context.addEventListener("click", () => {
            GET_E_sub.style = "opacity: 1;";
            GET_E_bai.style = "opacity: 1;";
        });
    },

    start: function () {
        let update = 0;

        bottom();
        GET_E_pause.addEventListener("click", () => {
            getJSON(domain, "list", this.baiStar , this.baiEnd);
            GET_E_sub.style = "opacity: 0;";
            GET_E_bai.style = "opacity: 0;";
            update++;
            GET_E_counter.innerHTML = update;
        });


        GET_E_repeat.addEventListener("click" , ()=>{
            let GET_V_GET_E_baiStart = GET_E_baiStart.value * 1
            let GET_V_GET_E_baiEnd = GET_E_baiEnd.value * 1

            this.baiStar = GET_V_GET_E_baiStart
            this.baiEnd = GET_V_GET_E_baiEnd
        })
    },
};
APP.start();

async function getJSON(url, part, baiStart, baiEnd) {
    let link = `http://${url}/${part}.json`;

    let res = await fetch(link);
    let data = await res.json();

    let rand = Math.floor(Math.random() * (baiEnd + 1 - baiStart)) + baiStart;

    let randContex = Math.floor(Math.random() * data[rand - 1].data.length);

    let katarana = data[rand - 1].data[randContex].katarana;
    let sub = data[rand - 1].data[randContex].vietsub;
    let bai = data[rand - 1].bai;

    APP.view(bai, katarana, sub);
}
function bottom() {
    for (let index = 1; index <= 25; index++) {
        let html = `<option value="${index}">Bài ${index}</option>`;
        GET_E_baiStart.innerHTML += html;
        GET_E_baiEnd.innerHTML += html;
    }
}


