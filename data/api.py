from typing import Optional

from fastapi import FastAPI

import json

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.get("/books/")
def read_root(books_path: str):
    f = open('books_words_occ.json', "r")
    data = json.loads(f.read())
    response = data[books_path]

    f.close()
    return response

