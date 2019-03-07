USE [JWMSMVC]
GO
/****** Object:  StoredProcedure [dbo].[JM_InsertOrUpdateUserProfile]    Script Date: 7/12/2018 2:36:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[JM_InsertOrUpdateUserProfile] 
(
	@UserID varchar(20),
	@userName varchar(20),
	@Domain varchar(20),
	@UserRole varchar(20) = 'normal',--could be "admin" or "superAdmin"
	@isActive char(1)
)
AS
--insert or update for table UserProfile
BEGIN
	IF EXISTS (SELECT UserID from dbo.UserProfile where UserID = @UserID )
		BEGIN
			UPDATE dbo.UserProfile 
				SET userName = @userName,
					Domain = @Domain,
					UserRole = @UserRole,
					isActive  = @isActive
			WHERE	UserID = @UserID
		END
	ELSE
		INSERT INTO dbo.UserProfile
			VALUES (@UserID,@Domain,@UserRole,@isActive,@userName)

	SELECT * FROM dbo.UserProfile 
END
