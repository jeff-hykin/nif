# Nif: The Long Process Notifier

## What is this?

OS Notifications for long running processes. AKA, get a notifiction when rust is finally done compiling.

## How do I use it?

```sh
# will notify you when its done sleeping (and tell you how long it took)
nif sleep 1000

# if you forget to run nif, brb is nearly as good. It'll just notify you with "Done!"
sleep 1000; brb
```

## How do I install it?


```shell
# isntall deno
curl -fsSL https://deno.land/install.sh | sh
# install nif
deno install -n nif -Afg --unstable-ffi https://raw.githubusercontent.com/jeff-hykin/nif/refs/heads/master/nif.js
# install brb
deno install -n brb -Afg --unstable-ffi https://raw.githubusercontent.com/jeff-hykin/nif/refs/heads/master/brb.js
```


## Nif Delay

It gets real annoying when a process errors in 0.001sec and then sends a notification.

So there's a setting for the minimum wait time before getting a notification.
```sh
# this is the default (150ms); this command will not notify
NIF_MIN_WAIT_SECONDS=0.15 nif echo hi
# this will always notify
NIF_MIN_WAIT_SECONDS=0 nif echo hi
```

Set `NIF_MIN_WAIT_SECONDS` in your shell profile.