#!/bin/sh
#
#
# Script for Leds test

test="leds_on"
model="vt100"
testdir="/mnt/share/cgi-bin/test/leds"
mkdir -p $testdir
echo "Content-type: text/html"
echo ""
if [ "$model" == "vt100" ] 
then
case $QUERY_STRING in
1)
./ptest set-leds --vt100 1 0 0 0 0 0 --model vt100 >> $testdir/leds_on.txt              
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'
echo -e '\t'"}"
echo "}"
;;
2)                                                                                                 
./ptest set-leds --vt100 0 1 0 0 0 0 --model vt100 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;;
3)                                                                                                 
./ptest set-leds --vt100 0 0 1 0 0 0 --model vt100 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;;
4)                                                                                                 
./ptest set-leds --vt100 0 0 0 1 0 0 --model vt100 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;; 
5)                                                                                                 
./ptest set-leds --vt100 0 0 0 0 1 0 --model vt100 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;; 
6)                                                                                                 
./ptest set-leds --vt100 0 0 0 0 0 1 --model vt100 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;;  
esac

count=`cat $testdir/leds_on.txt |sed "s/ /\n/g" | sed "s/,/\n/g" | sed "s/:/\n/g" | grep = | wc -l`


else

case $QUERY_STRING in                                                    
1)                                                                                                 
./ptest set-leds --vt500 1 0 0 --model vt50 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;;                                                                                                 
2)                                                                                                 
./ptest set-leds --vt50 0 1 0 --model vt50 >> $testdir/leds_on.txt                          
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
;;  
3)                                                                                                 
echo "{"
echo -e '\t' '"'$test_$QUERY_STRING'":' "{"
echo -e '\t\t' '"'status'"': '"'true'"'                                  
echo -e '\t'"}"                                                          
echo "}"
./ptest set-leds --vt50 0 0 1 --model vt50 >> $testdir/leds_on.txt   
;;
esac

fi


