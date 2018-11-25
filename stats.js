var socket = io.connect('http://localhost:4444');
var table = document.getElementById("statistics");


setInterval(function(){
    
    socket.emit("get stats", []);
}, 3000);


socket.on("send stats",function(statistics){
    //Պատրսատում ենք աղյուսակը
    statistics = JSON.parse(statistics);
    table.innerHTML = "";
    tableHTML = "<tr><td>Ժամանակ</td><td>Քլիքներ</td><td>Կրկնակի Քլիքներ</td><td>Ստեղնաշար</td><td>frameCount</td></tr>";
    for(var st of statistics){
        tableHTML+="<tr>";
        tableHTML+="<td>"+st.timestamp+"</td>";
        tableHTML+="<td>"+st.clicks+"</td>";
        tableHTML+="<td>"+st.dbclicks+"</td>";
        tableHTML+="<td>"+st.keypresses+"</td>";
        tableHTML+="<td>"+st.framecount+"</td>";
        tableHTML+="</tr>";
    }

    table.innerHTML = tableHTML;
    //console.log(statistics);
})