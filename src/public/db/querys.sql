CREATE TABLE Cliente(
	idClient integer identity primary key,
	nombre varchar(35),
	apellidos varchar(80),
	edad integer,
	fecha_reg date default getDate(),
	nip integer,
	saldo float,
	saldoCred float
)

