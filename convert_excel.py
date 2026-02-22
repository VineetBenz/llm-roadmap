import pandas as pd

file_path = r'c:\Users\z0052w3h\Desktop\web\LLM_Master_Detailed_Roadmap_v2.xlsx'

try:
    xl = pd.ExcelFile(file_path)
    for sheet_name in xl.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        csv_file = f"c:\\Users\\z0052w3h\\Desktop\\web\\{sheet_name}.csv"
        df.to_csv(csv_file, index=False)
        print(f"Sheet '{sheet_name}' saved to {csv_file}")
except Exception as e:
    print(f"Error: {e}")
