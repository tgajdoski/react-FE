#!/bin/sh
#
#
# Script for SD card test
test="sdcard"
echo "Content-type: text/html"
echo ""
./ptest get-sd-card-info > sdcard_info.txt
count=`./ptest get-sd-card-info | wc -l`
i=1
echo "{"
echo -e '\t' '"'$test'":' "{"
while [ $i -le $count ]
do
var=`./ptest get-sd-card-info | sed -n "$i"p | awk -F '=' '{print $1}'`
value=`./ptest get-sd-card-info | sed -n "$i"p | awk -F '=' '{print $2}'`
if [ "$i" == "$count" ]
then 
echo -e '\t\t' '"'$var'"': '"'$value'"'
echo -e '\t'"}"
echo "}"
echo
else 
echo -e '\t\t' '"'$var'"': '"'$value'"'','
fi
i=$((i+1))
done
