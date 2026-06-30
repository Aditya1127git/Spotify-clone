async function getSongs() {
    console.log("NEW CODE RUNNING");
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response

    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++){
        const element = as[index];

        console.log("HREF =", element.href);
        console.log("SPLIT =", element.href.split("/songs/"));
        console.log("INDEX1 =", element.href.split("/songs/")[1]);


        if(element.href.endsWith("mp3")){
            songs.push(decodeURIComponent(element.href).split("\\songs\\")[1]);
        }
    }
    return songs
}

async function main(){
    let songs = await getSongs()
    console.log("FIRST SONG =", songs[0])
    console.log(songs);
    console.log(songs.length);
    

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song} </li>`;
    }

    var audio = new Audio("/songs/" + songs[1]);
    console.log(audio.src);
    // audio.play();
    
    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration;
        console.log(duration)
        //The duration variable now holds the duration (in seconds) of the audio clip
    });
}

main()