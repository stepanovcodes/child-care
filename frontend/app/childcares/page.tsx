import React from 'react'
import {
    getChildCares,
    createChildCare,
    deleteChildCare,
    updateChildCare,
  } from "@/app/utilities/childcares-service";
import { link } from 'fs';

interface ChildCare {
    uuid: string,
    name: string
}

const ChildCaresPage = async () => {
    
    const childCares: ChildCare[] = await getChildCares()

    return (
        <>
        <h1>Child Care Facilities</h1>
        <p></p>
        <ul>
            {childCares.map(childCare => <li key={childCare.uuid}>{childCare.name}</li>)}
        </ul>
        </>
    )
}

export default ChildCaresPage