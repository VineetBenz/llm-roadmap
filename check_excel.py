import pandas as pd

file_path = r'c:\Users\z0052w3h\Desktop\web\LLM_Master_Detailed_Roadmap_v2.xlsx'

try:
    xl = pd.ExcelFile(file_path)
    if '100_Paper_Tracker' in xl.sheet_names:
        df = pd.read_excel(file_path, sheet_name='100_Paper_Tracker')
        print(df.head(10).to_string())
except Exception as e:
    print(f"Error: {e}")
