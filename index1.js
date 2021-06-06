document.addEventListener('readystatechange', function (ev) {
    if (document.readyState == 'interactive') {
        setupCanvas();
        setupNews();
    }
})
function startName() {
    let list = document.getElementById('logo').classList;
    list.add('logoSmall');
    list.remove('logoLarge');
    list.remove('center');
    document.getElementById('cont').style = "margin-bottom: 0px;"
}
function setupCanvas() {
    new document.mainCanvas().draw();
}
function setupNews() {
    doReq('POST', 'headArt-List', `0-10`, function (res) {
        let artStripCont = document.createElement('div');
        artStripCont.id = 'artStripCont';
        artStripCont.classList.add('verti');
        let jsRes = JSON.parse(res);
        for (let i = 0; i < jsRes.data.length; i++) {
            let artCont = document.createElement("div");
            artCont.classList.add('artStrip');
            artCont.classList.add('verti');
            let head = document.createElement('div');
            head.classList.add('artStripHead');
            head.innerText = jsRes.data[i].head;
            artCont.appendChild(head);
            artStripCont.appendChild(artCont);
        }
        startName();
        document.getElementById('cont').appendChild(artStripCont);
    })
}
function doReq(type = '', link = '', body = '', callback = function (res = '') { }) {
    /*let httpReq = new XMLHttpRequest();
      httpReq.open(type,link);
      httpReq.addEventListener('readystatechange',function (event) {
          if(httpReq.readyState == 4 && httpReq.status == 200){
              callback(httpReq.responseText);
          }
      })
      httpReq.send(body);*/
    setTimeout(() => {
        callback(JSON.stringify({
            data: [{ head: "Hello World", body: "mf" },
            { head: "hello", body: "mf" },
            { head: "hello", body: "mf" }]
        }));
    }, 2000);
}