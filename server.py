import json
import falcon

class CORSMiddleware(object):
    def process_request(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*')
        resp.set_header('Access-Control-Allow-Headers', 'Content-Type')

class CommentsResource(object):

    def on_get(self, req, resp):
        comments = self._get_comments()
        resp.body = json.dumps(comments)

    def on_post(self, req, resp):
        comments = self._get_comments()
        body = req.stream.read()
        new_comments = json.loads(body)
        comments.append(new_comments)
        self._write_comments(comments)
        resp.body = json.dumps(comments)

    def _get_comments(self):
        with open('comments.json', 'r') as f:
            comments = json.loads(f.read())

        return comments

    def _write_comments(self, comments):
        with open('comments.json', 'w') as f:
            f.write(json.dumps(comments, indent=4, separators=(',', ': ')))


app = falcon.API(middleware=[CORSMiddleware()])
app.add_route("/api/comments", CommentsResource())


if __name__ == "__main__":
    from wsgiref import simple_server

    httpd = simple_server.make_server("127.0.0.1", 3000, app)
    httpd.serve_forever()
