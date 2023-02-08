import pandas as pd
import warnings

warnings.filterwarnings('ignore')

window = 10
datainput = pd.read_csv("data_input.csv")




def intervalHasPothole(intervalStart, intervalEnd, datainput):
    potholeTimestamps = datainput['time']
    for index, potholeTime in potholeTimestamps.iteritems():
        if intervalStart < potholeTime and potholeTime <= intervalEnd:
                return True
    return False

intervaldata = pd.DataFrame(columns=['maxAccelX', 'maxAccelY', 'maxAccelZ',
                                    'maxGyroX', 'maxGyroY', 'maxGyroZ', 'minAccelX', 'minAccelY',
                                    'minAccelZ', 'minGyroX', 'minGyroY', 'minGyroZ', 'meanAccelX',
                                    'meanAccelY', 'meanAccelZ', 'meanGyroX', 'meanGyroY', 'meanGyroZ',
                                    'sdAccelX', 'sdAccelY', 'sdAccelZ', 'sdGyroX', 'sdGyroY',
                                    'sdGyroZ', "lat", "lng"])

for i in range(0, len(datainput), window):
    intervalIndex = len(intervaldata)
    interval = datainput[i:i+window]
    intervalStart = list(interval['time'])[0]
    intervalEnd = list(interval['time'])[-1]
    maxAccelX, minAccelX = interval['accX'].max(), interval['accX'].min()
    maxAccelY, minAccelY = interval['accY'].max(), interval['accY'].min()
    maxAccelZ, minAccelZ = interval['accZ'].max(), interval['accZ'].min()
    maxGyroX, minGyroX = interval['gyroX'].max(), interval['gyroX'].min()
    maxGyroY, minGyroY = interval['gyroY'].max(), interval['gyroY'].min()
    maxGyroZ, minGyroZ = interval['gyroZ'].max(), interval['gyroZ'].min()
    meanAccelX, sdAccelX = interval['accX'].mean(), interval['accX'].std()
    meanAccelY, sdAccelY = interval['accY'].mean(), interval['accY'].std()
    meanAccelZ, sdAccelZ = interval['accZ'].mean(), interval['accZ'].std()
    meanGyroX, sdGyroX = interval['gyroX'].mean(), interval['gyroX'].std()
    meanGyroY, sdGyroY = interval['gyroY'].mean(), interval['gyroY'].std()
    meanGyroZ, sdGyroZ = interval['gyroZ'].mean(), interval['gyroZ'].std()
    lat = interval['lat'].mean()
    lng = interval['lng'].mean()
    pothole = intervalHasPothole(intervalStart, intervalEnd, datainput)
    intervalSummary = [maxAccelX, maxAccelY, maxAccelZ, maxGyroX, maxGyroY,
                       maxGyroZ, minAccelX, minAccelY, minAccelZ, minGyroX, minGyroY, minGyroZ,
                       meanAccelX, meanAccelY, meanAccelZ, meanGyroX, meanGyroY, meanGyroZ,
                       sdAccelX, sdAccelY, sdAccelZ, sdGyroX, sdGyroY, sdGyroZ, lat, lng]
    intervaldata.loc[intervalIndex] = intervalSummary

intervaldata.head()

intervaldata.to_csv("intervals.csv")
