#!/bin/sh
#
#
# Check the HW revision and determine device model
#
test="hwrev"
model="vt50"
command="get-hwrev"
subcommand="--model"
testdir="/mnt/share/cgi-bin/test/hwrev"
mkdir -p $testdir
##
## after delivery next line to be replaced with:
## ./ptest get-hwrev > $testdir/hwrev.txt
##
./ptest get-hwrev --model $model > $testdir/hwrev.txt
hwrev=`cat $testdir/hwrev.txt`
case $hwrev in
        hipss_revA)
        echo "vt-50" > $testdir/model.txt
        model="vt50"
        ;;
        hipssL_revA)
        echo "vt-100" > $testdir/model.txt
        model="vt100"
        ;;
        *)
        echo "{"
        echo -e '\t' '"'$test'":' "{"
        echo -e '\t\t' '"'status'"': '"'ABORT'"'
        echo -e '\t'"}"
        echo "}"
        ;;
esac



echo "Content-type: text/html"
echo ""
count=`./ptest get-hwrev --model $model | wc -l`
i=1
echo "{"
echo -e '\t' '"'$test'":' "{"
while [ $i -le $count ]
do
var=`./ptest $command $subcommand $model | sed -n "$i"p | awk -F '=' '{print $1}'`
value=`./ptest $command $subcommand $model | sed -n "$i"p | awk -F '=' '{print $2}'`
if [ "$i" == "$count" ]
then 
echo -e '\t\t' '"'revision'"': '"'$var'"',
echo -e '\t\t' '"'model'"': '"'$model'"'
echo -e '\t'"}"
echo "}"
echo
else 
echo -e '\t\t' '"'$var'"': '"'$value'"'',',
echo -e '\t\t' '"'model'"': '"'$model'"'','
fi
i=$((i+1))
done
