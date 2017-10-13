const moment = require('moment');


module.exports = function(req,res){
  let arrQuery = []
  let thisMonth= moment(new Date()).format("YYYYMM")
  let sqlq=''
  //query get list transaction by userid
  sqlq=`select a.*,c."groupName",d.id as trxid,d.month,d."payedAt",d.status from "Users" as a join "UserGroups" as b
	on a.id = b."UserId" join "Groups" as c on b."GroupId" = c.id join "Transactions" as d
	on b."UserId"=d."UserId" and b."GroupId" = d."GroupId" where a.id = ${req.params.id} and d.month <= ${thisMonth}
	order by d.month`
  arrQuery.push(sqlq)

  //query get list transaction by ownerid
	sqlq=`select a.*,c."groupName",d.id as trxid,d.month,d."payedAt",d.status,f.email as ownermail from "Users" as a join "UserGroups" as b
	on a.id = b."UserId" join "Groups" as c on b."GroupId" = c.id join "Transactions" as d
	on b."UserId"=d."UserId" and b."GroupId" = d."GroupId" join "Owners" e on c.id=e."GroupId"
  join "Users" as f on e."UserId"= f.id
	where a.id = ${req.params.id} and e."UserId"=${req.params.owner}  and d.month <= ${thisMonth}
	order by d.month`
  arrQuery.push(sqlq)

  //query get list transaction by ownerid - not pay
  sqlq=`select a.*,c."groupName",d.id as trxid,d.month,d."payedAt",d.status,f.email as ownermail from "Users" as a join "UserGroups" as b
  on a.id = b."UserId" join "Groups" as c on b."GroupId" = c.id join "Transactions" as d
  on b."UserId"=d."UserId" and b."GroupId" = d."GroupId" join "Owners" e on c.id=e."GroupId"
  join "Users" as f on e."UserId"= f.id
  where a.id = ${req.params.id} and e."UserId"=${req.params.owner}  and d.month <= ${thisMonth} and d."payedAt" is null
  order by d.month`
  arrQuery.push(sqlq)

  return arrQuery
}
