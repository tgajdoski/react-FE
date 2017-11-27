#!/bin/sh
#
# Photo final script
test="fideo_final"
testdir="/mnt/share/cgi-bin/test/video"
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'test'"': '"'true'"'
echo -e '\t'"}"
echo "}"
