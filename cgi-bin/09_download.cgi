#!/bin/sh
#
#
# Script for download
test="download_file"
testdir="/mnt/share/cgi-bin/test"
mkdir -p $testdir 
serial=`cat /mnt/share/cgi-bin/test/serial/sn.txt`
/bin/tar -cvf $testdir/test_$serial.tar.gz $testdir/*
echo "Content-Disposition:attachment;filename=test_$serial.tar.gz"
echo "Content-type: application/tar+gzip"
echo ""
cat $testdir/test_$serial.tar.gz
rm -rf $testdir
#echo "{"
#echo -e '\t' '"'$test'":' "{"
#echo -e '\t\t' '"'created'"': '"'true'"',
#echo -e '\t\t' '"'url'"': '"'http'"'
#echo -e '\t'"}"
#echo "}"
