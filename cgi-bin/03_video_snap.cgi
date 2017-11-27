#!/bin/sh
#
# Photo snapshot
test="video_snap"
testdir="/mnt/share/cgi-bin/test/video"
mkdir -p $testdir
./ptest grab-jpeg > $testdir/snap_"$QUERY_STRING".jpg
echo "Content-type: image/jpeg"
echo ""
cat $testdir/snap_"$QUERY_STRING".jpg
