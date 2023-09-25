// const fetch = require('node-fetch')
const { default: test } = require('node:test')


async function testingRequest(){
    const url = "http://www.humanservices.alberta.ca/oldfusion/ChildCareLookup.cfm?s=search&sfid=&sinspd=&sinspc=&show=&ProgramName=&City=CALGARY&PostalCode=&TypeDayCares=true&TypeFamilyDayHomes=true&TypeOutOfSchoolCare=true&TypePreSchools=true&TypeGroupFamilyChildCare=true&AgeInfants=true&AgePreSchool=true&AgeSchoolAge=true&buttonSubmit=3921"
    try {
        const resp = await fetch(url)
        if(resp.ok){
            const htmlData = await resp.text()
            console.log(htmlData)
        }else {
            throw Error("error", {cause: resp})
        }
    }catch(err){
        console.log(err.cause)
    }

}

testingRequest()