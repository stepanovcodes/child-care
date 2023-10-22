import csv
import json
import os

# Get the current directory where your script is located
current_directory = os.path.dirname(os.path.realpath(__file__ if '__file__' in locals() else '.'))

# Define the input CSV file and the output JSON file
input_csv_file = os.path.join(current_directory, 'results.csv')
output_json_file = os.path.join(current_directory, 'results.json')

# Create a list to store the data
data = []

# Read the CSV file and convert it to a list of dictionaries, skipping the first two rows
with open(input_csv_file, mode='r', newline='') as csv_file:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)  # Skip the first row (header)
    next(csv_reader)  # Skip the second row (empty row)
    for row in csv_reader:
       data.append({
            "ObjectId": row[0],
            "address": row[1],
            "comDistNm": row[2],
            "comDistCd": row[3],
            "getBusId": row[4],
            "expDt": int(row[5]),       # Convert to integer
            "firstIssDt": int(row[6]),  # Convert to integer
            "jobStatusDesc": row[7],
            "name": row[8],
            "webLcnCtyPeDesc": row[9],
            "globalId": row[10],
            "loadDate": int(row[11]),    # Convert to integer
            "homeOccInd": row[12],
            "globalIdGuid": row[13],
            "lookupDistance": row[14],
            "type": "Municipal home-based child care",
            "city": "CALGARY",
            "province": "AB",
            "postalCode": None,
            "phoneNumber": None,
            "capacity": 6,
            "placeId": None,
            "latitude": None,
            "longitude": None,
            "website": None,
            "rating": None,
            "userRatingsTotal": None

        })

# Write the data as JSON to the output file
with open(output_json_file, mode='w') as json_file:
    json.dump(data, json_file, indent=2)

print(f'CSV file "{input_csv_file}" has been converted to JSON file "{output_json_file}".')
