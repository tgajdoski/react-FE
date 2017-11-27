#!/bin/sh
p=0
r=0
s=0
./ptest get-input-events --model vt100 |
while read line
do
var=`echo $line | cut -d '=' -f 1`
value=`echo $line | cut -d '=' -f 2 | sed 's/0/false/g' | sed 's/1/true/g'`
if [ "$value"=="true" ]
then
case $var in
        power)
        p=$((p+1))
        echo $p > count_p.log
        ;;
        record)
        r=$((r+1))
        echo $r > count_r.log
        ;;
        reset)
        s=$((s+1))
        echo $s > count_s.log
        ;;

esac

fi

done

