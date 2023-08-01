export default defineEventHandler(async (event) => {
    const type: string = event.context?.params?.endpoint ?? "";
    const apiRoot: string = "https://statsapi.web.nhl.com/api/v1/";
    // Switch statement to determine which endpoint to return
    console.log(`Fetching ${type} from NHL API`);
    switch (type) {
        case "players":
            return {
                players: "players"
            }
        default:
            return {
                error: "Invalid endpoint"
            }
    }
})