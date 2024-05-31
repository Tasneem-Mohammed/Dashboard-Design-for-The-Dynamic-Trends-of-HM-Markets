from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except:
        print("db not exist")
    
    return conn


df = pd.read_csv("HM_Sales_2018.csv")
con = create_connection("HM_Sales.db")
df.to_sql('HM_Sales', con, if_exists='replace')
con.close()

db_url = 'sqlite:///HM_Sales.db'
engine = create_engine(db_url, echo= True)

# data and queries :

query1 = 'select State, Profit from HM_Sales Group By State HAVING Profit > 0'

query2 = ''' SELECT Category, SUM(Sales) as TotalSales
    FROM HM_Sales
    GROUP BY Category'''

# query3 = ''' SELECT [Sub-Category], SUM(Quantity) AS TotalQuantity, SUM(Sales) as TotalSales, Sum(Profit) as TotalProfit
#     FROM HM_Sales
#     GROUP BY [Sub-Category]
#     HAVING SUM(Profit) > 0'''
    
# query3 = ''' SELECT Category, [Sub-Category], Quantity, Sales, Profit FROM HM_Sales
#     GROUP BY [Category]'''
    
query3 = 'SELECT Category, Quantity, Sales, Profit FROM HM_Sales'

query4 = ''' SELECT [Region], SUM(Sales) as TotalSales, [Order Date]
    FROM HM_Sales
    GROUP BY Region'''

query5 = ''' SELECT [Sub-Category], SUM(Sales) as TotalSales
            FROM HM_Sales
            GROUP BY [Sub-Category]''' 

query6 = 'Select State, Sales from HM_Sales Group By State '
# df_1 = pd.read_sql('select * from HM_Sales', engine)ز
df_1 = pd.read_sql(query1, engine)
df_2 = pd.read_sql(query2 ,engine)
df_3 = pd.read_sql(query3 ,engine)
df_4 = pd.read_sql(query4 ,engine)
df_5 = pd.read_sql(query5 ,engine)
df_6 = pd.read_sql(query6, engine)


print(df_1)
print(df_2.head())
print(df_3)
print(df_4)
print(df_5)
print(df_6)
app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route('/get-d')
def get_data():
    # 1 : connection 
    # 2 :query
    # 3 :res query in df
    # 4 :modify , jsonify
    data =[]
    for i in range(len(df_1)):
        data.append({"status": df_1["State"].iloc[i],"value": int (df_1["Profit"].iloc[i])}) 
    return jsonify(data)

@app.route('/get-pie-data')
def get_pie_data():
    pie_data = [
    {"status": "Accessories","value": int(df_2["TotalSales"].values[0] )},
    {"status": "Clothes", "value": int (df_2["TotalSales"].values[1])},
    {"status": "Footwear", "value": int (df_2["TotalSales"].values[2])}
    ]
    return jsonify(pie_data)

# # a dictionary mapping Sub-Category to color
# sub_category_colors = {
#     "Bags": "#FF5733",
#     "Belts": "#33FF57",
#     "Dresses": "#5733FF",
# }

# @app.route('/get-bubble-data')
# def get_bubble_data():
#     bubble_data = []
#     for i in range(len(df_3)):
#         bubble_data.append({
#                 "category": df_3["Category"].iloc[i],
#                 "sales": int(df_3["Sales"].iloc[i]),
#                 "profit": int(df_3["Profit"].iloc[i]),
#                 "Quantity": int(df_3["Quantity"].iloc[i])
#             })
#     return jsonify(bubble_data)

# @app.route('/get-line-data')
# def get_line_data():
#     line_data = []
#     for i in range(len(df_4)):
#         date_value = df_4["Order Date"].iloc[i] 
#         if pd.notna(date_value):
#             formatted_date = pd.to_datetime(date_value).strftime('%Y-%m-%d')
#             line_data.append({
#                 "sub-category": df_4["Sub-Category"].iloc[i],
#                 "sales": int(df_4["TotalSales"].iloc[i]),
#                 "date": formatted_date
#             })
#     return jsonify(line_data)


@app.route('/get-sortedBar-data')
def get_sortedBar_data():
    sortedBar = []
    for i in range(len(df_5)):
        sortedBar.append({
                "sub-category": df_5["Sub-Category"].iloc[i],
                "sales": int(df_5["TotalSales"].iloc[i])
            })
    return jsonify(sortedBar)

state_abbreviations = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
}
def convert_state_to_abbreviation(state):
    # Convert state name to title case and get the abbreviation from the dictionary
    abbreviation = state_abbreviations.get(state.title())
    
    # If the state is not found in the dictionary, return the original input
    return f'US-{abbreviation}' if abbreviation else state

@app.route('/get-Map-data')
def get_Map_data():
    Map_data=[]
    for i in range(len(df_6)):
        Map_data.append({
                "id": convert_state_to_abbreviation(df_6["State"].iloc[i]),
                "value": int(df_6["Sales"].iloc[i])
            })
    return jsonify(Map_data)

if __name__ == "__main__":
    app.run(debug=True) 

