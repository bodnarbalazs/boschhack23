import json

def get_map_chuncks():
    with open("CityMap.json") as f:
        data = json.load(f)

    return data