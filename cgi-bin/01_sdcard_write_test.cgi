#!/bin/sh
#
#
# Script for SD card test
test="sdcard_write_test"
cd /mnt/sdcard
status=`md5sum -c /mnt/sdcard/testfile.md5 | awk '{print $2}'`
echo "Content-type: text/html"
echo ""
if [ "$status" == "OK" ]
 then
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'write_test'"': '"'true'"'
echo -e '\t'"}"
echo "}"

else
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'write_test'"': '"'false'"'
echo -e '\t'"}"
echo "}"
fi
