USE [JWMSMVC]
GO
/****** Object:  StoredProcedure [dbo].[JM_InsertOrUpdateUserDMSProfile]    Script Date: 7/12/2018 2:36:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[JM_InsertOrUpdateUserDMSProfile] 
(
	@UserID bigint,
	@userName varchar(100),
	@UserRole varchar(100) = 'normal',--could be "admin" or "superAdmin"
	@isActive char(1)
)
AS
--insert or update for table UserProfile
BEGIN
	IF @UserID!=0
		BEGIN
			UPDATE dbo.UserDMSProfile 
				SET userName = @userName,
					UserRole = @UserRole,
					isActive  = @isActive
			WHERE	UserID = @UserID
		END
	ELSE
		INSERT INTO dbo.UserDMSProfile
			VALUES (@userName,@UserRole,@isActive)

	SELECT * FROM dbo.UserDMSProfile 
END
