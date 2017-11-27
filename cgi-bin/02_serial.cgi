#!/bin/sh
#
#
# Script for Set Serial process
test="serial"
testdir="/mnt/share/cgi-bin/test/serial"
mkdir -p $testdir
echo $QUERY_STRING > $testdir/sn.txt
echo "Content-type: text/html"
echo ""
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'serial'"': '"'$QUERY_STRING'"',
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
