-- SQLite
--SELECT Id, TableId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn, Num1, StatusId, TableId, Txt1, Txt2 FROM AppDatas;

--SELECT Id, Title FROM AppUserRoleMasters;
--delete from AppUserRoleMasters where Title = 't1'
--SELECT Id, Title FROM AppUserRoleMasters;
--Insert into AppUserRoleMasters (Title) VALUES ('t2')

--SELECT Id, TableId, Txt1, Txt2, Txt5, Num2 FROM AppDatas where TableId =7;

--update AppDatas set Txt5 = '1' where  TableId =7

--SELECT Id, TableId, Txt1, Txt2, Txt5, Num2 FROM AppDatas
--where TableId =7 and 

-- SELECT Id, TableId, Txt1, Txt2, Txt3, Txt5, Num2 FROM AppDatas
-- where TableId =7  and Txt3 is NOT NULL


--SELECT Id, Txt1, Txt2, Txt3, Txt5, Num1 FROM AppDatas WHERE TableId = 7

--UNIQUE AppDatas set Num1 = NULL WHERE TableId = 7

--SELECT Id, Txt1, Txt2, Txt3, Txt5, Num1 from AppDatas WHERE TableId = 7

--UPDATE AppDatas set Txt5 = null  WHERE TableId = 7

--SELECT Id, Txt1, Txt2, Txt3, Txt5, Num1 from AppDatas WHERE Txt5 = 7 and Num1 is NOT NULL

--UPDATE AppDatas set Num1 = null  WHERE TableId = 7

SELECT Txt2 from AppDatas
where Txt2 != 0 and TableId = 7




