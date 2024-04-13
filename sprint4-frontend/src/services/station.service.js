
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    getEmptyFilterBy,
    getDefaultSort,
    addStationMsg,
    getIdxById,
    getSongById,
    calcStationDuration,
    formatAddedTime,
}
window.cs = stationService


async function query(filterBy='',sortBy='') {
    return httpService.get('station', { params: {filterBy,sortBy} })
}

async function getIdxById(id) {
    try {
        const stations = await query()
        const idx = stations.findIndex(station => station._id === id)
        if (idx === -1) return new Error('could not find index in stations')
        return idx
    }
    catch (err) {
        console.log('could not get station idx', err)
    }
}


function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function getSongById(songId) {
    const stations = await httpService.get(STORAGE_KEY)
    const song = stations.reduce((foundSong, station) => {
        if (foundSong) return foundSong
        return station.songs.find(song => song.id === songId)
    }, null)
    return song || null
}

async function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await httpService.put(`station/${station._id}`, station)

    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

function calcStationDuration(songs) {
    let totalDurationInSeconds = 0;
    if (!songs.length) return;

    songs.forEach(song => {
        const [minutes, seconds] = song.duration.split(':')

        totalDurationInSeconds += parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
    })

    const totalHours = Math.floor(totalDurationInSeconds / 3600)
    const remainingSeconds = totalDurationInSeconds % 3600
    const totalMinutes = Math.floor(remainingSeconds / 60)
    const totalSeconds = remainingSeconds % 60

    if (totalHours >= 1) {
        const hourText = totalHours === 1 ? "hour" : "hours";
        return `about ${totalHours} ${hourText} `;
    } else {
        return `${totalMinutes} min ${totalSeconds.toString().padStart(2, '0')} sec`
    }
}

function formatAddedTime(addedTime) {
    const diff = Date.now() - addedTime
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60))
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
        } else {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`
        }
    } else if (days === 1) {
        return 'Yesterday'
    } else {
        return `${days} day${days === 1 ? '' : 's'} ago`
    }
}

async function addStationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}

function getEmptyStation() {
    return {
        name: '',
        tags: [],
        desc: '',
        songs: [],
        likedByUsers: [],
        imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712320500/Station%20images/Misc%20images/newPlaylist_exl8fh.png',

        createdBy: {
            _id: '',
            fullname: 'Guest', // Add || LoggedIn user
            imgUrl: 'https://res.cloudinary.com/dkwwsxprt/image/upload/v1712605592/Guest-user_iswifs.png'
        },
        createdAt: '',
    }
}

function getEmptyFilterBy() {
    return { txt: '' }
}

function getDefaultSort() {
    return { by: 'station' }
}





