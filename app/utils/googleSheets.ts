import {google} from 'googleapis';
import { Video } from '../types';
import { unstable_cache } from 'next/cache';

export const getCachedVideos = unstable_cache(getVideos, ['videos'], {revalidate: 1800});

export async function getVideos() {
    const credential = JSON.parse(
        Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
    );

    const auth = await google.auth.getClient({
        projectId: credential.project_id,
        credentials: {
            type: credential.type,
            private_key: credential.private_key,
            client_email: credential.client_email,
            client_id: credential.client_id,
            token_url: credential.token_uri,
            universe_domain: credential.universe_domain,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const data = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "A:I"
    });

    const res = data.data.values;

    const videos: Video[] = [];
    for (let i = 1; i < res.length; i++) {
        const video = res[i];
        videos.push({
            title: video[0],
            creator: video[1],
            genre: [video[2], video[3], video[4]],
            length: video[5],
            date: video[6],
            url: video[7],
            yearRecommended: video[8],
            thumbnail: `https://img.youtube.com/vi/${getYoutubeIDFromURL(video[7])}/maxresdefault.jpg`
        });
    }
  return videos;
}

// FROM: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
const getYoutubeIDFromURL = (url: string): string => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11) ? match[7] : "";
}