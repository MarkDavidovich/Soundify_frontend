import Axios from 'axios'
import { utilService } from './util.service'


// Need To API_KEY in env var
const API_KEY = 'AIzaSyC8JWKxSfenoSZ3raA2XxtVg6ZrLl8AtWY'

const STORAGE_KEY = 'songsDB'

const BASE_URL = 'https://www.googleapis.com/youtube/v3'


export async function getSongs(term) {
    const songsMap = utilService.loadFromStorage(STORAGE_KEY) || {}
    if (songsMap[term]) {

        console.log('Loading from Storage')
        return Promise.resolve(songsMap[term])
    }

    /* 
    videoCategoryId=10: specific category -> ID 10 refers to 'Music'.
    
    videoDuration=medium: search only videos of medium length.
    
    videoSyndicated=true:  search videos that can be played outside of youtube 
    */

    const params = {
        part: 'snippet',
        videoEmbeddable: 'true',
        videoCategoryId: '10',
        videoDuration: 'medium',
        type: 'video',
        key: API_KEY,
        q: term
    }

    console.log('Getting from Axios-YouTube')

    try {

        const res = await Axios.get(`${BASE_URL}/search`, { params: params })

        const videos = res.data.items

        //Getting the Video Id to make another api call to bring duration time
        const videoIds = videos.map(video => video.id.videoId).join(',')

        const resDurParams = {
            id: videoIds,
            part: 'contentDetails',
            key: API_KEY,
        }

        //Making the second api call to get the duration time
        const resDur = await Axios.get(`${BASE_URL}/videos`, { params: resDurParams })

        const videosWithDetails = resDur.data.items

        const songs = videos.map(video => {
            const details = videosWithDetails.find(detail => detail.id === video.id.videoId)

            const cleanedTitle = cleanTitle(video.snippet.title)

            return {
                id: video.id.videoId,
                title: cleanedTitle,
                artist: video.snippet.channelTitle,
                url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                imgUrl: video.snippet.thumbnails.default.url,
                isLiked: false,
                duration: details ? convertDuration(details.contentDetails.duration) : 'Unknown',
                addedAt: new Date,
                addedBy: 'Guest'
            }
        })

        songsMap[term] = songs
        utilService.saveToStorage(STORAGE_KEY, songsMap)

        return songs

    } catch (err) {
        console.log(err)
        throw err
    }
}

function convertDuration(duration) {

    // returning in a format "PT5M13S" for 5 minutes, 13 seconds
    const match = duration.match(/PT(\d+M)?(\d+S)?/)
    const minutes = (match[1] ? parseInt(match[1]) : 0).toString()
    const seconds = (match[2] ? parseInt(match[2]) : 0).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}

function cleanTitle(title) {
    const patternsToRemove = [
        // Matches anything in square brackets - global flag
        /\[.*?\]/g,
        /\(.*?\)/g,

        // Matches all in the string (g) and ignore letter case (i).
        /official music video/gi,
        /4K/gi,
        /HD/gi,
        /lyrics/gi,
        /video clip/gi,
    ]

    let cleanedTitle = title
    patternsToRemove.forEach(pattern => {
        cleanedTitle = cleanedTitle.replace(pattern, '')
    })

    return cleanedTitle.trim()
}
