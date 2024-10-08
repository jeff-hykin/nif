import { Notification } from "https://deno.land/x/deno_notify@1.4.3/ts/mod.ts"
import { Duration } from "https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/mod.ts"

const command = new Deno.Command(Deno.args[0], {
    args: Deno.args.slice(1),
})
const child = command.spawn()
const promise = child.status
const start = performance.now()
const minimumWait = Deno.env.get("NIF_MIN_WAIT_SECONDS")||"0.15"
const notif = new Notification()

var { code } = await promise
const duration = (performance.now() - start) / 1000
if (!minimumWait || duration > (minimumWait - 0)) {
    notif.title(`Took ${new Duration({ seconds: duration })}: ${Deno.args.join(" ")}`)
    notif.show()
}
Deno.exit(code)