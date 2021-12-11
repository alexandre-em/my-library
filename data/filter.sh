#!/bin/sh
# Filtering all books that doesn't have at least 10000 words

for f in $(pwd)/books/*.txt
do
   WORDS_COUNT=$(wc -w $f | cut -d' ' -f1)
   if [ $WORDS_COUNT -lt 10000 ]; then
      rm $f | echo "Removing $f, containing $WORDS_COUNT words"
   fi
done

