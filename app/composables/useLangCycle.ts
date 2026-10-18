import { languages, rotateEveryMs, type TLang } from '~~/config'

let timer: ReturnType<typeof setInterval> | undefined

/**
 * One clock for the whole page. Every <RotatingText> reads the same index,
 * so all calls to action switch language together instead of drifting.
 * The server always renders English; the clock only runs on the client.
 */
export function useLangCycle() {
    const index = useState('lang-cycle', () => 0)
    const lang = computed<TLang>(() => languages[index.value] ?? 'en')

    const start = () => {
        if (import.meta.server) return
        clearInterval(timer)
        timer = setInterval(() => {
            index.value = (index.value + 1) % languages.length
        }, rotateEveryMs)
    }

    /** Jump to a language and give it a full interval before moving on. */
    const select = (l: TLang) => {
        index.value = languages.indexOf(l)
        start()
    }

    return { lang, start, select }
}
