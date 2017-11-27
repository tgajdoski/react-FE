#!/bin/sh
#
#
# Script for Switch test
test="switch_check"
echo "Content-type: text/html"
echo ""

case $QUERY_STRING in
	vt100)
		echo "{"
		echo -e '\t' '"'$test'":' "{"
		echo -e '\t\t' '"'Power'"': '"'`cat count_p.log`'"',
		echo -e '\t\t' '"'Record'"': '"'`cat count_r.log`'"',
		echo -e '\t\t' '"'Reset'"': '"'`cat count_s.log`'"'
		echo -e '\t'"}"
		echo "}"
	;;
	vt50)
		echo "{"                            
                echo -e '\t' '"'$test'":' "{"        
                echo -e '\t\t' '"'Power'"': '"'`cat count_p.log`'"',
                echo -e '\t\t' '"'Record'"': '"'`cat count_r.log`'"',
                echo -e '\t\t' '"'Reset'"': '"'`cat count_s.log`'"',
		echo -e '\t\t' '"'Mode'"': '"'`cat count_m.log`'"'
                echo -e '\t'"}"
                echo "}"
	;;
esac
