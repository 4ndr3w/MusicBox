#!/usr/bin/env python

import os
import mutagen

basePath = os.getcwd();
songID = 0;

def processSong(path):
    data = mutagen.File(path, easy=True)
    print data['title'][0]+","+data['album'][0]+","+data['artist'][0]+","+path; 

def isUsable(base, file):
    if file[0] == ".":
        return False;
    if os.path.isdir(base+"/"+file):
        return False
    extention = file.split(".")
    if len(extention) == 1:
        return False;
    if extention[1].lower() != "mp3":
        return False;
    return True;

def findMusic(path):
    for file in os.listdir(path):
        if isUsable(path,file):
            try:
                processSong(path+"/"+file);
            except Exception:
                continue
        elif os.path.isdir(path+"/"+file) and file[0] != ".":
            findMusic(path+"/"+file)

findMusic(basePath);
