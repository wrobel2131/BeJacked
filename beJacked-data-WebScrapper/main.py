import pandas as pd
import os
from WebScraper import WebScraper
url = "https://www.strengthlog.com/exercise-directory/"

scraper = WebScraper(url)
exercises = scraper.getDictWithExercises()


if(not(os.path.isdir('data'))):
    os.mkdir('data')
for body_part, ex_lists in exercises.items():
    new = body_part.replace(' ', '_').lower()
    df = pd.DataFrame.from_records(vars(o) for o in ex_lists)
    df.to_excel(f"data/{new}.xlsx", index=True)
    


