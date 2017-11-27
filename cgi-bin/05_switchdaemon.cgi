#!/bin/sh
#
#
# Script for Switch test
test="switch_test"
echo "Content-type: text/html"
echo "" 
echo "{"
echo -e '\t' '"'$test'":' "{"
echo -e '\t\t' '"'status'"': '"'ama_ke_se_opieme_posle_ova'"'
echo -e '\t'"}"
echo "}"
if [ "$QUERY_STRING" == "vt100" ]
then
exec >&-
exec 2>&-
./daemon_vt100.sh &
else
exec >&-     
exec 2>&-    
./daemon_vt50.sh &
fi
