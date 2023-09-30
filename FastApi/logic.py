import json

def get_map_chuncks():
    with open("./FinalBackend/Assets/CityMap.json") as f:
        data = json.load(f)

    return data