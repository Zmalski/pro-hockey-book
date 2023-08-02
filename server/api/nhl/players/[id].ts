export default defineEventHandler(async (event) => {
    const id: number = parseInt(event.context?.params?.id ?? "");
    if (isNaN(id)) {
        return {
            error: "Invalid id"
        }
    }
    const config = useRuntimeConfig()
    const apiRoot: string = config.public.nhlApiRoot;

    const player = await fetch(`${apiRoot}/people/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    return player
})