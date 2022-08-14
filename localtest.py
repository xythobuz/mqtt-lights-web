#!/usr/bin/env python3
# https://stackoverflow.com/a/52531444

import http.server
import socketserver

PORT = 8080
DIRECTORY = "lights"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

# https://stackoverflow.com/a/16641793
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
