import os
from dotenv import load_dotenv

class Config:
    load_dotenv()
    MONGO_URI = os.environ.get('MONGO_URI')
