#!/bin/sh
#
#
# Script for Buzzer/Vibrator test
test="buzzer_vibrator"
testdir="/mnt/share/cgi-bin/test/buzzvib"
mkdir -p $testdir
output=`./ptest make-sound`
echo $output > $testdir/buzzvib.txt
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
