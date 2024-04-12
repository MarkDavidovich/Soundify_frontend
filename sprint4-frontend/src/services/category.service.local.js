
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { stationService } from './station.service.local.js'


const CATEGORY_KEY = 'categoryDB'

export const categoryService = {
    queryCategory,
    save,

}
window.cs = categoryService

async function queryCategory() {
    var categories = await storageService.query(CATEGORY_KEY)

    return categories
}

async function save(category) {
    var savedCategory
    if (category._id) {
        savedCategory = await storageService.put(CATEGORY_KEY, category)
    } else {

        savedCategory = await storageService.post(CATEGORY_KEY, category)
    }
    return savedCategory
}


function getEmptyCategory() {
    return {
        _id: '',
        name: '',
        stations: [],
        imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712320500/Station%20images/Misc%20images/newPlaylist_exl8fh.png',
    }
}

function createRandomSong() {
    const songs = [
        { title: 'In The End', artist: 'Linkin Park', album: 'Hybrid Theory', imgUrl: 'linkToImg', duration: '3:36' },
        // Add more song templates
    ];
    const song = songs[Math.floor(Math.random() * songs.length)];
    return {
        ...song,
        id: utilService.makeId(),
        url: `https://www.youtube.com/watch?v=${utilService.makeId()}`,
        addedBy: 'Random User',
        addedAt: utilService.randomAddedTime(),
        isLiked: Math.random() > 0.5
    };
}

// function _createCategories(numCategories = 40, numStationsPerCategory = 20) {
//     let categories = []

//     const categoriesName = [
//         'Music', 'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Dance', 'Electronic', 'Mood', 'Indie', 'Rock', 'Workout', 'Chill', 'R&B', 'Sleep', 'Party', 'Love', 'Metal', 'At Home', 'Wellness', 'Jazz', 'Focus', 'Soul', 'Classical', 'Punk', 'Blues', 'Cooking & Dining', 'Alternative', 'Travel', 'Funk', 'Summer', 'Afro', 'Fresh Finds', 'Equal', 'Trending', 'Gaming', 'New Releases', 'Made For You', 'Country'
//     ]

//     for (let i = 0; i < numCategories; i++) {
//         let stations = []
//         for (let j = 0; j < numStationsPerCategory; j++) {
//             stations.push(createStation());
//         }
//         categories.push({
//             _id: utilService.makeId(),
//             name: categoriesName[i % categoriesName.length],
//             stations: stations,
//             imgUrl: `https://dummyimage.com/600x400/000/fff&text=Category${i + 1}`
//         });
//     }
//     return categories
// }



//DEMODATA


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
    isLiked: false,
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
    isLiked: false,
}


function _createCategories(numCategories = 2, numStationsPerCategory = 2) {

    let categories = utilService.loadFromStorage(CATEGORY_KEY)

    if (!categories || !categories.length) {
        console.log('No categories found in storage, creating new ones.')

        const categoriesName = [
            'Music', 'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Dance', 'Electronic', 'Mood', 'Indie', 'Rock', 'Workout', 'Chill', 'R&B', 'Sleep', 'Party', 'Love', 'Metal', 'At Home', 'Wellness', 'Jazz', 'Focus', 'Soul', 'Classical', 'Punk', 'Blues', 'Cooking & Dining', 'Alternative', 'Travel', 'Funk', 'Summer', 'Afro', 'Fresh Finds', 'Equal', 'Trending', 'Gaming', 'New Releases', 'Made For You', 'Country'
        ]

        categories = []

        for (let i = 0; i < numCategories; i++) {
            let stations = []

            for (let j = 0; j < numStationsPerCategory; j++) {
                stations.push(stationService._createStations())
            }

            categories.push({
                _id: utilService.makeId(),
                name: categoriesName[i % categoriesName.length],
                stations: stations,
                imgUrl: `https://dummyimage.com/600x400/000/fff&text=Category${i + 1}`
            })
        }

        utilService.saveToStorage(CATEGORY_KEY, categories)
        console.log('New categories saved:', categories)

    } else {
        console.log('Categories loaded from storage:', categories);
    }


    return categories
}

_createCategories()



const categoryStations = stationService._createStations


// function generateCategories(numCategories = 40, numStationsPerCategory = 20) {
//     const categoriesName = ['Music', 'Pop', 'Hip-Hop', 'Rock', 'Latin', 'Dance', /* Continue with other category names */];
//     return categoriesName.slice(0, numCategories).map((name, index) => ({
//         _id: utilService.makeId(),
//         name,
//         stations: Array.from({ length: numStationsPerCategory }, () => createStation(`${name} Station ${index + 1}`, `A collection of ${name.toLowerCase()} music.`)),
//         imgUrl: `https://dummyimage.com/600x400/000/fff&text=Category${index + 1}`
//     }));
// }


// ------------------------- _createStation ------------------------- //

// function _createStation(name = '', desc = '', imgUrl = '', songs = [], likedByUsers = []) {
//     return {
//         _id: utilService.makeId(),
//         name,
//         tags: [],
//         desc,
//         songs,
//         likedByUsers,
//         imgUrl,
//         createdBy: {
//             _id: utilService.makeId(),
//             fullname: 'Guest',
//             imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712605592/Guest-user_iswifs.png'
//         },
//         createdAt: utilService.randomAddedTime()
//     }
// }

// const sSmoothCriminal = {
//     id: utilService.makeId(),
//     title: 'Smooth Criminal',
//     artist: 'Michael Jackson',
//     album: 'Bad 25',
//     url: 'https://www.youtube.com/watch?v=q8w1d01Y2vY',
//     imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213248/Station%20images/smoothCriminal_aqp0fp.jpg',
//     addedBy: 'Nadav',
//     duration: '4:00',
//     addedAt: utilService.randomAddedTime(),
//     isLiked: false,
// }
// const sBeatIt = {
//     id: utilService.makeId(),
//     title: 'Beat It',
//     artist: 'Michael Jackson',
//     album: 'Thriller',
//     url: 'https://www.youtube.com/watch?v=WlTlUseVt7E',
//     imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213232/Station%20images/beatIt_xwjtyf.jpg',
//     addedBy: 'Nadav',
//     duration: '4:18',
//     addedAt: utilService.randomAddedTime(),
//     isLiked: false,
// }
// const sJohnnyBGoode = {
//     id: utilService.makeId(),
//     title: 'Johnny B. Goode',
//     artist: 'Chuck Berry',
//     album: 'Berry Is On Top',
//     url: 'https://www.youtube.com/watch?v=Uf4rxCB4lys',
//     imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213233/Station%20images/berryIsOnTop_dsuhck.jpg',
//     addedBy: 'Nadav',
//     duration: '2:42',
//     addedAt: utilService.randomAddedTime(),
//     isLiked: false,
// }
// const sEnglishmanInNewYork = {
//     id: utilService.makeId(),
//     title: 'Englishman In New York',
//     artist: 'Sting',
//     album: '...Nothing Like the Sun',
//     url: 'https://www.youtube.com/watch?v=d27gTrPPAyk',
//     imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213239/Station%20images/englishManInNewYork_imuuuy.jpg',
//     addedBy: 'Nadav',
//     duration: '4:27',
//     addedAt: utilService.randomAddedTime(),
//     isLiked: false,
// }
// const sSultansOfSwing = {
//     id: utilService.makeId(),
//     title: 'Sultans Of Swing',
//     artist: 'Dire Stairs',
//     album: 'Dire Stairs',
//     url: 'https://www.youtube.com/watch?v=h0ffIJ7ZO4U',
//     imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213250/Station%20images/sultansOfSwing_xxaukv.jpg',
//     addedBy: 'Nadav',
//     duration: '4:26',
//     addedAt: utilService.randomAddedTime(),
//     isLiked: false,
// }

// function _createStations() {

//     let stations = utilService.loadFromStorage(STORAGE_KEY)

//     if (!stations || !stations.length) {

//         stations = [

//             _createStation('Our Favorites',
//                 "our favorite songs!",
//                 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712783456/Station%20images/Misc%20images/ab67706c0000da8454c9a023b386d4afc4a8a013_sxztsd.jpg',
//                 [
//                     sInTheEnd,
//                     sMrBlueSky,
//                     sNowThatTheMagicHasGone,
//                     sDreamOn,
//                     sHaveYouEverSeenTheRain,
//                     sStop,
//                     sThisLove,
//                     sSmoothCriminal,
//                     sBeatIt,
//                     sJohnnyBGoode,
//                     sEnglishmanInNewYork,
//                 ],
//                 [
//                     'mark.davidovich@gmail.com',
//                     'haim321@gmail.com',
//                     'nadavzivyon@gmail.com'
//                 ],
//                 'Soundify',
//                 ['Made For You']),

//             _createStation('Nostalgia mix',
//                 "some more of our favorites",
//                 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712236367/Station%20images/nostalgiaMix_lpz3zb.jpg',
//                 [

//                     sSultansOfSwing,
//                     sHighwayToHell,
//                     sBohemianRhapsody,
//                     sLoseYourself,
//                     sCalifornication,
//                     sHypnotize,
//                     sCenturies,
//                     sNumbEncore,
//                     sHighHopes,
//                     sHereWithoutYou
//                 ],
//                 [
//                     'mark.davidovich@gmail.com',
//                     'haim321@gmail.com',
//                     'nadavzivyon@gmail.com'
//                 ],
//                 'Soundify',
//                 ['Made For You']),
//             _createEmptyLikedSongsStation(),
//         ]
//     }

//     utilService.saveToStorage(STORAGE_KEY, stations)

//     return stations
// }

// function _createStation(name = '', desc = '', imgUrl = '', songs = [], likedByUsers = []) {
//     return {
//         _id: utilService.makeId(),
//         name,
//         tags: [],
//         desc,
//         songs,
//         likedByUsers,
//         imgUrl,
//         createdBy: {
//             _id: utilService.makeId(),
//             fullname: 'Guest',
//             imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712605592/Guest-user_iswifs.png'
//         },
//         createdAt: utilService.randomAddedTime()
//     }
// }
