#!/usr/bin/env sh


set -e
set -u

[ $# -ne 2 ] && {
    echo 'usage: $0 PID file' >&2
}



find "/proc/${1}/fd" \
     -type l \
     -printf '%l\n' \
>/tmp/out.log 2>/tmp/err.log

find "/proc/${1}/fd" \
     -type l \
     -printf '%l\n' \
    | grep -c -- "$2"

