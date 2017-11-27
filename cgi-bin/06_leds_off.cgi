#!/bin/sh
#
#
# Script for Leds test
test="leds_off"
testdir="/mnt/share/cgi-bin/test/leds"
model="vt100"
mkdir -p $testdir
echo "Content-type: text/html"
echo ""
if [ "$model" == "vt100" ]
then
./ptest set-leds --vt100 0 0 0 0 0 0 --model vt100 > $testdir/leds_off.txt
else 
./ptest set-leds --vt50 0 0 0 --model vt50 > $testdir/leds_off.txt
fi

echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"

