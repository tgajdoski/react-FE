#!/bin/sh
#
#
# Script for SD card test
test="sdcard_write"
head -c 1k </dev/urandom >/mnt/sdcard/testfile.txt
md5sum /mnt/sdcard/testfile.txt > /mnt/sdcard/testfile.md5
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'write'"': '"'true'"'
echo -e '\t'"}"
echo "}"
