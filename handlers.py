# -*- coding:utf-8 -*-
__author__ = 'Mouse'
import settings as Settings
import tornado.web
import json
# 主页处理


class IndexHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        self.render('index.html')

class RoundUsersHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        roundusers=[ { "avatar":"avatar1.jpg", "email":"zhang1@123.com" }, { "avatar":"avatar2.jpg", "email":"zhang2@123.com" }, { "avatar":"avatar3.jpg", "email":"zhang3@123.com" }, { "avatar":"avatar4.jpg", "email":"zhang4@123.com" },{ "avatar":"avatar5.jpg", "email":"zhang4@123.com" },{ "avatar":"avatar6.jpg", "email":"zhang4@123.com" },{ "avatar":"avatar7.jpg", "email":"zhang4@123.com" } ]
        jsonstr=json.dumps(roundusers,ensure_ascii=False)
        self.write(jsonstr)