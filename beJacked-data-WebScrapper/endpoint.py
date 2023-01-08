import pandas
import numpy as np
import requests
import time
import json

from json import JSONEncoder

class MyEncoder(JSONEncoder):
    def default(self, o):
         return o.__dict__  


class ExerciseDTO():
    def __init__(self, name = "", description = "", muscles = "", exerciseCategory = "") -> None:
        self.name = name
        self.description = description
        self.muscles = muscles
        self.exerciseCategory = exerciseCategory

    def __repr__(self):
             return "{}: {}".format(self.__class__.__name__, vars(self))

URL = 'http://localhost:8080/api/v1/exercises'


excel_data = pandas.read_excel(f"data/shoulder_exercises.xlsx")
column_names = np.delete(excel_data.columns, 0);
# print(column_names)
data = pandas.read_excel(f"data/shoulder_exercises.xlsx",usecols=column_names).to_dict('list');

exCat = 'shoulders'
exercises = []


for key, value in data.items():
    if(key == 'name'):
        for index, el in enumerate(value):
            exercises.append(ExerciseDTO())
            exercises[index].name = el
            # print('index: ', index, ' ',  el)
            # exercises.append(exercise)

    
    if key == 'how_to_do':
        for index, el in enumerate(value):
            el = el.replace(']', '')
            el = el.replace('[', '')
            el = el.replace("'", '')
            el = el.replace(",", '')
            # new_values.append(el)
            # print('index: ', index, ' ',  el)
            exercises[index].description = el

    if(key == 'muscles'):
        for index, el in enumerate(value):
            el = el.replace(']', '')
            el = el.replace('[', '')
            el = el.replace("'", '')
            # print('index: ', index, ' ',  el)  
            exercises[index].muscles = el
     
    print("")

# print(exercises)
login_response = requests.post("http://localhost:8080/api/v1/auth/login", json={"username": "admin", "password": "ELcorleone2000." })


access_token = login_response.json()["access_token"]
headers = {"Authorization": "Bearer "+access_token, "Content-Type" :"application/json"
}
time.sleep(1);
# print(headers)

for el in exercises:
    el.exerciseCategory = exCat
    el = MyEncoder().encode(el)
    new = json.loads(el)

    response = requests.post(URL, json=new, headers=headers, verify=False)
    print(response)
    response.status_code
    time.sleep(0.5)

