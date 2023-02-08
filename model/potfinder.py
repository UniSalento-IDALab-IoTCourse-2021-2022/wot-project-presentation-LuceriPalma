# il codice successivo NASCONDE i warning
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn



import pickle
with open('./LogisticRegressionClassifier.p', 'rb') as f:
    mod = pickle.load(f)
    print(mod)
    #result = mod.predics(data)

    #print(result)
