export default function useShare() {
    async function shareHandler(sharedUrl) {
        try {
            await navigator.share({ url: sharedUrl })
        } catch (e) {
            console.log(e)
        }
    }

    return { shareHandler }
}

