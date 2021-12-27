#!/bin/sh

for bookname in $(ls books/*.txt | sed 's#^books##' | sed -e 's/.txt$//'); do
	egrep "$bookname\." ./urls_to_books.txt
done
