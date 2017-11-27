#!/bin/sh
#
#
# Script for Switch test
test="switch_final"
testdir="/mnt/share/cgi-bin/test/switch"
mkdir -p $testdir
killall 05_switchdaemon.cgi
killall daemon_vt50.sh
killall daemon_vt100.sh
mv ./count* $testdir/
echo "Button test OK" > $testdir/switchtest.txt
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
