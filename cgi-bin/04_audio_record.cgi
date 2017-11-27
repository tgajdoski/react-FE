#!/bin/sh
#
#
# Script for Audio test
test="audio_record"
testdir="/mnt/share/cgi-bin/test/audio"
mkdir -p $testdir
./ptest record-audio --duration 6 > $testdir/tmp.wav
oct32() { printf '\\0%03o\\0%03o\\0%03o\\0%03o' $(( $1 & 0xff )) $(( ($1 >> 8) & 0xff )) $(( ($1 >> 16) & 0xff )) $(( ($1 >> 24) & 0xff )); }
oct16() { printf '\\0%03o\\0%03o' $(( $1 & 0xff )) $(( ($1 >> 8) & 0xff )); }
wav() { len=$(stat -c %s $1); echo -n -e "RIFF$(oct32 $len)WAVEfmt $(oct32 16)$(oct16 1)$(oct16 1)$(oct32 48000)$(oct32 96000)$(oct16 4)$(oct16 16)data$(oct32 $len)"; cat $1; }
wav $testdir/tmp.wav > $testdir/tmp1.wav
mv $testdir/tmp1.wav $testdir/tmp.wav
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
