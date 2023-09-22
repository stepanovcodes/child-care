# Child Care Finder - Project 4 Planning

Done by Aleksandr (Alex) Stepanov

## Project Choice - Route Finder

"Child Care Finder" app is designed to help parents to find child care for their kids in Alberta, Canada.

## Wireframes

### Main page

![Main page](../assets/Location_Index.png)

## Models/Schemas

### Primary Schema: ChildCare

| Property | Type | Validations | Default Value |
|----------|----------|----------|----------|


### Seconadary Schema: Place

| Property | Type | Validations | Default Value |
|----------|----------|----------|----------|

## Entity Relationship Diagram

![Child Care Finder ERD](../assets/Route_Finder_ERD.png)

[ERD on Lucid.app](https://lucid.app/lucidchart/cf946bce-6a36-486c-b658-4346058941cc/edit?invitationId=inv_fdc0247d-4a8b-4d90-98bd-5451d58dcc01)

## MVP CRUD / RESTful Routes
 Route name | CRUD operation | URL endpoint | Module name | Controller Action | Notes |
|----------|----------|----------|----------|----------|----------|

## JSON Samples - Google Geocoding API

[Google Geocoding API documentation](https://docs.mapbox.com/api/navigation/optimization/)

### Submit Geocoding Request

__POST__ /optimized-trips/v2?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A

__Host:__ api.mapbox.com

__Content-Type:__ application/json

```json
{
  
}
```

### Get Geocoding Response

__GET__ /optimized-trips/v2/123e4567-e89b-12d3-a456-426655440000?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A

__Host:__ api.mapbox.com

__Content-Type:__ application/json

```json
{
   
}
```

## Component Tree

## Trello Sprint Board

Trello sprint board [link](https://trello.com/invite/b/PcfGsH7j/ATTI7b7c87f894baa428babcfacad30713a0625CD735/route-finder)

## User Stories

| US_ID__# | Short Name | Description | SP | Priority | Risk | Sprint | Dependant on US ID# |
|-------|------------|-------------|----|----------|------|--------|---------------------|