import pandas as pd

file_path = r'c:\Users\z0052w3h\Desktop\web\LLM_Master_Detailed_Roadmap_v2.xlsx'

try:
    xl = pd.ExcelFile(file_path)
    print(f"File: {file_path}")
    print(f"Sheets: {xl.sheet_names}")
    
    for sheet_name in xl.sheet_names:
        print(f"\n--- {sheet_name} ---")
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        print(f"Columns: {df.columns.tolist()}")
        print(f"Rows: {len(df)}")
        print("\nFirst 5 rows:")
        pd.set_option('display.max_columns', None)
        pd.set_option('display.width', 1000)
        print(df.head(10).to_string(na_rep=''))
except Exception as e:
    print(f"Error: {e}")
