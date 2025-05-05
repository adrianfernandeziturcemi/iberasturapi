# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import functions_framework
from mangum import Mangum
import time
from datetime import datetime, timezone
import pytz
import time
import random

from google.cloud import firestore

# initialize_app()
#
#
# @https_fn.on_request()
# def on_request_example(req: https_fn.Request) -> https_fn.Response:
#     return https_fn.Response("Hello world!")


# Firestore client
db = firestore.Client()
COLLECTION = "simulation"
DOC_ID = "current"





def generate_new_values():
    return {
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
        "date": datetime.fromtimestamp(time.time(), tz=pytz.timezone("Europe/Madrid")).isoformat()
    }


@app.get("/api/simulate")
async def simulate():
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






#THE PART BELOW IS NECCESARY TO TRADUCE THE API TO RUN IN FIREBASE -__(..)__-

# Firebase entry point
handler = Mangum(app)

@functions_framework.http
def api_handler(request):
    return handler(request.environ, lambda status, headers: (status, headers, []))