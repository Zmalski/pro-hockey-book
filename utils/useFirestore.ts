import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";


interface Firestore {
    collection: (name: string) => any;
  }  
interface NuxtApp {
    $firestore: Firestore;
  }
  
// TODO: Move this over to server side
export default function () {
    const { $firestore } = useNuxtApp()

    const addUser = async (first: string, last: string, born: number): Promise<boolean> => {
        try {
            const docRef = await addDoc(collection($firestore, "users"), {
                first: first,
                last: last,
                born: born
            });
            console.log("Document written with ID: ", docRef.id);
            if (docRef) {
                return true;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
        return false
    }

    const getTeamsFS = async (): Promise<Array<any>> => {
        try {
            const querySnapshot = await getDocs(collection($firestore, "teams"));
            return querySnapshot.docs.map(doc => doc.data())
        } catch (e) {
            console.error("Error getting documents: ", e);
            return [];
        }
    }

    const getPlayersFS = async (): Promise<Array<any>> => {
        try {
            const querySnapshot = await getDocs(collection($firestore, "players"));
            return querySnapshot.docs.map(doc => doc.data())
        } catch (e) {
            console.error("Error getting documents: ", e);
            return [];
        }
    }

    const populateTeams = async (teams: Array<any>): Promise<boolean> => {
        try {
            for (const team of teams) {
                // unpack team and add all fields to firestore
                const data = {
                    id: team.id,
                    name: team.name,
                    abbreviation: team.abbreviation,
                    teamName: team.teamName,
                    locationName: team.locationName,
                    firstYearOfPlay: team.firstYearOfPlay,
                    division: team.division,
                    conference: team.conference,
                    franchise: team.franchise,
                    shortName: team.shortName,
                    officialSiteUrl: team.officialSiteUrl,
                    active: team.active,
                    franchiseId: team.franchiseId,
                    venue: team.venue,
                    link: team.link,
                };
                const colRef = collection($firestore, "teams");
                const docRef = doc(colRef, data.id.toString());
                await setDoc(docRef, data);
                console.log("Document written with ID: ", docRef.id);
            }
            if (teams) {
                return true;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
        return false;
    }

    const populatePlayers = async (players: Array<any>): Promise<boolean> => {
        try {
            for (const player of players) {
                // unpack player and add all fields to firestore
                const data = {
                    id: player.id,
                    fullName: player.fullName,
                    link: player.link,
                    firstName: player.firstName,
                    lastName: player.lastName,
                    primaryNumber: player.primaryNumber ? player.primaryNumber : null,
                    birthDate: player.birthDate,
                    currentAge: player.currentAge,
                    birthCity: player.birthCity,
                    birthCountry: player.birthCountry,
                    nationality: player.nationality,
                    height: player.height,
                    weight: player.weight,
                    active: player.active,
                    alternateCaptain: player.alternateCaptain,
                    captain: player.captain,
                    rookie: player.rookie,
                    shootsCatches: player.shootsCatches,
                    rosterStatus: player.rosterStatus,
                    currentTeam: player.currentTeam,
                    primaryPosition: player.primaryPosition,
                };
                const colRef = collection($firestore, "players");
                const docRef = doc(colRef, data.id.toString());
                await setDoc(docRef, data);
                console.log("Document written with ID: ", docRef.id);
            }
            if (players) {
                return true;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
        return false;
    }

    return {
        addUser,
        populateTeams,
        getTeamsFS,
        getPlayersFS,
        populatePlayers,
    }
}