import sys
import os
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, RobustScaler
from sklearn.compose import ColumnTransformer
from collections import Counter
from sklearn.cluster import AgglomerativeClustering
import json

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'agglomerative_clustering_model.pkl')
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# Load the dataset
file_path = sys.argv[1]
hotel_bookings = pd.read_csv(file_path)

# Create a copy of the dataset
hotel_bookings = hotel_bookings.copy()

# Check if the dataset needs preprocessing
required_columns = ["is_canceled", "lead_time", "arrival_date_year", "arrival_date_week_number", 
                    "arrival_date_day_of_month", "assigned_room_type", "deposit_type", "agent", 
                    "company", "days_in_waiting_list", "reservation_status", 
                    "reservation_status_date", "previous_cancellations", "previous_bookings_not_canceled", 
                    "distribution_channel", "is_repeated_guest", "total_of_special_requests"]

columns_to_remove = [col for col in required_columns if col in hotel_bookings.columns]

if columns_to_remove:
    # Remove the specified columns if they exist
    hotel_bookings = hotel_bookings.drop(columns=columns_to_remove)

# Universal preprocessing steps
for col in ['children', 'country', 'adults', 'adr']:  # Adjust the list based on available columns
    if col in hotel_bookings.columns:
        if col == 'children':
            hotel_bookings[col].fillna(hotel_bookings[col].median(), inplace=True)
        elif col == 'country':
            # Frequency encoding 'country'
            country_counts = Counter(hotel_bookings[col])
            hotel_bookings[col] = hotel_bookings[col].map(country_counts)
        elif col == 'adults':
            hotel_bookings[col] = hotel_bookings[col].replace(0, hotel_bookings[col].median())
        elif col == 'adr':
            hotel_bookings[col] = hotel_bookings[col].replace(0, hotel_bookings[col].median())

hotel_bookings = hotel_bookings.drop_duplicates()

label_encoders = {}
categorical_features = ['arrival_date_month', 'meal', 'market_segment', 'reserved_room_type', 'customer_type']

for feature in categorical_features:
    if feature in hotel_bookings.columns:
        le = LabelEncoder()
        hotel_bookings[feature] = le.fit_transform(hotel_bookings[feature])  # Fit and transform
        label_encoders[feature] = le

encoder = ColumnTransformer(
    transformers=[
        ("hotel_encoder", OneHotEncoder(drop="first"), ['hotel'])
    ],
    remainder="passthrough"
)

hotel_bookings_encoded = encoder.fit_transform(hotel_bookings)

scaler = RobustScaler()
hotel_bookings_scaled = scaler.fit_transform(hotel_bookings_encoded)

# Clustering with Agglomerative Clustering
labels = model.fit_predict(hotel_bookings_scaled)

# Calculate average ADR per cluster
hotel_bookings['cluster'] = labels
cluster_adr_averages = hotel_bookings.groupby('cluster')['adr'].mean()

# Calculate average ADR per country
adr_per_country = hotel_bookings.groupby('country')['adr'].mean()
# dedcode the country (encoded using frequency encoding)
hotel_bookings['country'] = hotel_bookings['country'].map({v: k for k, v in country_counts.items()})
# set decoded country as index
adr_per_country.index = hotel_bookings['country'].unique()

# Renaming cluster labels based on ADR averages
cluster_adr_averages = cluster_adr_averages.sort_values()
cluster_adr_averages.index = ['budget', 'standard', 'luxury']
hotel_bookings['cluster'] = hotel_bookings['cluster'].map({cluster: new_label for cluster, new_label in enumerate(cluster_adr_averages.index)})

# Counting data points per cluster
cluster_counts = hotel_bookings['cluster'].value_counts()

# Calculate monthly bookings
hotel_bookings['arrival_date_month'] = label_encoders['arrival_date_month'].inverse_transform(hotel_bookings['arrival_date_month'])
monthly_bookings = hotel_bookings.groupby('arrival_date_month').size()

# Calculate meal counts
hotel_bookings['meal'] = label_encoders['meal'].inverse_transform(hotel_bookings['meal'])
meal_counts = hotel_bookings.groupby('meal').size()

# Calculate room type counts
hotel_bookings['reserved_room_type'] = label_encoders['reserved_room_type'].inverse_transform(hotel_bookings['reserved_room_type'])
room_type_counts = hotel_bookings.groupby('reserved_room_type').size()

# Calculate average stay duration per cluster
hotel_bookings['stay_duration'] = hotel_bookings['stays_in_weekend_nights'] + hotel_bookings['stays_in_week_nights']
cluster_stay_duration = hotel_bookings.groupby('cluster')['stay_duration'].mean()

# Calculate average adults, children, and babies per cluster
average_guests = hotel_bookings.groupby('cluster')[['adults', 'children', 'babies']].mean()

# Calculate average ADR per market segment
adr_per_segment = hotel_bookings.groupby('market_segment')['adr'].mean()
# Decode the market segment
hotel_bookings['market_segment'] = label_encoders['market_segment'].inverse_transform(hotel_bookings['market_segment'])
# Set decoded market segment as index
adr_per_segment.index = hotel_bookings['market_segment'].unique()

# Calculate average ADR per customer type
adr_per_customer_type = hotel_bookings.groupby('customer_type')['adr'].mean()
# Decode the customer type
hotel_bookings['customer_type'] = label_encoders['customer_type'].inverse_transform(hotel_bookings['customer_type'])
# Set decoded customer type as index
adr_per_customer_type.index = hotel_bookings['customer_type'].unique()

# Calculate average ADR per country
adr_per_country = hotel_bookings.groupby('country')['adr'].mean()

# Find the best cluster based on the highest revenue
cluster_revenue = cluster_adr_averages * cluster_counts
best_cluster = cluster_revenue.idxmax()

# Calculate average values of each attribute for the best cluster according to revenue
best_cluster_data = hotel_bookings[hotel_bookings['cluster'] == best_cluster]

# Separate numeric and non-numeric columns
numeric_columns = best_cluster_data.select_dtypes(include=[np.number]).columns
non_numeric_columns = best_cluster_data.select_dtypes(exclude=[np.number]).columns

# Compute mode for non-numeric columns
mode_values_non_numeric = {}
for col in non_numeric_columns:
    mode_values_non_numeric[col] = best_cluster_data[col].mode()[0]  # mode()[0] gives the first mode value

# Compute median for numeric columns
median_values_numeric = best_cluster_data[numeric_columns].median()

# best cluster with name and it's revenue
best_cluster = {
    "name": best_cluster,
    "revenue": cluster_revenue[best_cluster]
}

# Prepare data to send to frontend
analytics_data = {
    "cluster_counts": {f"{cluster}": count for cluster, count in cluster_counts.items()},
    "cluster_adr_averages": cluster_adr_averages.to_dict(),
    "monthly_bookings": monthly_bookings.to_dict(),
    "meal_counts": meal_counts.to_dict(),
    "room_type_counts": room_type_counts.to_dict(),
    "cluster_stay_duration": cluster_stay_duration.to_dict(),
    "average_guests": average_guests.to_dict(),
    "mode_values_non_numeric": mode_values_non_numeric,
    "median_values_numeric": median_values_numeric.to_dict(),
    "adr_per_segment": adr_per_segment.to_dict(),
    "adr_per_customer_type": adr_per_customer_type.to_dict(),
    "adr_per_country": adr_per_country.to_dict(),
    "cluster_revenue": cluster_revenue.to_dict(),
    "best_cluster": best_cluster
}

# Serialize to JSON
json_data = json.dumps(analytics_data)

# Example of printing JSON data (you will send this to frontend instead)
print(json_data)
