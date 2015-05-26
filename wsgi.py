# -*- coding:utf-8 -*-
__author__ = 'Mouse'
import tornado.ioloop
import tornado.wsgi
import handlers
import settings as Settings

handlers = [
    (r'/', handlers.IndexHandler),
    (r'/round',handlers.RoundUsersHandler)


]

class Application(tornado.web.Application):
    def __init__(self):
        settings = dict(
            template_path=Settings.TEMPLATE_PATH,
            static_path=Settings.STATIC_PATH,
        )
        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    application = Application()
    ###application.listen(Settings.SERVER_PORT)
    print('Listening 8888...')
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
