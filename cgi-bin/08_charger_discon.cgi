#!/bin/sh
#
#
# Script for Charger/Batery test
test="charger_disconnected"
testdir="/mnt/share/cgi-bin/test/charger"
mkdir -p $testdir 
echo "Content-type: text/html"
echo ""
./ptest get-charger-status --charger disconnected > $testdir/charger_disconn.txt 
count=`./ptest get-charger-status --charger disconnected | wc -l`
i=1
echo "{"
echo -e '\t' '"'$test'":' "{"
while [ $i -le $count ]
do
var=`./ptest get-charger-status --charger disconnected | sed -n "$i"p | awk -F '=' '{print $1}'`
value=`./ptest get-charger-status --charger disconnected | sed -n "$i"p | awk -F '=' '{print $2}'`
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
