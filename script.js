var found = false;
const creds = "M2YzYTIxYTk1MTIyNGIwY2E0Y2IxNDUzMWRiZGQyZWE6MTBjNGM2ZTcxZmRhNGQwZWIyZTJlMTc0MTYwNWQwYzY=";
var key = "";
var info = {};
async function token() {
    await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${creds}`,
            'content-type': "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    })
        .then(res => res.json())
        .then(data => { key = data['access_token'] })
    // console.log(key)
}

var randomID = function () {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const ups = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const lows = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    const all = [nums, ups, lows]
    var str = ""
    for (let i = 0; i < 22; i++) {
        let j = Math.floor(Math.random() * 26)
        let k = Math.floor(Math.random() * 3)
        str += all[k][k == 0 ? j % 10 : j]
    }
    return str
}

var randomWord = function (len) {
    const lows = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
    var str = "";
    for (let i = 0; i < len; i++) {
        str += lows[Math.floor(Math.random() * lows.length)]
    }
    return str;
}




async function search(id) {
    await fetch(`https://api.spotify.com/v1/search?q=${id}&type=track`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => {
            info = data;
            songID = info.tracks.items[Math.floor(Math.random() * (info.tracks.items.length / 2))].id
        })

}

async function track(id) {
    await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${key}`,
        }
    })
        .then(r => r.json())
        .then(data => info = data)


}



async function works() {
    let r = randomWord(3)
    await token()
    await search(r)
    await track(songID)
    console.log(r)
    console.log(`name: ${info.name}, artist: ${info.artists[0].name}`)
}

works()