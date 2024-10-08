## What is this?

OS Notifications for long running processes. If you forget to check back in on a long install, this is the tool for you.

## How do I use it?

```sh
nif sleep 1000
# will notify you when its done sleeping
```

## How do I install it?


```shell
# isntall deno
curl -fsSL https://deno.land/install.sh | sh
# install nif
deno install -n nif -Afg --unstable-ffi https://raw.githubusercontent.com/jeff-hykin/nif/refs/heads/master/nif.js
```


## Delay

It gets real annoying when a process errors in 0.001sec and then sends a notification.

So there's a setting for the minimum wait time before getting a notification.
```sh
# this is the default (150ms); this command will not notify
NIF_MIN_WAIT_SECONDS=0.15 nif echo hi
# this will always notify
NIF_MIN_WAIT_SECONDS=0 nif echo hi
```

Set `NIF_MIN_WAIT_SECONDS` in your shell profile.