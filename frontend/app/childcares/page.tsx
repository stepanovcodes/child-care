import React from 'react'
import { getChildCares } from "@/app/utilities/childcares-service";
import { MapIcon } from '@heroicons/react/24/outline'
import Map from '@/app/components/Map.jsx'

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
    latitude: number,
    longitude: number,
    placeId: string,
    createdAt: string,
    updatedAt: string,
}

const ChildCaresPage = async () => {

    const childCares: ChildCare[] = await getChildCares()

    return (
        <div className='flex'>
            <div className='w-1/2' style={{ maxHeight: "clac(100vh - 64px)"}}>
                <Map childCares={childCares}/>
            </div>
            <div className='w-1/2 pb-4' style={{ maxHeight: "clac(100vh - 64px)" }}>
                <h1 className='text-4xl font-bold text-white bg-amber-500 p-4 rounded-lg shadow-lg'>Child Care Facilities</h1>
                <p></p>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                            <th>Phone Number</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childCares.map(childCare =>
                            <tr key={childCare.uuid}>
                                <td>{childCare.name}</td>
                                <td>{childCare.type}</td>
                                <td>
                                    <div className="flex items-center">
                                        <span>{childCare.address}</span>
                                        <a href={childCare.googleMapsLink} target="_blank" className="ml-2">
                                            <div className="group flex h-5 w-5 items-center justify-center rounded-lg cursor-pointer hover:bg-gray-200">
                                                <MapIcon className="w-4 h-4 hover:text-indigo-600" />
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                <td>{childCare.city}</td>
                                <td>{childCare.province}</td>
                                <td>{childCare.postalCode}</td>
                                <td>{childCare.phoneNumber}</td>
                                <td>{childCare.capacity}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChildCaresPage