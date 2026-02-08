export const soql={
    leadByEmail:(email:string)=>
        `SELECT Id, FirstName, LastName, Company, Status
    FROM Lead WHERE Email=${email}`,

};