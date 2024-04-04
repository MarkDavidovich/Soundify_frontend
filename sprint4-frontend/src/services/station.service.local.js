
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stationDB'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    addStationMsg

}
window.cs = stationService


async function query(filterBy = { txt: '', artist: '' }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.artist))
    }
    // if (filterBy.price) {
    //     stations = stations.filter(station => station.price <= filterBy.price)
    // }
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)
    if (!station.msgs) station.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

function getEmptyStation() {
    return {
        name: '',
        songs: [],
    }
}

//DEMODATA

const sInTheEnd = {
    id: utilService.makeId(),
    title: 'In The End',
    artist: 'Linkin Park',
    album: 'Hybrid Theory',
    url: 'https://www.youtube.com/watch?v=eVTXPUF4Oz4',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712210330/Station%20images/hybridTheory_n01sbz.jpg',
    addedBy: 'Mark',
    duration: '3:36',
    addedAt: utilService.randomAddedTime(),
}

const sMrBlueSky = {
    id: utilService.makeId(),
    title: 'Mr. Blue Sky',
    artist: 'Electric Light Orchestra',
    album: 'Out of the Blue',
    url: 'https://www.youtube.com/watch?v=wuJIqmha2Hk',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213244/Station%20images/outOfTheBlue_zgpyqa.jpg',
    addedBy: 'Mark',
    duration: '5:03',
    addedAt: utilService.randomAddedTime(),
}

const sNowThatTheMagicHasGone = {
    id: utilService.makeId(),
    title: 'Now That the Magic Has Gone',
    artist: 'Joe Cocker',
    album: 'Night Calls',
    url: 'https://www.youtube.com/watch?v=MoiMUvOk7pA',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213243/Station%20images/nightCalls_bhryqs.jpg',
    addedBy: 'Mark',
    duration: '4:38',
    addedAt: utilService.randomAddedTime(),
}


const sDreamOn = {
    id: utilService.makeId(),
    title: 'Dream On',
    artist: 'Aerosmith',
    album: 'Aerosmith',
    url: 'https://www.youtube.com/watch?v=89dGC8de0CA',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/aerosmith_u1kfhd.jpg',
    addedBy: 'Mark',
    duration: '4:29',
    addedAt: utilService.randomAddedTime(),
}

const sHaveYouEverSeenTheRain = {
    id: utilService.makeId(),
    title: 'Have You Ever Seen The Rain',
    artist: 'Creedence Clearwater Revival',
    album: 'Pendulum',
    url: 'https://www.youtube.com/watch?v=bO28lB1uwp4',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213245/Station%20images/pendulum_qngzkr.jpg',
    addedBy: 'Mark',
    duration: '2:45',
    addedAt: utilService.randomAddedTime(),
}

const sStop = {
    id: utilService.makeId(),
    title: 'Stop!',
    artist: 'Sam Brown',
    album: 'Stop!',
    url: 'https://www.youtube.com/watch?v=V4qorFKV_DI',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213249/Station%20images/stop_l49xr5.jpg',
    addedBy: 'Mark',
    duration: '4:55',
    addedAt: utilService.randomAddedTime(),
}

const sThisLove = {
    id: utilService.makeId(),
    title: 'This Love',
    artist: 'Maroon 5',
    album: 'Songs About Jane',
    url: 'https://www.youtube.com/watch?v=XPpTgCho5ZA',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213251/Station%20images/songsAboutJane_vuisvs.jpg',
    addedBy: 'Mark',
    duration: '3:25',
    addedAt: utilService.randomAddedTime(),
}

const sSmoothCriminal = {
    id: utilService.makeId(),
    title: 'Smooth Criminal',
    artist: 'Michael Jackson',
    album: 'Bad 25',
    url: 'https://www.youtube.com/watch?v=q8w1d01Y2vY',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213248/Station%20images/smoothCriminal_aqp0fp.jpg',
    addedBy: 'Nadav',
    duration: '4:00',
    addedAt: utilService.randomAddedTime(),
}

const sBeatIt = {
    id: utilService.makeId(),
    title: 'Beat It',
    artist: 'Michael Jackson',
    album: 'Thriller',
    url: 'https://www.youtube.com/watch?v=WlTlUseVt7E',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213232/Station%20images/beatIt_xwjtyf.jpg',
    addedBy: 'Nadav',
    duration: '4:18',
    addedAt: utilService.randomAddedTime(),
}

const sJohnnyBGoode = {
    id: utilService.makeId(),
    title: 'Johnny B. Goode',
    artist: 'Chuck Berry',
    album: 'Berry Is On Top',
    url: 'https://www.youtube.com/watch?v=Uf4rxCB4lys',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213233/berryIsOnTop_dsuhck.jpg',
    addedBy: 'Nadav',
    duration: '2:42',
    addedAt: utilService.randomAddedTime(),
}
const sEnglishmanInNewYork = {
    id: utilService.makeId(),
    title: 'Englishman In New York',
    artist: 'Sting',
    album: '...Nothing Like the Sun',
    url: 'https://www.youtube.com/watch?v=d27gTrPPAyk',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213239/Station%20images/englishManInNewYork_imuuuy.jpg',
    addedBy: 'Nadav',
    duration: '4:27',
    addedAt: utilService.randomAddedTime(),
}

const sSultansOfSwing = {
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

const sHighwayToHell = {
    id: utilService.makeId(),
    title: 'Highway to Hell',
    artist: 'AC/DC',
    album: 'Highway to Hell',
    url: 'https://www.youtube.com/watch?v=l482T0yNkeo',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213240/Station%20images/highwayToHell_mfhfnl.jpg',
    addedBy: 'Nadav',
    duration: '3:27',
    addedAt: utilService.randomAddedTime(),
}

const sBohemianRhapsody = {
    id: utilService.makeId(),
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213235/Station%20images/boemianRhapsody_o8lf17.jpg',
    addedBy: 'Nadav',
    duration: '5:59',
    addedAt: utilService.randomAddedTime(),
}

const sLoseYourself = {
    id: utilService.makeId(),
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: 'Curtain Call: The Hits',
    url: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213238/Station%20images/curtainCallTheHits_facvzm.jpg',
    addedBy: 'Haim',
    duration: '5:23',
    addedAt: utilService.randomAddedTime(),
}


const sCalifornication = {
    id: utilService.makeId(),
    title: 'Californication',
    artist: 'Red Hot Chili Peppers',
    album: 'Californication',
    url: 'https://www.youtube.com/watch?v=YlUKcNNmywk',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213235/Station%20images/californication_bxp3ar.jpg',
    addedBy: 'Haim',
    duration: '5:21',
    addedAt: utilService.randomAddedTime(),
}

const sHypnotize = {
    id: utilService.makeId(),
    title: 'Hypnotize',
    artist: 'The Notorious B.I.G',
    album: 'Life After Death',
    url: 'https://www.youtube.com/watch?v=eaPzCHEQExs',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213242/Station%20images/lifeAfterDeath_zwsll3.jpg',
    addedBy: 'Haim',
    duration: '3:50',
    addedAt: utilService.randomAddedTime(),
}
const sCenturies = {
    id: utilService.makeId(),
    title: 'Centuries',
    artist: 'Fall Out Boy',
    album: 'American Beauty/American Psycho',
    url: 'https://www.youtube.com/watch?v=oPA0z4W-kcU',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213236/Station%20images/centuries_kuef65.jpg',
    addedBy: 'Haim',
    duration: '3:46',
    addedAt: utilService.randomAddedTime(),
}

const sNumbEncore = {
    id: utilService.makeId(),
    title: 'Numb / Encore',
    artist: 'Jay Z',
    album: 'Collision Course',
    url: 'https://www.youtube.com/watch?v=sCRRRofQ4tI',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213237/Station%20images/collisionCourse_x5ox3e.jpg',
    addedBy: 'Haim',
    duration: '3:25',
    addedAt: utilService.randomAddedTime(),
}

const sHighHopes = {
    id: utilService.makeId(),
    title: 'High Hopes',
    artist: 'Panic! At The Disco',
    album: 'Pray for the Wicked',
    url: 'https://www.youtube.com/watch?v=fH_OnJk6QqU',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213246/Station%20images/prayForTheWicked_zu7dz3.jpg',
    addedBy: 'Haim',
    duration: '3:12',
    addedAt: utilService.randomAddedTime(),
}

const sHereWithoutYou = {
    id: utilService.makeId(),
    title: 'Here Without You',
    artist: '3 Doors Down',
    album: 'Away from the Sun',
    url: 'https://www.youtube.com/watch?v=kPBzTxZQG5Q',
    imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/awayFromTheSun_diug2z.jpg',
    addedBy: 'Haim',
    duration: '3:55',
    addedAt: utilService.randomAddedTime(),
}

function _createStation(name = '', desc = '', imgUrl = '', songs = [], likedByUsers = []) {
    return {
        _id: utilService.makeId(),
        name,
        tags: [],
        desc,
        songs,
        likedByUsers,
        imgUrl,
        createdBy: {
            _id: utilService.makeId(),
            fullname: '',
            imgUrl: 'https://robohash.org/userrobohash'
        },
        createdAt: utilService.randomAddedTime()
    }
}

function _createStations() {

    let stations = utilService.loadFromStorage(STORAGE_KEY)

    if (!stations || !stations.length) {
        stations = [
            _createStation('Our Favorites',
                "our favorite songs!",
                'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712214797/Station%20images/liked-songs-300_kljhls.png',
                [
                    sInTheEnd,
                    sMrBlueSky,
                    sNowThatTheMagicHasGone,
                    sDreamOn,
                    sHaveYouEverSeenTheRain,
                    sStop,
                    sThisLove,
                    sSmoothCriminal,
                    sBeatIt,
                    sJohnnyBGoode,
                    sEnglishmanInNewYork,
                    sSultansOfSwing,
                    sHighwayToHell,
                    sBohemianRhapsody,
                    sLoseYourself,
                    sCalifornication,
                    sHypnotize,
                    sCenturies,
                    sNumbEncore,
                    sHighHopes,
                    sHereWithoutYou
                ],
                [
                    'mark.davidovich@gmail.com',
                    'haim321@gmail.com',
                    'nadavzivyon@gmail.com'
                ],
                'Soundify',
                ['Made For You']),

            _createStation('Nostalgia mix',
                "actually the same as our favorite songs, just for the demodata!",
                'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712236367/Station%20images/nostalgiaMix_lpz3zb.jpg',
                [
                    sInTheEnd,
                    sMrBlueSky,
                    sNowThatTheMagicHasGone,
                    sDreamOn,
                    sHaveYouEverSeenTheRain,
                    sStop,
                    sThisLove,
                    sSmoothCriminal,
                    sBeatIt,
                    sJohnnyBGoode,
                    sEnglishmanInNewYork,
                    sSultansOfSwing,
                    sHighwayToHell,
                    sBohemianRhapsody,
                    sLoseYourself,
                    sCalifornication,
                    sHypnotize,
                    sCenturies,
                    sNumbEncore,
                    sHighHopes,
                    sHereWithoutYou
                ],
                [
                    'mark.davidovich@gmail.com',
                    'haim321@gmail.com',
                    'nadavzivyon@gmail.com'
                ],
                'Soundify',
                ['Made For You']),
        ]
    }

    utilService.saveToStorage(STORAGE_KEY, stations)

    return stations
}

_createStations()
