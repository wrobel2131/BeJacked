import requests
from bs4 import BeautifulSoup, NavigableString
import re

from Exercise import Exercise

class WebScraper:
    def __init__(self, url) -> None:
        self._url = url
        self._exercises = dict()
    
    def get_exercises(self):
        return self._exercises

    def set_exercises(self, key, val):
        self._exercises[key] = val
    """
    Function GETs page from url
    Returns content of a page
    """
    def __getPage(self, URL):
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        return soup

    """
    Function creates dictionary, where keys are body parts and values are lists with 
    links to pages with exercises for specific body parts
    """
    def __dictExerciseLinks(self):
        page = self.__getPage(self._url)

        """Names of body parts are in h3's on this page"""
        h3s = page.find_all('h3', id=re.compile(r"\w*-\w*exercises"))

        """All exercises are in lists (ol), each list does not have any id or class"""
        lists = page.find_all('ol')
        dict_exercises = dict()

        """Because ol's dont have any id or class, i only consider the number of lists equal to the number of h3 tags"""
        for i in range(len(h3s)):
            hrefs = []
            for link in lists[i].findChildren('a'):
                hrefs.append(link.get('href'))
            dict_exercises[h3s[i].text] = hrefs

        return dict_exercises

    """
    Gets page's content
    """
    def __getPageContent(self, page):
        return page.find('div', id='content')

    """
    Gets exercise's name, in some exercises there were 'How to' or 'How to Do' strings, function
    checks title and cleans string
    """
    def __getExerciseName(self, content):
        title = content.findChild('h1', class_="entry-title").text.split(':')[0]
        s1 = "How to "
        s2 = "How to Do "
        if s1 in title:
            return title.replace(s1, '')
        if s2 in title:
            return title.replace(s2, '')
        return title

    
    """
    Gets names of muscles, which are engaged in exercise
    """
    def __getEngagedMuscles(self, content):
        working_muscles = []
        div = content.findChild('div', class_="is-layout-flow")
        uls = div.findChildren('ul')

        working_muscles = []

        for ul in uls:
            for li in ul:
                if isinstance(li, NavigableString):
                    print('navigatable')
                    print(li)
                    continue
                    

                links = li.findChildren('a')
                if not(links):
                    working_muscles.append(li.text)
                else:
                    for link in links:
                        if link.text:
                            working_muscles.append(link.text)
        return working_muscles


    """
    Gets instructions, how to do exercise
    """
    def __getHowToDo(self, content):
        how_to_h2 = content.findChild('h2', id=re.compile(r"((\w*h-instructions)|(\w*h-how-to))"))
        how_to_list = content.find_next('ol')

        return [x.text for x in how_to_list.findChildren('li')]


    """
    Returns dictionary, where keys are body parts, and values - arrays with Exercises objects
    """
    def getDictWithExercises(self):

        """
        Dictionary which contains links to exercises for every body part
        """
        dictExercises = self.__dictExerciseLinks()


        """
        For every body part, key - body part, value - array of links to exercises pages
        """
        for key, value in dictExercises.items():

            print(key)
            """
            List of Exercises objects for specific body part
            """
            exercises_body_part = []


            """
            For every link, scrap page and get data
            """        
            for el in value:
                print(el)
                content = self.__getPageContent(self.__getPage(el))
                name = self.__getExerciseName(content)
                muscles = self.__getEngagedMuscles(content)
                how = self.__getHowToDo(content)

                exercises_body_part.append(Exercise(name, how, muscles))
            self.set_exercises(key, exercises_body_part)

        return self.get_exercises()