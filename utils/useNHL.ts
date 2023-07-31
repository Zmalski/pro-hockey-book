export default function () {
    const getTeams = async (): Promise<Array<any>> => {
        // Get teams from firestore
        // If no teams in firestore, hit the NHL API and populate firestore
        const { getTeamsFS } = useFirestore()
        let teams: any = [];
        teams = await getTeamsFS();
        if (teams.length < 1) {
            const { data } = await useFetch('/api/nhl/teams');
            teams = JSON.parse(JSON.stringify(data?.value?.teams));
        }
        return teams;
    }

    return {
        getTeams,
    }
}