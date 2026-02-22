import pandas as pd
import json
import os

files = {
    "roadmap": "Detailed_YouTube_Roadmap.csv",
    "planner": "24_Week_Study_Planner.csv",
    "papers": "100_Paper_Tracker.csv",
    "costs": "Compute_Cost_Planner.csv",
    "gpt_scratch": "Build_GPT_From_Scratch.csv",
    "math": "Math_Derivation_Checklist.csv"
}

data = {}

for key, filename in files.items():
    path = f"c:\\Users\\z0052w3h\\Desktop\\web\\{filename}"
    if os.path.exists(path):
        df = pd.read_csv(path)
        data[key] = df.to_dict(orient="records")

with open("c:\\Users\\z0052w3h\\Desktop\\web\\data.js", "w") as f:
    f.write(f"const ROADMAP_DATA = {json.dumps(data, indent=2)};")

print("Data converted to data.js")
