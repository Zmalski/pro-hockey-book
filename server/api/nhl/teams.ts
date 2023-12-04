export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiRoot: string = config.public.nhlApiRoot;

    const teams = await fetch(`${apiRoot}/standings/now`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    return teams
})