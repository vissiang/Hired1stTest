CREATE DATABASE Hired1stDB
GO
USE Hired1stDB
GO
-- Create Employee Table
CREATE TABLE [User]
(
  UserId uniqueidentifier DEFAULT NEWID() PRIMARY KEY,
  FirstName varchar(100) null,
  LastName varchar(100) null,
  EmailAddress nvarchar(100) not null,
  [Password] nvarchar(50) not null,
  AddedDate datetime DEFAULT getdate(),
  LastUpdatedDate datetime null
)
GO

CREATE TABLE Product
(
  ProductId uniqueidentifier DEFAULT NEWID() PRIMARY KEY,
  Name varchar(100) not null,
  Price decimal not null,
  Description nvarchar(max) null,
  AddedDate datetime DEFAULT getdate(),
  LastUpdatedDate datetime null,
  UserId uniqueidentifier not null
)
GO

