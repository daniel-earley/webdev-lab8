// Subject: API Key
// Here is your key: d465a786
// Please append it to all of your API requests,
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d465a786

async function fetchInfo(){
    try {
        const res = await fetch("http://localhost:5000/showtimes");
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function fetchOmdb(id){
    try {
        const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=d465a786&`);
        const data = await res.json();
        // console.log(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}

function handleSubmit(e){
    const form = new FormData(e.target);

    // debugging
    let location = form.get("Locations");
    console.log(location);
    let date = form.get("Date");
    date = date.replaceAll("-","/");
    console.log(date);

    // Clear table
    $("#movies tr").remove();

    // Build movie table
    fetchInfo().then((data) => {
        for (let i = 0; i < data.length; i++) {
            // Create table elements
            let table = document.getElementById("movies");
            let row = document.createElement("tr");
            let title = document.createElement("td");
            let movieTitle = document.createElement("a");
            let showTimes = document.createElement("ul");
            
            // Only list movies that are on the specified date
            if (data[i]["date"] == date && data[i]["location"] == location){
                // make the title a link
                movieTitle.innerText = data[i]["title"];
                let id = String(data[i]["id"]);
                movieTitle.setAttribute("onclick", `event.preventDefault(); getMovieInfo("${id}");`);

                // List show times
                let showtimeData = data[i]["times"];
                showtimeData.forEach(time => {
                    let item = document.createElement("li");
                    item.innerHTML = time;
                    showTimes.appendChild(item);
                });

                // Append Data
                title.appendChild(movieTitle);
                row.appendChild(title);
                row.appendChild(showTimes);
                table.appendChild(row);
            }
        };
    });
}

function getMovieInfo(id){
    const headers = ["Title", "Year", "Genre", "Runtime", "Director", "Writer", "Actors"];

    // Clear table
    $("#movieInfo tr").remove();

    let table = document.getElementById("movieInfo");
    table.id = "movieInfo";

    // Insert poster
    let posterRow = document.createElement("tr");
    let poster = document.createElement("img");

    // Fetch poster
    fetchOmdb(id).then((data)=>{
        for (x in data){
            poster.src = data["Poster"];
        }
    });

    // Append poster
    posterRow.appendChild(poster);
    table.appendChild(posterRow);
    
    // Create Table
    for (let i = 0; i < 7; i++){
        let row = document.createElement("tr");
        
        let head = document.createElement("th");
        head.innerText = headers[i] + ":";

        let p = document.createElement("p");
        p.className = "boxText";

        fetchOmdb(id).then((data)=>{
            for (x in data){
                p.innerText = data[headers[i]];
            }
        });

        row.appendChild(head);
        row.appendChild(p);
        table.appendChild(row);
    }
}