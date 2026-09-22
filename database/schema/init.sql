create database walletdb;

use walletdb;

create table users(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL
);

create table wallets(
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL,
	balance INT NOT NULL DEFAULT 0,
	currency VARCHAR(50) NOT NULL DEFAULT 'inr',
	status enum('active', 'inactive') NOT NULL DEFAULT 'active',

	FOREIGN KEY (user_id) REFERENCES users(id)
);

create table wallet_transactions(
	id INT PRIMARY KEY AUTO_INCREMENT,
	wallet_id INT NOT NULL,
	reference_id VARCHAR(100) NOT NULL,
	type enum('debit', 'credit') NOT NULL,
	amount INT NOT NULL,
	balanceBefore INT NOT NULL,
	balanceAfter INT NOT NULL,
	description VARCHAR(100),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (wallet_id) REFERENCES wallets(id)

);