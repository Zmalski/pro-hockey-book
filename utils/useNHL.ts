export default function () {

    /** Get teams from firestore
     *  If no teams in firestore, hit the NHL API and populate firestore
     *  If id is provided, get team for that id
     * @param id Optional parameter to get team for that id
     */
    const getTeams = async (id?: number): Promise<Array<any>> => {
        // TODO: Implement id
        const { getTeamsFS } = useFirestore()
        let teams: any = [];
        teams = await getTeamsFS();
        if (teams.length < 1) {
            const { data } = await useFetch('/api/nhl/teams');
            teams = JSON.parse(JSON.stringify(data?.value?.teams));
        }
        return teams;
    }


    /** Get all players from firestore
     * If no players in firestore, hit the NHL API and populate firestore
     * If id is provided, get players for that team
     * search is optional and will filter players by name
     * @param id 
     * @param search
     */
    const getPlayers = async (id?: number, search?: string): Promise<Array<any>> => {
        // TODO: Implement id
        const { getPlayersFS } = useFirestore()
        let players: any = [];
        if (search) {
            players = await getPlayersFS(undefined, search);
        } else {
            players = await getPlayersFS();
        }
        if (players.length < 1) {
            const teams = await getTeams();
            for (const team of teams) {
                const { data } = await useFetch(`/api/nhl/teams/roster/${team.id}`);
                // handle object not found
                if (data?.value?.messageNumber === 10) { // Error
                    console.error('no roster for team', team)
                    continue;
                }
                const roster = JSON.parse(JSON.stringify(data?.value?.roster));
                for (const player of roster) {
                    const { data } = await useFetch(`/api/nhl/players/${player.person.id}`);
                    if (data?.value?.messageNumber === 10) { // Error
                        console.error('no player for id', player.person.id)
                        continue;
                    }
                    const playerData = JSON.parse(JSON.stringify(data?.value?.people[0]));
                    players.push(playerData);
                }
            }
        }
        return players;
    }
    /**
     * Get player for id
     * @param id 
     */
    const getPlayer = async (id: number): Promise<Object> => {
        const { getPlayersFS } = useFirestore()
        let player: Object = {};
        player = await getPlayersFS(id);
        if (Object.keys(player).length < 1) {
            const { data } = await useFetch(`/api/nhl/players/${id}`);
            if (data?.value?.messageNumber === 10) { // Error
                console.error('no player for id', id)
                return {};
            }
            player = JSON.parse(JSON.stringify(data?.value?.people[0]));
        }
        return player;
    }

    return {
        getTeams,
        getPlayers,
        getPlayer,
    }
}