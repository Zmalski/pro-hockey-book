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
        case "teams":
            // hit the NHL API for the teams endpoint and return results
            const teams = await fetch(`${apiRoot}teams`)
                .then((res) => res.json())
                .then((data) => data.teams)
                .catch((err) => console.log(err));
            return {
                teams
            }
        default:
            return {
                error: "Invalid endpoint"
            }
    }
})