#!/bin/sh
#
#
# Script for Audio test
test="audio_record"
testdir="/mnt/share/cgi-bin/test/audio"
echo "Content-type: audio/wav"
echo ""
cat $testdir/tmp.wav
