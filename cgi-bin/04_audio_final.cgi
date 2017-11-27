#!/bin/sh
#
#
# Script for Audio test
test="audio_final"
testdir="/mnt/share/cgi-bin/test/audio"
mv $testdir/tmp.wav $testdir/audio_sample.wav
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
