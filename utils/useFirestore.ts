import { collection, addDoc, getDocs } from "firebase/firestore";
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

    const populateTeams = async (teams: Array<any>): Promise<boolean> => {
        try {
            for (const team of teams) {
                // unpack team and add all fields to firestore
                const docRef = await addDoc(collection($firestore, "teams"), {
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
                });
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
        


    return {
        addUser,
        populateTeams,
        getTeamsFS,
    }
}