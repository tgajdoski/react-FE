#!/bin/sh
#
#
# Script for SD card test
test="sdcard_mount"
mkdir /mnt/sdcard
mount /dev/sda1 /mnt/sdcard
echo "Content-type: text/html"
echo ""
if grep -qs '/mnt/share' /proc/mounts; then
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'mount'"': '"'true'"'
echo -e '\t'"}"
echo "}"

else
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'mount'"': '"'false'"'
echo -e '\t'"}"
echo "}"
fi
