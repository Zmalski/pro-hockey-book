export default defineEventHandler((event) => {
  const type: string = event.context?.params?.name ?? "";
  // Switch statement to determine which endpoint to return
  switch (type) {
    case "players":
      return {
        players: "players"
      }
  }
  })