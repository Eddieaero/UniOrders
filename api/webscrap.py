import requests
from bs4 import BeautifulSoup
import json

# Base URL of the webpage to scrape
base_url = "https://www.tcu.go.tz/services/accreditation/universities-registered-tanzania?page="

# Initialize a list to store university names
universities = []

# Loop through the pages (0, 1, 2)
for page in range(3):
    # Construct the URL for each page
    url = base_url + str(page)
    response = requests.get(url)
    
    # Ensure the request was successful
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all table cells with the specific header attribute
        for university in soup.find_all("td", headers="view-title-table-column"):
            # Extract the text content and strip extra whitespace
            name = university.get_text(strip=True)
            universities.append({"name": name})

    else:
        print(f"Failed to retrieve the webpage for page {page}. Status code:", response.status_code)

# Save the extracted data to a JSON file
with open('tanzanian_universities.json', 'w') as f:
    json.dump(universities, f, indent=4)

print("Universities list saved to tanzanian_universities.json")
