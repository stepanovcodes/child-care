import * as childCaresAPI from "./childcares-api";

export async function getChildCares() {
  try {
    const data = await childCaresAPI.index();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function getChildCare(uuid) {
  try {
    const data = await childCaresAPI.detail(uuid);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createChildCare(data){
    try {
        const newChildCare = await childCaresAPI.create(data)
        return newChildCare
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteChildCare(uuid) {
    try {
      const deletedChildCare = await childCaresAPI.destroy(uuid);
      return deletedChildCare;
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
  }


export async function updateChildCare(uuid,data){
    try {
        const updatedChildCare = await childCaresAPI.update(uuid,data)
        return updatedChildCare
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}