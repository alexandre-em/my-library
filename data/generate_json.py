import json
import os
import re


def generate_book_info(path, content):
    res = dict()
    res['path'] = path
    pattern = b'(?<=Title:)(.*)'
    data = search_keyword(pattern, str(re.search(pattern, content).groups()[0]))
    res['title'] = data
    pattern = b'(?<=Author:)(.*)'
    data = search_keyword(pattern, str(re.search(pattern, content)))
    res['author'] = data
    pattern = b'(?<=Release Date:)(.*)'
    data = search_keyword(pattern, str(re.search(pattern, content)))
    res['release_date'] = data
    pattern = b'(?<=Language:)(.*)'
    data = search_keyword(pattern, str(re.search(pattern, content)))
    res['language'] = data
    return res
    

def search_keyword(pattern, line):
    if "b'" in line:
        return line.split("b' ")[1].split('\\')[0]
    elif 'b"' in line:
        return line.split('b" ')[1].split('\\')[0]

def generate_json():
    path = f"{os.getcwd()}/books"
    result = []
    for i, file in enumerate(os.listdir(path)):
        if file.endswith(".txt"):
            file_path = os.path.join(path, file)
            with open(file_path, 'rb') as f:
                content = f.read()
                result.append(generate_book_info(file_path, content))
    with open("books.json", "w") as f:
        json.dump(result, f, indent=4)


generate_json()

