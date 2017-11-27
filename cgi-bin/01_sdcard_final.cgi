#!/bin/sh
#
#
# Script for SD card test
test="sdcard_final"
testdir="/mnt/share/cgi-bin/test/sdcard"
mkdir -p $testdir
mv /mnt/sdcard/testfile.md5 $testdir
mv /mnt/sdcard/testfile.txt $testdir
mv /mnt/share/cgi-bin/sdcard_info.txt $testdir 
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'test'"': '"'true'"'
echo -e '\t'"}"
echo "}"
