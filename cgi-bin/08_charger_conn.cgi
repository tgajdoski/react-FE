#!/bin/sh
#
#
# Script for Charger/Batery test
test="charger_connected"
testdir="/mnt/share/cgi-bin/test/charger"
mkdir -p $testdir 
echo "Content-type: text/html"
echo ""
./ptest get-charger-status --charger connected > $testdir/charger_conn.txt
count=`./ptest get-charger-status --charger connected | wc -l`
i=1
echo "{"
echo -e '\t' '"'$test'":' "{"
while [ $i -le $count ]
do
var=`./ptest get-charger-status --charger connected | sed -n "$i"p | awk -F '=' '{print $1}'`
value=`./ptest get-charger-status --charger connected | sed -n "$i"p | awk -F '=' '{print $2}'`
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
