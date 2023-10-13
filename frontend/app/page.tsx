import React from 'react'
import { getChildCares } from "@/app/utilities/childcares-service";
import ChildCaresWrapper from '@/app/components/ChildCaresWrapper';

interface ChildCare {
    uuid: string,
    name: string,
    type: string,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    googleMapsLink: string,
    capacity: number,
    placeId: string,
    latitude: number,
    longitude: number,
    website: string,
    googleRating: number,
    createdAt: string,
    updatedAt: string,
  }

const HomePage = async () => {

    const childCares: ChildCare[] = await getChildCares()
    return   <ChildCaresWrapper childCares={childCares} />

}

export default HomePage