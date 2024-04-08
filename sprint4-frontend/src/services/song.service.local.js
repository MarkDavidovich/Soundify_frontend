import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const SONG_KEY = 'songDB'
const LIKED_SONG_KEY = 'likedSongDB'

export const songService = {
    query,
    getById,
    remove,
    save,
    saveToLikedSongs,
    removeFromLikedSongs,
    getLikedSong,
}

async function query(filterBy = { txt: '' }) {
    let songs = await storageService.query(SONG_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        songs = songs.filter(song => regex.test(song.name))
    }
    return songs
}

function getById(songId) {
    console.log("🚀 ~ getById ~ songId:", songId)

    return storageService.get(SONG_KEY, songId)
}

async function remove(songId) {
    console.log("🚀 ~ remove ~ songId:", songId)

    await storageService.remove(SONG_KEY, songId)
}

async function save(song) {
    console.log("🚀 ~ save ~ song:", song)

    //Only Add song - CANT EDIT song on spotify
    let savedSong = await storageService.post(SONG_KEY, song)
    return savedSong
}

async function saveToLikedSongs(song) {
    console.log("🚀 ~ saveLikedSongs ~ song:", song)

    let likedSong = await storageService.put(LIKED_SONG_KEY, song)
    return likedSong
}

async function removeFromLikedSongs(song) {
    console.log("🚀 ~ removeFromLikedSongs ~ song:", song)

    let likedSong = await storageService.remove(LIKED_SONG_KEY, song)
    return likedSong
}

async function getLikedSong() {
    return await storageService.query(LIKED_SONG_KEY).filter()
}

// Demo Data
const songsList =
    [

        {
            id: utilService.makeId(),
            title: 'Dream On',
            artist: 'Aerosmith',
            album: 'Aerosmith',
            url: 'https://www.youtube.com/watch?v=89dGC8de0CA',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/aerosmith_u1kfhd.jpg',
            addedBy: 'Mark',
            duration: '4:29',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Have You Ever Seen The Rain',
            artist: 'Creedence Clearwater Revival',
            album: 'Pendulum',
            url: 'https://www.youtube.com/watch?v=bO28lB1uwp4',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213245/Station%20images/pendulum_qngzkr.jpg',
            addedBy: 'Mark',
            duration: '2:45',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Stop!',
            artist: 'Sam Brown',
            album: 'Stop!',
            url: 'https://www.youtube.com/watch?v=V4qorFKV_DI',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213249/Station%20images/stop_l49xr5.jpg',
            addedBy: 'Mark',
            duration: '4:55',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'This Love',
            artist: 'Maroon 5',
            album: 'Songs About Jane',
            url: 'https://www.youtube.com/watch?v=XPpTgCho5ZA',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213251/Station%20images/songsAboutJane_vuisvs.jpg',
            addedBy: 'Mark',
            duration: '3:25',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Smooth Criminal',
            artist: 'Michael Jackson',
            album: 'Bad 25',
            url: 'https://www.youtube.com/watch?v=q8w1d01Y2vY',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213248/Station%20images/smoothCriminal_aqp0fp.jpg',
            addedBy: 'Nadav',
            duration: '4:00',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Beat It',
            artist: 'Michael Jackson',
            album: 'Thriller',
            url: 'https://www.youtube.com/watch?v=WlTlUseVt7E',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213232/Station%20images/beatIt_xwjtyf.jpg',
            addedBy: 'Nadav',
            duration: '4:18',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Johnny B. Goode',
            artist: 'Chuck Berry',
            album: 'Berry Is On Top',
            url: 'https://www.youtube.com/watch?v=Uf4rxCB4lys',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213233/Station%20images/berryIsOnTop_dsuhck.jpg',
            addedBy: 'Nadav',
            duration: '2:42',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Englishman In New York',
            artist: 'Sting',
            album: '...Nothing Like the Sun',
            url: 'https://www.youtube.com/watch?v=d27gTrPPAyk',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213239/Station%20images/englishManInNewYork_imuuuy.jpg',
            addedBy: 'Nadav',
            duration: '4:27',
            addedAt: utilService.randomAddedTime(),
        },
        {
            id: utilService.makeId(),
            title: 'Sultans Of Swing',
            artist: 'Dire Stairs',
            album: 'Dire Stairs',
            url: 'https://www.youtube.com/watch?v=d27gTrPPAyk',
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213250/Station%20images/sultansOfSwing_xxaukv.jpg',
            addedBy: 'Nadav',
            duration: '4:26',
            addedAt: utilService.randomAddedTime(),
        }
    ]


