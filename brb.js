import { Notification } from "https://deno.land/x/deno_notify@1.4.3/ts/mod.ts"

const notif = new Notification()
notif.title(`Done!`)
notif.show()