#!/bin/sh
#
#
# Script for SD card test
test="sdcard_umount"
mkdir /mnt/sdcard
umount /dev/sda1 
echo "Content-type: text/html"
echo ""
if grep -qs '/mnt/share' /proc/mounts; then
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'mount'"': '"'false'"'
echo -e '\t'"}"
echo "}"

else
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'mount'"': '"'true'"'
echo -e '\t'"}"
echo "}"
fi
