"""
Class representing Exercise
"""
class Exercise():
    def __init__(self, name, how_to_do, muscles) -> None:
        self.name = name
        self.how_to_do = how_to_do
        self.muscles = muscles

    def __repr__(self):
             return "{}: {}".format(self.__class__.__name__, vars(self))