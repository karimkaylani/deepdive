import { getVideos } from "../../actions";

export async function GET() {
    return Response.json(await getVideos());
}