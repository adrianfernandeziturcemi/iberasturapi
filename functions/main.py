
import time
from datetime import datetime, timezone
import pytz
import time
import random


cached_values = {}

def generate_new_values():
    global cached_values
    cached_values = {
        "t1": {
            "hmi_name":"TT0601",
            "uds": "ºC",
            "value":random.randint(0,30)
        },
        "t2": {
            "hmi_name":"TT0602",
            "uds": "ºC",
            "value":random.randint(0,30)
        },
        "p1":{
            "hmi_name":"PT0601",
            "uds": "mmwc",
            "value":random.randint(100,500)
        },
        "p2":{
            "hmi_name":"PT0602",
            "uds": "mmwc",
            "value":random.randint(550,600)
        },
        "q1":{
            "hmi_name":"FT0601",
            "uds": "Nm3/h",
            "value":random.randint(10,20)
        },
        "q2":{
            "hmi_name":"FT0602",
            "uds": "Nm3/h",
            "value":random.uniform(2,2.5)
        },
        "o2":{
            "hmi_name":"OT0601",
            "uds": "%",
            "value": random.uniform(0,4)
        },
        "rel_aire_gas":{
            "hmi_name":"relAireGas",
            "uds": "None",
            "value":random.uniform(0.75,4)
        },
        "date": datetime.fromtimestamp(time.time(), tz=pytz.timezone("Europe/Madrid")).isoformat(),
        "now" : time.time()
    }

    return cached_values


@app.get("/api/simulate")
async def simulate():
    '''
    doc_ref = db.collection(COLLECTION).document(DOC_ID)
    doc = doc_ref.get()
    now = time.time()

    if doc.exists:
        data = doc.to_dict()
        last_update = data.get("last_updated", 0)

        if now - last_update < 5:
            return JSONResponse(data["values"])

    new_values = generate_new_values()
    doc_ref.set({
        "values": new_values,
        "last_updated": now
    })
    return JSONResponse(new_values)   
    '''
    now = datetime.fromtimestamp(time.time(), tz=pytz.timezone("Europe/Madrid")).isoformat()

    if cached_values != {}:
        cached_date = cached_values["now"]

        if time.time() - cached_date <= 5:
            return JSONResponse(cached_values)


    generate_new_values()
    return JSONResponse(cached_values)
    













import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=10000)