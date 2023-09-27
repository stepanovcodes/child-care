import React from 'react'
import { getChildCares } from "@/app/utilities/childcares-service";
import Map from '@/app/components/Map'
import CardList from '@/app/components/CardList'

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

const ChildCaresPage = async () => {

    const childCares: ChildCare[] = await getChildCares()

    return (
        <div className='flex flex-wrap'>
            <div className='w-full sm:w-2/3'>
                <Map childCares={childCares} />
            </div>
            <div className='w-full sm:w-1/3'>
                <CardList childCares={childCares} />
            </div>
        </div>
    )
}

export default ChildCaresPage