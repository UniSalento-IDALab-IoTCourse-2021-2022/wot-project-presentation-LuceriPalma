import pandas as pd


# il codice successivo NASCONDE i warning
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

import pickle

before_demo = pd.read_csv("intervals.csv")
before_demo.drop('Unnamed: 0', axis=1, inplace=True)
before_demo.dropna(inplace=True)
before_demo.reset_index(drop=True, inplace=True)

print (before_demo.shape)
before_demo.head()

x_demo = pd.read_csv("intervals.csv", usecols = ['maxAccelX', 'maxAccelY', 'maxAccelZ',
                                    'maxGyroX', 'maxGyroY', 'maxGyroZ', 'minAccelX', 'minAccelY',
                                    'minAccelZ', 'minGyroX', 'minGyroY', 'minGyroZ', 'meanAccelX',
                                    'meanAccelY', 'meanAccelZ', 'meanGyroX', 'meanGyroY', 'meanGyroZ',
                                    'sdAccelX', 'sdAccelY', 'sdAccelZ', 'sdGyroX', 'sdGyroY',
                                    'sdGyroZ'] )
x_demo.head()


print (x_demo.shape)
x_demo.head()

modelname = "LogisticRegressionClassifier.sav"
model = pickle.load(open(modelname, 'rb'))
p = model.predict(x_demo)
print(p)

before_demo['pothole'] = p
before_demo.to_csv('results.csv')
